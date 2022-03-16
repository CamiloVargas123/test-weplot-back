const Question = require('../models/question');


function updateQuestion(req, res) {
  let questionData = req.body;

  Question.findByIdAndUpdate("62312e2aecf7ec41c107f264", questionData, (err, updateQuestion) => {
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
    const result = await Question.findById("62312e2aecf7ec41c107f264")
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