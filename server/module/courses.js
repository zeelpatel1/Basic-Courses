const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
})

module.exports=mongoose.model('Lists',courseSchema)