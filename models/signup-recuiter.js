//building schema
const mongoose=require('mongoose');
const signUpRecSchema = new mongoose.Schema({
    business:{
        type: String,
        required:true
    },
    business_owner:{
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


const signUpRec = mongoose.model('signUpRec',signUpRecSchema);

module.exports=signUpRec;