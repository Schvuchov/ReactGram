const express = require("express")
const router = express()

//aqui vamos ter as rotas da aplicação

router.use("/api/users", require("./UserRoutes"))

//test route
router.get("/", (req, res) => {
    res.send("API Working!")
})

module.exports = router

