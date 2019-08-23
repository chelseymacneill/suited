const router = require("express").Router();
const jobController = require("../../controllers/jobController");


// Matches with "/api/jobs"
router.route("/")
.get(jobController.scrape);
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

module.exports = router;
