const db = require("../models");
// const axios = require("axios");

module.exports = {
    findAll: function (req, res) {
        db.UserJob.find(req.body)
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    // findOne: function (req, res) {
    //     db.UserJob.findOne(req.query)
    //         .then(dbJob => res.json(dbJob))
    //         .catch(err => res.status(422).json(err));
    // },
    // findById: function (req, res) {
    //     db.UserJob.findById(req.params.id)
    //         .then(dbJob => res.json(dbJob))
    //         .catch(err => res.status(422).json(err));
    // },
    create: function (req, res) {
        console.log("CREATE USERJOB CONTROLLER: ", req.body)
        db.UserJob.create(req.body)
            .then(dbJob => res.json(dbJob))
            // .catch(err => res.status(422).json(err));
            .catch(err => console.log(err));

    },
    update: function (req, res) {
        db.UserJob.updateOne({ _id: req.body.id }, req.body )
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        console.log("DELETE FAVORITE", req.body)

        db.UserJob.findOne({ _id: req.body.id })
            .then(dbJob => dbJob.remove())
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    createNote: function (req, res) {
        db.UserJob.updateOne({ _id: req.body.id }, 
            { $push: { 
                    notes: req.body.text
                        // {text: req.body.text} 
                } 
            }, { new: true })
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    },
    deleteNote: function (req, res) {
        console.log("DELETE NOTE", req.body)
        db.UserJob.updateOne({ _id: req.body.id }, 
            { $pull: { 
                    notes: req.body.note
                        // {text: req.body.text} 
                } 
            })
            .then(dbJob => res.json(dbJob))
            .catch(err => res.status(422).json(err));
    }
}
