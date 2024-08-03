//importando o model de user
const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

//função auxiliar para gerar um token, pra ser usada tipo quando cria um usuario, quando faz login

//generate user token
const generateToken = (id) => {
    //gerando o token passando como argumento o id, nosso segredo e uma data de expiração
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    })
}

// Register user and sign in
const register = async(req, res) => {
    //vamos criar essa função na prox aula
    res.send("Registro")
}

//para disponibilizar para as rotas
module.exports = {
    register,
}