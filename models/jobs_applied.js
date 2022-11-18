//building schema
const mongoose=require('mongoose');
const jobsAppliedSchema = new mongoose.Schema({
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
    },
    applicant_id:{
        type:String,
        required:true,
    },
    job_id:{
        type:String,
        required:true,
    },
    applicant_email:{
        type:String,
        required:true,
    },
    f_name:{
        type:String,
        required:true,
    },
    l_name:{
        type:String,
        required:true,
    }
});


const jobsApplied = mongoose.model('jobsApplied',jobsAppliedSchema);

module.exports=jobsApplied;