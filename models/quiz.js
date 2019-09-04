const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  username: { type: String },
  userInterests : {type: [String]},
  user
  userDisintersts : {type: [String]}
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
