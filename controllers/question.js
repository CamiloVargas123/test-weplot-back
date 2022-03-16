const Question = require('../models/question');

const idColletion = "62315dd995761b0c813856d2"

function updateQuestion(req, res) {
  let questionData = req.body;

  Question.findByIdAndUpdate(idColletion, questionData, (err, updateQuestion) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!updateQuestion) {
        res.status(404).send({ message: "No se encontró el documento" });
      } else {
        res.status(200).send({ message: "Preguntas actualizadas" });
      }
    }
  })
}


async function getQuestion(req, res) {
  try {
    const result = await Question.findById(idColletion)
    if(result) return res.status(200).send({ result });
    return res.status(404).send({ message: "Documento no encontrado" });
  } catch (error) {
    res.status(500).send({ message: "Error del servidor", detailt: error.message });
  }
}

module.exports = {
  getQuestion,
  updateQuestion
}