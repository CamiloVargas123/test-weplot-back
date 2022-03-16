const express = require("express")
const bodyParse = require("body-parser")

const app = express()
const { API_VERSION } = require('./config')

//load routes
const userRoute = require('./router/user')
const questionRoute = require('./router/question')

app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

// Configure header HTTP ====
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
})

//Router basic
app.use(`/api/${API_VERSION}`, userRoute)
app.use(`/api/${API_VERSION}`, questionRoute);
module.exports = app;