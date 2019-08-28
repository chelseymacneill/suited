const express = require("express");
const mongoose = require("mongoose");
//////////////////////////////////////////////////
//ORDER IS IMPORTANT - don't change
//Configure Mongoose
mongoose.connect('mongodb://localhost/suited_app');
mongoose.set('debug', true);

//models & Routes
require('./models/users');
require('./config/passport');
//////////////////////////////////////////////////
const routes = require("./routes");
//Initiate our app
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const passport = require('passport');
// import passport from ('./config/serialize');


const PORT = process.env.PORT || 8001;

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'mongod-vs-nodemon', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});
//////////////////////////////////////////////////////////////////////
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   console.log('*** serializeUser called, user: ')
// 	console.log(user) // the whole raw user object!
// 	console.log('---------')
// 	done(null, { _id: user._id })
// });

// passport.deserializeUser(function(id, done) {
//   console.log('DeserializeUser called')
// 	User.findOne(
// 		{ _id: id },
// 		'username',
// 		(err, user) => {
// 			console.log('*** Deserialize user, user:')
// 			console.log(user)
// 			console.log('--------------')
// 			done(null, user)
// 		}
// 	)
// });

app.get('/api/users/current', (req, res) => {
  console.log('user signup', req.body.username);
  req.session.username = req.body.username;
  res.end()
})
////////////////////////////////////////////////////////////////////////

if(!isProduction) {
  app.use(errorHandler());
}

// app.use(require('./routes'));
// // Add routes, both API and view
app.use(routes);


//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
