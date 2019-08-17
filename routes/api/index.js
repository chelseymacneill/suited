const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./google");
const usersRoutes = require("./users")

// Book routes
router.use("/books", bookRoutes);

// Google Routes
router.use("/google", googleRoutes);

//Users Routes
router.use("/users", usersRoutes)

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;