const router = require("express").Router();
const jobController = require("../../controllers/jobController");
const userJobController = require("../../controllers/userJobController");


// Matches with "/api/jobs"
router.route("/")
.get(jobController.scrape);
// .get(jobController.display);
// .get(jobController.findAll)
// .post(jobController.create);
// router.route.get("/", function(req, res) {
// var q = req.params.q;
// var l = req.params.l;

// return axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`);
// });


// Matches with "/api/jobs/:id"
// router
//   .route("/:id")
//   .get(bookController.findById)
//   .put(bookController.update)
//   .delete(bookController.remove);

router.route("/favorite")
.post(userJobController.create);

module.exports = router;
