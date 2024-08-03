const express = require("express")
const router = express.Router()

//chamar as funções do Controller
//objeto exportado la esta sendo desestruturado aqui em var separadas e vão responder por rotas
const {register} = require("../controllers/UserController.js")

//Routes
router.post("/register", register)

module.exports = router
