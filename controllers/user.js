const bcrypt = require('bcrypt')
const jwt = require("../services/jwt");
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
    question,
    avatar,
  } = req.body;

  const saltRounds = 10;

  user.fname = fname;
  user.lname = lname;
  user.email = email.toLowerCase();
  user.tel = prefix + tel;
  user.city = city;
  user.question = question
  user.avatar = avatar
  user.role = "user";

  if (password.length < 1 || repeatPassword.length < 1) return res.status(404).send({ message: "Las contraseñas no exiten" })
  if (password !== repeatPassword) return res.status(409).send({ message: "Las contraseñas deben coincidir" })


  await bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).send({ message: "Error al encriptar la contraseña" })
    user.password = hash;
    user.save((err, userStored) => {
      if (err) return res.status(500).send({ message: "Error al guardar " })
      if (!userStored) return res.status(404).send({ message: "Error al crear usuario" })
      return res.status(200).send({ user: userStored, message: "Usuario creado" })
    });
  })
}

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) return res.status(500).send({ message: "Error del servidor" })
    if (!userStored) return res.status(404).send({ message: "Usuario no encontrado" })

    bcrypt.compare(password, userStored.password, (err, check) => {
      if (err) return res.status(500).send({ message: "error del servidor" })
      if (!check) return res.status(404).send({ message: "contraseña incorrecta" })
      return res.status(200).send({ accessToken: jwt.createAccessToken(userStored) })
    })
  })
}

async function getAllUsers(req, res) {
  try {
    const result = await User.find({role:{$ne: 'admin'}})
    if(result) return res.status(200).send({ result });
    return res.status(404).send({ message: "No exiten usuarios" });
  } catch (error) {
    res.status(500).send({ message: "Error del servidor", detailt: error.message });
  }
}

module.exports = {
  signUp,
  signIn,
  getAllUsers
}