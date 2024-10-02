const mongoose = require("mongoose")
const { Schema } = mongoose

const photoSchema = new Schema(
    {
        image: String,
        title: String,
        likes: Array,
        comments: Array,
        userId: mongoose.ObjectId,
        userName: String,
    },
    {
        timestamps: true,
    }
)

//image é string pois vamos usar o caminho 
// likes array pois tbm vai conter o nome do usuario, se curtiu ou não...

const Photo = mongoose.model("Photo", photoSchema)
module.exports = Photo