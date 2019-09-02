const db = require("../models");
const axios = require("axios");

module.exports = {
    findAll: function (req, res) {
        db.UserJob.find(req.query)
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.UserJob.findById(req.params.id)
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.UserJob.create(req.body)
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.UserJob.findOneAndUpdate({ id: req.params.id }, req.body)
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.UserJob.remove(req.query)
            // .then(dbJob => dbJob.remove())
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    }
}
