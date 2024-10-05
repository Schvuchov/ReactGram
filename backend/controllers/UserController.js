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
    const { name, email, password } = req.body

    //checando se usuario existe
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ["Por favor utilize outro e-mail."]})
        return
    }

    //gera password hash
    const salt = await bcrypt.genSalt() //gera string aleatoria
    const passwordHash = await bcrypt.hash(password, salt)

    //criar usuário
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    })

    // se o user for criado com sucesso, retorna token
    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

//Sign user in
const login = async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    //se o usuario existe
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }

    //se as senhas batem
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha inválida."]})
        return
    }

    //retorna usuario com token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    })

}

//para conseguir acessar o perfil do usuário
const getCurrentUser = async(req, res) => {
    const user = req.user;

    res.status(200).json(user)
}

//atualizar um usuário
const update = async(req, res) => {
    res.send("Update")
}

//para disponibilizar para as rotas
module.exports = {
    register,
    login,
    getCurrentUser,
    update,
}