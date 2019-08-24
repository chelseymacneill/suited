const db = require("../models");
const axios = require("axios");

// Defining methods for the bookController
module.exports = {
  findAll: function(req, res) {
    db.Job.find(req.query)
      .then(dbJob => res.json(dbJob))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Job.findById(req.params.id)
      .then(dbJob => res.json(dbJob))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Job.create(req.body)
      .then(dbJob => res.json(dbJob))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Job.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbJob => res.json(dbJob))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Job.findById(req.params.id)
      .then(dbJob => dbJob.remove())
      .then(dbJob => res.json(dbJob))
      .catch(err => res.status(422).json(err));
  },
  scrape: function(req, res) {
    // const dummy = 
    // {url: "hey",
    // title: "hi",
    // company: "hi",
    // location: "hi",
    // summary: "hi",
    // date: "hi",
    // ratings: "hi",
    // apiID: "hi"}

    // db.Job.create(dummy).catch(err => res.status(422).json(err));


    const q = req.query.q;
    const l = req.query.l;
    
    axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`)
    // .then(results =>
    //     results.data.filter(
    //       result =>
    //         result.url &&
    //         result.title &&
    //         result.company &&
    //         result.location &&
    //         result.summary &&
    //         result.date 
    //     )
    //   )

    //const jobListings = jobs.map( )

    .then(jobs => {
        let jsonJobs = jobs.data;
        console.log(jsonJobs);
        res.json(jsonJobs);
        db.Job.create(jsonJobs);
        
        //console.log(jsonJobs)
    })
    .catch(err => res.status(422).json(err));
    
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
    
    
  }
    
    
};