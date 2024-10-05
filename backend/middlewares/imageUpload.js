const multer = require("multer")
const path = require("path")

//onde a imagem vai ser salva
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)  //callback diz a pasta que a imagem vai ser salva
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))  //para mudar nome da img pra n haver subst (sistema local)
    }
})

//validação e onde a imagem vai ser salva
const imageUpload = muler({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            // fazer upload apenas de png e jpg
            return cb(new Error("Por favor, envie apenas png ou jpg."))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }