const express = require("express");
const job = require("../models/jobs_post");
const router = express.Router();
const app = express();
router.post("/", function (req, res) {
    console.log("burraaaaaaaaahhhh");
  console.log(req.body);
  console.log(req.query);
  job.create(
    {
      business_name: req.query.business_name,
      job_description:req.body.jobdescription,
      job_salary:req.body.jobsalary,
      business_id:req.query.business_id,
    },
    function (err, newJob) {
      if (err) {
        console.log("error in creating a Job!");
        return;
      }
      console.log("**********", newJob);
    }
  );
  return res.redirect('back');
});
module.exports = router;
