const express = require("express");
const job_apply = require("../models/jobs_applied");
const router = express.Router();
const app = express();
var nodemailer = require('nodemailer');
router.get("/", function (req, res) {
  console.log("burraaaaaaaaahhhh");
  console.log(req.body);
  console.log(req.query);
  job_apply.create(
    {
      business_name: req.query.businessname,
      job_description: req.query.jobdescription,
      job_salary:req.query.jobsalary,
      business_id:req.query.businessid,
      applicant_id:req.query.applicantid,
      job_id:req.query.jobid,
      applicant_email:req.query.applicantemail,
      f_name:req.query.fname,
      l_name:req.query.lname,
      resume:`${req.query.applicantemail}.pdf`
    },
    function (err, newJobapply) {
      if (err) {
        console.log("error in creating a Job apply!");
        console.log(err);
        return;
      }
      console.log("**********", newJobapply);
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
          user: 'anmolassi01@gmail.com',
           pass: 'mekngqzfjtcmujjt'
        },
      });
      let details={
        from: "anmolassi01@gmail.com",
        to:`${newJobapply.applicant_email}`,
        subject:"New Job Applied",
        text:`Hi ${newJobapply.f_name} ${newJobapply.l_name}, You have successfully applied for:
Company: ${req.query.businessname}
Job Description: ${newJobapply.job_description}
Job Salary: ${newJobapply.job_salary}
Kindly send your resume on: ${req.query.business_email}`
      }
      mailTransporter.sendMail(details,(err)=>{
        if(err){
          console.log(err);
          console.log("it has an error");
        }else{
          console.log("job apply email has sent !");
        }
      });
    }
  );
  // return res.render('index',{});
  return res.redirect('back');
});
module.exports = router;
