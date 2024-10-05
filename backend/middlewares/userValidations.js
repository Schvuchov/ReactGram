const {body} = require("express-validator")
//pega o body da req

const userCreateValidation = () => {
    return [
        //verifica se o nome de usuario é ou não uma string e manda uma mensagem e depois verifica o tamanho
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome precisa conter no mínimo 3 caracteres."),
        body("email")
            .isString()
            .withMessage("O email é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 5 })
            .withMessage("A senha precisa conter no mínimo 5 caracteres."),
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .custom((value, {req}) => {
                if (value != req.body.password) {
                    throw new Error("As senhas não são iguais")
                }
                return true
            }),
    ]
}

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("password").isString().withMessage("A senha é obrigatória"),
    ]
}

const userUpdateValidation = () => {

    return[
        body("name")
            .optional()
            .isLength({ min: 3 })
            .withMessage("O nome precisa conter no mínimo 3 caracteres."),
        body("password")
            .optional()
            .isLength({ min: 5 })
            .withMessage("A senha precisa conter no mínimo 5 caracteres."),
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation
}