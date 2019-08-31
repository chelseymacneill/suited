const router = require("express").Router();
const jobController = require("../../controllers/jobController");


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

module.exports = router;
