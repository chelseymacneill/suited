const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  id: { type: ObjectID, unique: true},
  firstName: { type: String },
  lastName: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  yes: { type: Array },
  willing: { type: Array },
  no: { type: Array }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
