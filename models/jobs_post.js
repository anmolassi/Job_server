//building schema
const mongoose=require('mongoose');
const jobPostSchema = new mongoose.Schema({
    business_name:{
        type: String,
        required:true
    },
    job_description:{
        type:String,
        required:true
    },
    job_salary:{
        type:String,
        required:true,
    },
    business_id:{
        type:String,
        required:true,
    }
});


const jobPost = mongoose.model('jobPost',jobPostSchema);

module.exports=jobPost;