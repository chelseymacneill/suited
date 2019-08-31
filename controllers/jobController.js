const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Defining methods for the bookController
module.exports = {
    // findAll: function (req, res) {
    //     db.Job.find(req.query)
    //         .then(dbJob => res.json(dbJob))
    //         .catch(err => res.status(422).json(err));
    // },
    // findById: function (req, res) {
    //     db.Job.findById(req.params.id)
    //         .then(dbJob => res.json(dbJob))
    //         .catch(err => res.status(422).json(err));
    // },
    // create: function (req, res) {
    //     db.Job.create(req.body)
    //         .then(dbJob => res.json(dbJob))
    //         .catch(err => res.status(422).json(err));
    // },
    // update: function (req, res) {
    //     db.Job.findOneAndUpdate({ id: req.params.id }, req.body)
    //         .then(dbJob => res.json(dbJob))
    //         .catch(err => res.status(422).json(err));
    // },
    // remove: function (req, res) {
    //     db.Job.findById(req.params.id)
    //         .then(dbJob => dbJob.remove())
    //         .then(dbJob => res.json(dbJob))
    //         .catch(err => res.status(422).json(err));
    // },
    scrape: function (req, res) {

        const q = req.query.q;
        const l = req.query.l;
        // db.Job.createIndex( { subject: "text" } );
        
        axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`)

            .then(jobs => {
                let jsonJobs = jobs.data;

                // Collect all promises until we have them all
                Promise.all(
                    // Use map because it returns an array (of promises in our case)
                    jsonJobs.map(job => {
                        job.query = q;
                        // Return the axios.get promise so it can be collected
                        return axios.get(job.url).then(function (response) {
                            var $ = cheerio.load(response.data);
                            job.subject = $("body").text().toLowerCase();
                            // .replace(/[\n\t]/g, "");
                            // Return the db promises so it is collected in the axios promise
                            return db.Job.findOneAndUpdate({ url: job.url }, job, { upsert: true })
                                .catch(err => console.log(err))
                        });
                    })
                    // swap 1 here ////////////////////////////////////////////////////////
                ).then(function () {
                    console.log("Searching for jobs...");
                    db.Job.find({ query: q }).sort({ date: 1 })
                        .then(function (dbJob) {
                            res.json( dbJob );
                            console.log("job displayed")
                        })
                });

                // swap 1 ends here  ////////////////////////////////////////////////////////
                 // swap 2 here ////////////////////////////////////////////////////////
                // ).then(function () {
                //     console.log("Searching for jobs...");
                //     db.Job.find(
                //             { $text: { $search: "javascript " } },
                //             { score: { $meta: "textScore" } }
                //          ).sort( { score: { $meta: "textScore" } } )
                //         .then(function (dbSSJob) {
                //             res.json( dbSSJob );
                //             console.log("job using sort score displayed")
                //         })
                // });
                // swap 2 ends here  ////////////////////////////////////////////////////////

            })

    },

};