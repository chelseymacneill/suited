// const db = require("../models");
// const axios = require("axios");

// // Defining methods for the bookController
// module.exports = {
//   findAll: function(req, res) {
//     db.Book.find(req.query)
//       .then(dbBook => res.json(dbBook))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Book.findById(req.params.id)
//       .then(dbBook => res.json(dbBook))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.Book.create(req.body)
//       .then(dbBook => res.json(dbBook))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Book.findOneAndUpdate({ id: req.params.id }, req.body)
//       .then(dbBook => res.json(dbBook))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Book.findById(req.params.id)
//       .then(dbBook => dbBook.remove())
//       .then(dbBook => res.json(dbBook))
//       .catch(err => res.status(422).json(err));
//   },
//   scrape: function(req, res) {
//     var q = req.query.q;
//     var l = req.query.l;
    
//     axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`)
//       .then(jobs => {
//         res.json(jobs.data)
//       })
//       .catch(err => console.log(err));
//     }
// };
