require("dotenv").config()

const express = require("express")
const path = require("path")  //diretorio das imagens
const cors = require("cors")

const port = process.env.PORT;

const app = express()

//config JSON and form data responde
app.use(express.json())
app.use(express.urlencoded({ extended: false })); //esse outro formato é pq json n usa imagem

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
});