const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userJobSchema = new Schema({
//   url: { type: String, unique: true},
  url: { type: String },
  title: { type: String },
  company: { type: String },
  location: { type: String },
  summary: { type: String },
  date: { type: String },
  ratings: { type: String},
  salary: { type: String},
  /////////////new user specific things//////////////////
  userID: { type: String },
  jobID: { type: String },
  updated: { type: Date, default: Date.now },
  interest: { type: Number },
  status: { type: String },
  notes: { type: String }
});

const UserJob = mongoose.model("UserJob", userJobSchema);

module.exports = UserJob;

// company: "DocuSign"
// location: "Seattle, WA 98101 (Downtown area)"
// query: "python"
// summary: "Experience with C#, PowerShell and/or Python. … Engineering Services | Seattle, WA. … DocuSign is committed to building trust and making the world more agree-able…"
// title: "Junior DevOps Engineer"
// url: "http://www.indeed.com/rc/clk?jk=11e8367991af75b0&from=vj&pos=bottom"
// __v: 0
// _id: "5d69b1d0a6fe186efcfe1097"