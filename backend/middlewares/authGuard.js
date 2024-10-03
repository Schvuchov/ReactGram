const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

//validação de autenticação 
const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] //split no espaço, 1 pega a segunda parte

    //check if header has a token
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]})
    
    //check if token is valid
    try {
        //se o token combina
        const verified = jwt.verify(token, jwtSecret)

        //acha usuario
        req.user = await User.findById(verified.id).select("-password")

        next()

    } catch (error) {
        res.status(401).json({errors: ["Token inválido."]})
    }
}

module.exports = authGuard
