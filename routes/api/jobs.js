const router = require("express").Router();
const jobController = require("../../controllers/jobController");
const userJobController = require("../../controllers/userJobController");


// Matches with "/api/jobs"
router.route("/")
.get(jobController.scrape);
// .put(jobController.display);
// .get(jobController.findAll)
// .post(jobController.create);



// Matches with "/api/jobs/:id"
// router
//   .route("/:id")
//   .get(bookController.findById)
//   .put(bookController.update)
//   .delete(bookController.remove);

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
