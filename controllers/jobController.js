const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Defining methods for the jobController
module.exports = {

  
  ////////////////////////////////////COMMENTING OUT DURING CONFLICT RESOLUTION/////////////////////////////////
  //DELETEE IF NOT IMPORTANT OR DUPE
//   findAll: function(req, res) {
//     db.Job.find(req.query)
//       .then(dbJob => res.json(dbJob))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Job.findById(req.params.id)
//       .then(dbJob => res.json(dbJob))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.Job.create(req.body)
//       .then(dbJob => res.json(dbJob))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Job.findOneAndUpdate({ id: req.params.id }, req.body)
//       .then(dbJob => res.json(dbJob))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Job.findById(req.params.id)
//       .then(dbJob => dbJob.remove())
//       .then(dbJob => res.json(dbJob))
//       .catch(err => res.status(422).json(err));
//   },
//   scrape: function(req, res) {
//     // const dummy =
//     // {url: "hey",
//     // title: "hi",
//     // company: "hi",
//     // location: "hi",
//     // summary: "hi",
//     // date: "hi",
//     // ratings: "hi",
//     // apiID: "hi"}

//     // db.Job.create(dummy).catch(err => res.status(422).json(err));

//     const q = req.query.q;
//     const l = req.query.l;

//     axios
//       .get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`)
//       // .then(results =>
//       //     results.data.filter(
//       //       result =>
//       //         result.url &&
//       //         result.title &&
//       //         result.company &&
//       //         result.location &&
//       //         result.summary &&
//       //         result.date
//       //     )
//       //   )

//       //const jobListings = jobs.map( )

//       .then(jobs => {
//         let jsonJobs = jobs.data;
//         //console.log("this is jsonJobs" + jsonJobs);
//         jsonJobs.forEach(function(job) {
//           job.query = q;
//           db.Job.findOneAndUpdate({ url: job.url }, job, { upsert: true })
//             .then(function(dbJob) {
//               //console.log(dbJob)
//               console.log("displaying jobs now");
//               db.Job.find({ query: q })
//                 .sort({ date: 1 })
//                 .then(function(dbJob) {
//                   res.json(dbJob);
//                   console.log("jobs found!");
//                 });
//             })
//             .catch(err => res.status(422).json(err));
//         });
//         // res.json(jsonJobs);
//         // db.Job.create(jsonJobs);

//         //console.log(jsonJobs)
//       });
////////////////////////////////////////////////////////////////
    //   .then(apiJobs =>
    //     db.Job.find().then(dbJobs =>
    //         apiJobs.filter(apiJob =>
    //         dbJobs.every(dbJob => dbJob.apiID.toString() !== apiJob.id)
    //       )
    //     )

    //   )
    //   .then(db.Job.insert(result, function (err, result) {
    //     if (err)
    //        console.log('Error');
    //     else
    //     console.log('Success');

    // }))
    // .then(function(jobs) {
    //     db.Job.create(jobs)
    //       .then(dbJob => res.json(dbJob))
    //       .catch(err => res.status(422).json(err));
    //   })
//   }

  //     display: function (req, res) {

  //         const q = req.query.q;
  //     //const l = req.query.l;
  //     // db.Job.find({ query: q })
  //     // .then(function (dbJob){
  //     //     res.json(dbJob);
  //     //     console.log("jobs found!")
  //     // })
  //     .catch(err => res.status(422).json(err));
  // }
// };

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

