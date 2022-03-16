const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const User = require('../models/user')

async function signUp(req, res) {
  const user = new User();
  const {
    fname,
    lname,
    email,
    password,
    repeatPassword,
    prefix,
    tel,
    city,
    question1,
    question2,
    question3,
    question4
  } = req.body;

  const saltRounds = 10;

  user.fname = fname;
  user.lname = lname;
  user.email = email;
  user.tel = prefix + tel;
  user.city = city;
  user.question = [question1, question2, question3, question4]
  user.role = "user";

  if (password.length < 1 || repeatPassword.length < 1) return res.status(404).send({ message: "Las contraseñas no exiten" })
  if (password !== repeatPassword) return res.status(409).send({ message: "Las contraseñas deben coincidir" })


  await bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).send({ message: "Error al encriptar la contraseña" })
    user.password = hash;
    user.save((err, userStored) => {
      if (err) return res.status(500).send({ message: "Error al guardar "})
      if (!userStored) return res.status(404).send({ message: "Error al crear usuario" })
      return res.status(200).send({ user: userStored, message: "Usuario creado" })
    });
  })
}

module.exports = {
  signUp
}