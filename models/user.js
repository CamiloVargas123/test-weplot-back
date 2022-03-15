const user = {
  fname: String,
  lname: String,
  email: {
    type: String,
    unique: true
  },
  tel: String,
  country: String,
  question: Array,
  password: String
}