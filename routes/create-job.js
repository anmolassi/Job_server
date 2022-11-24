const express = require("express");
const job = require("../models/jobs_post");
const router = express.Router();
const app = express();
const search = require("../models/signup");
var nodemailer = require('nodemailer');
router.post("/", function (req, res) {
  console.log(req.query);
  console.log(req.body);
  job.create(
    {
      business_name: req.query.business_name,
      job_description:req.body.jobdescription,
      job_salary:req.body.jobsalary,
      business_id:req.query.business_id,
      email:req.query.business_email,
    },
    function (err, newJob) {
      if (err) {
        console.log("error in creating a Job!");
        return;
      }
      console.log("**********", newJob);
      search.find({}, function (err, users) {
        if (err) {
          console.log("Error in fetching contacts from db");
          return;
        }
        var arr = [];
        for (let i = 0; i < users.length; i++) {
          let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
              user: 'anmolassi01@gmail.com',
               pass: '************'
            },
          });
          let details={
            from: "anmolassi01@gmail.com",
            to:`${users[i].email}`,
            subject:"New Job Alert",
            text:`Hi ${users[i].fname} ${users[i].lname}, new job alert:
Company: ${req.query.business_name}
Job Description: ${req.body.jobdescription}
Job Salary: ${req.body.jobsalary}`
          }
          mailTransporter.sendMail(details,(err)=>{
            if(err){
              console.log(err);
              console.log("it has an error");
            }else{
              console.log("new job alert email has sent !");
            }
          });
        }
      });
      
    }
  );
  return res.redirect('back');
});
module.exports = router;
