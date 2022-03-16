const express = require('express');
const QuestionController = require('../controllers/question');


const api = express.Router();

api.get('/get-questions', QuestionController.getQuestion);
api.put('/update-questions', QuestionController.updateQuestion);

module.exports = api;