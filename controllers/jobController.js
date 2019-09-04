const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Defining methods for the jobController
module.exports = {
    scrape: function (req, res) {

        const q = req.query.q;
        const l = req.query.l;
        const array = req.query.s.split("-");
        console.log("array: " + array);
        // const array 
        // db.Job.createIndex( { subject: "text" } );

        axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`)

            .then(jobs => {
                let jsonJobs = jobs.data;

                // Collect all promises until we have them all
                Promise.all(
                    // Use map because it returns an array (of promises in our case)
                    jsonJobs.map(job => {
                        job.query = q;
                        //console.log(job);
                        // Return the axios.get promise so it can be collected
                        return axios.get(job.url).then(function (response) {
                            if (response != undefined && response.status != 502) {
                                const $ = cheerio.load(response.data);
                                const str = $("body").text().toLowerCase();
                                const subj = array.filter(element => str.includes(element));//{
                                //if(str.includes(element)){
                                // job.subject.push(element);
                                //  console.log(element);
                                // db.Job.findOneAndUpdate({ url: job.url }, { $push: { subject: element } }, { new: true })
                                //}
                                //})
                                // job.subject = ;
                                // .replace(/[\n\t]/g, "");
                                // Return the db promises so it is collected in the axios promise
                                //console.log(subj);
                                return db.Job.findOneAndUpdate({ url: job.url }, { $addToSet: { subject: { $each: subj } }, $set: job }, { upsert: true })
                                    .then(function () {

                                    })
                                    .catch(err => console.log(err))
                            }
                            else {
                                console.log("skipped due to error")
                            }
                        });
                    })
                    // swap 1 here ////////////////////////////////////////////////////////
                ).then(function () {
                    console.log("Searching for jobs...");
                    db.Job.find({ query: q }).sort({ date: 1 })
                        // https://stackoverflow.com/questions/9040161/mongo-order-by-length-of-array
                        .then(function (dbJob) {
                            res.json(dbJob);
                            console.log("job displayed")
                        })
                        .catch(err => console.log(err))
                }).catch(err => console.log(err));

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

