const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  url: { type: String, unique: true},
  query: { type: String },
  title: { type: String },
  company: { type: String },
  location: { type: String },
  summary: { type: String },
  date: { type: String },
  ratings: { type: String},
  salary: { type: String}
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;



// ({
//   url: { type: String, required: true },
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   summary: { type: String, required: true },
//   date: { type: String, required: true},
//   ratings: { type: String},
//   salary: { type: String},
//   id: { type: String, required: true, unique: true}
// });