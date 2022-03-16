const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchame = Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    unique: true
  },
  tel: String,
  country: String,
  question: Array,
  password: String,
  role: String,
  avatar: String
})

module.exports = mongoose.model("User", UserSchame)