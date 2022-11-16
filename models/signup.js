//building schema
const mongoose=require('mongoose');
const signUpSchema = new mongoose.Schema({
    fname:{
        type: String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        
    }
});


const signUp = mongoose.model('signUp',signUpSchema);

module.exports=signUp;