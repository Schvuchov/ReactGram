const express = require("express")
const router = express.Router()

//chamar as funções do Controller
//objeto exportado la (no controller) esta sendo desestruturado aqui em var separadas e vão responder por rotas para disponibilizar para app
const {
    register, 
    login, 
    getCurrentUser,
    update,
} = require("../controllers/UserController.js")

//Middlewares
const validate = require("../middlewares/handleValidation.js")
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations.js")
const authGuard = require("../middlewares/authGuard.js")
const { imageUpload } = require("../middlewares/imageUpload.js")

//Routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)

module.exports = router
