const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchame = Schema({
  question1: String,
  question2: String,
  question3: String,
  question4: String,
})

module.exports = mongoose.model("Question", UserSchame)