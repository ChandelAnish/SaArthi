const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"username must be provided"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email must be provided"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"password must be provided"],
        trim:true
    },
    disability:{
        type:String,
        required:[true,"disability must be provided"],
        trim:true
    },
    profileImageURL:{
        type:String,
        default:'/defaultUserImg.jpg',
        trim:true
    }
})


module.exports = mongoose.model('user',userSchema)