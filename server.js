// Require/Import needed npm packages
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const passport = require("passport");

//Initiate our app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3001; //

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Replaced with below
//app.use(express.static(path.join(__dirname, "public")));
// Replacement for above
app.use("/static", express.static(path.join(__dirname, "client/build/static")));
app.use(
  session({
    secret: "suited_app",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

// Configure App for passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log("user", user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

if (!isProduction) {
  app.use(errorHandler());
}

// Require Mondels and internal config files
require("./models/users");
require("./config/passport");

// Routes
app.use(routes);

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure Mongoose
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://user1:password1@ds311538.mlab.com:11538/heroku_b68zds2c",
  { useNewUrlParser: true }
);
mongoose.set("debug", true);

// ROUTES
// Simple index route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
