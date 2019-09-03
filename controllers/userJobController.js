const db = require("../models");
const axios = require("axios");

module.exports = {
    findAll: function (req, res) {
        db.UserJob.find(req.body)
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    findOne: function (req, res) {
        db.UserJob.findOne(req.query)
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
        // db.UserJob.findOneAndUpdate({ id: req.params.id }, req.body)
        console.log("JOB CONTROLLER", req.body)
        db.UserJob.updateOne({ _id: req.body.id }, { status: req.body.status} )
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.UserJob.findOne(req.body)
            .then(dbJob => dbJob.remove())
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    }
}
