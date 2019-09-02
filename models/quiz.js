const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  username: { type: String },
  javaScriptSkill: { type: Boolean },
  pythonSkill: { type: Boolean },
  javaSkill: { type: Boolean },
  cSharpSkill: { type: Boolean },
  sqlSkill: { type: Boolean }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
