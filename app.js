const express = require("express")
const bodyParse = require("body-parser")

const app = express()
//const { API_VERSION } = require('./config')

app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

//Router basic

module.exports = app;