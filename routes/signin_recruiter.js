const express = require("express");
const User = require("../models/signup-recuiter");
const search = require("../models/jobs_post");
const applications = require("../models/jobs_applied");
const router = express.Router();
const app = express();
const homeController = require("../controllers/home_controller");
const userController = require("../controllers/user_controller");
var globaluser;
var joblist;
var applicationlist;
var companyid;
router.post("/", function (req, res) {
  console.log(req.body);
  User.findOne({ email: req.body.business }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing in");
      return;
    }
    if (user) {
      if (user.password != req.body.password) {
        console.log(user.password);
        return res.render("wrongCredentials");
      }
      res.cookie("rec_id", user.id);
      globaluser = user;
      companyid=user.id;
      applications.find({business_id:companyid}, function (err, searches) {
        if (err) {
          console.log("Error in fetching contacts from db");
          return;
        }
        applicationlist=searches;
      });
      search.find({business_id:companyid}, function (err, searches) {
        if (err) {
          console.log("Error in fetching contacts from db");
          return;
        }
        joblist=searches;
        return res.render("company_homepage", { user: globaluser,job_list:joblist,applicants_list:applicationlist });
      });
      
    } else {
      return res.redirect("back");
    }
  });
});
router.get("/", function (req, res) {
  search.find({business_id:companyid}, function (err, searches) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    joblist=searches;
  res.cookie("rec_id", globaluser.id);
  return res.render("company_homepage", { user: globaluser,job_list:joblist,applicants_list:applicationlist });
});
});
router.use("/create-job", require("./create-job"));
router.use("/delete-job", require("./delete-job"));
router.get('/sign-out',userController.signOut);
module.exports = router;
