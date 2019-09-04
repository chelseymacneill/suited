const router = require("express").Router();
const jobController = require("../../controllers/jobController");
const userJobController = require("../../controllers/userJobController");


// Matches with "/api/jobs"
router.route("/")
.get(jobController.scrape);

//api/jobs/favorite
router.route("/favorite")
.post(userJobController.create);
//api/jobs/getFavorites
router.route("/getFavorites")
.post(userJobController.findAll)
 
router.route("/removeFavorite")
.post(userJobController.remove)

router.route("/updateTracked")
.post(userJobController.update)

module.exports = router;
