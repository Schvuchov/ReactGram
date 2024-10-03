const express = require("express")
const router = express.Router()

//chamar as funções do Controller
//objeto exportado la (no controller) esta sendo desestruturado aqui em var separadas e vão responder por rotas para disponibilizar para app
const {register, login, getCurrentUser} = require("../controllers/UserController.js")

//Middlewares
const validate = require("../middlewares/handleValidation.js")
const { userCreateValidation, loginValidation } = require("../middlewares/userValidations.js")
const authGuard = require("../middlewares/authGuard.js")

//Routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)

module.exports = router
