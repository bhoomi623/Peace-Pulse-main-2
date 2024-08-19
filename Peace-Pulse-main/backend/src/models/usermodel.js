const mongoose = require('mongoose')



//Attributes
const userSchema = mongoose.Schema({
    

    username : {
        type : String,
        required: true,
        unique : true
    },

    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    }

}, {timestamps:true})
module.exports=mongoose.model('usermodel', userSchema)
