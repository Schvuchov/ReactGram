const { validationResult } = require("express-validator")

const validate = (req, res, next) => {
    //erros da req
    const errors = validationResult(req)

    //se não tem erro, continua a req
    if(errors.isEmpty()){
        return next()
    }

    const extractedErrors = []

    //pega cada um dos erros e cria uma mensagem com eles no extractedErrors
    errors.array().map((err) => extractedErrors.push(err.msg))

    return res.status(422).json({
        errors: extractedErrors
    })
    //no fronted vamos estar consumindo errors pra entender o erro e dar o feedback para o usuário
}

module.exports = validate
