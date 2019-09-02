const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  //CM : Commented out ObjectID because it's undefined and causinsg the app to crash
  //id: { type: ObjectID, unique: true },
  // Do we need them to input thier name if it should already be associated with thier userId
  firstName: { type: String },
  lastName: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  // Need to pass which question it is to the results
  QuestionID: { type: Array },
  yes: { type: Array },
  willing: { type: Array },
  no: { type: Array }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
