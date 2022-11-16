//building schema
const mongoose=require('mongoose');
const searchSchema = new mongoose.Schema({
    search:{
        type: String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
});


const search = mongoose.model('search',searchSchema);

module.exports=search;