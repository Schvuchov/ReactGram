require("dotenv").config()

const express = require("express")
const path = require("path")  //diretorio das imagens
const cors = require("cors")

const port = process.env.PORT;

const app = express()

//config JSON and form data responde
app.use(express.json())
app.use(express.urlencoded({ extended: false })); //esse outro formato é pq json n usa imagem

//solve CORS - qunado executamos as requisições de um mesmo dominio
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//DB connection
require("./config/db.js")

//routes
const router = require("./routes/Router.js")
app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
});