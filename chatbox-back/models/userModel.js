const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    date_of_birth: {type: Date},
    state: String,
    telNumber: Number,
    email: String,
    password: String
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel  
