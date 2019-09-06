const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Defining methods for the jobController
module.exports = {
    scrape: function (req, res) {

        const q = req.query.q;
        const l = req.query.l;
        const goodArray = req.query.g.split("-");
        const mehArray = req.query.y.split("-");
        const badArray = req.query.r.split("-");
        console.log("array: " + goodArray);
        // const array 
        // db.Job.createIndex( { subject: "text" } );

        axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`)

            .then(jobs => {
                let jsonJobs = jobs.data;

                // Collect all promises until we have them all
                Promise.all(
                    // Use map because it returns an array (of promises in our case)
                    jsonJobs.map((job, i) => {
                        return axios.get(job.url).then(function (response) {
                            // if (response != undefined && response.status != 500) {
                                const $ = cheerio.load(response.data);
                                const str = $("body").text().toLowerCase();
                                const green = goodArray.filter(element => str.includes(element));
                                const yellow = mehArray.filter(element => str.includes(element));
                                const red = badArray.filter(element => str.includes(element));
                                job.green = green;
                                job.yellow = yellow;
                                job.red = red;
                                console.log(job);

                            // }
                            // else {
                            //     console.log("skipped due to error")
                            // }
                        }).catch((err) => {
                            console.log("ERROR ERROR ERROR!!!!!" +err)
                            jsonJobs.splice(i, 1);
                        });
                    })
                    
                ).then(function () {
                    
                            res.json(jsonJobs);
                            console.log(jsonJobs);
                            console.log("jobs displayed")
                        
                }).catch(err => console.log(err));

            })

    },

};