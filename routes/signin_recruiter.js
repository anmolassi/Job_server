const express = require("express");
const User = require("../models/signup-recuiter");
const search = require("../models/jobs_post");
const router = express.Router();
const app = express();
const homeController = require("../controllers/home_controller");
var globaluser;
var joblist;
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
      search.find({}, function (err, searches) {
        if (err) {
          console.log("Error in fetching contacts from db");
          return;
        }
        joblist=searches;
        // return res.redirect("back");
        return res.render("company_homepage", { user: globaluser,job_list:joblist });
      });
      
    } else {
      return res.render("back");
    }
  });
});
router.get("/", function (req, res) {
  search.find({}, function (err, searches) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    joblist=searches;
  res.cookie("rec_id", globaluser.id);
  return res.render("company_homepage", { user: globaluser,job_list:joblist });
});
});
router.use("/create-job", require("./create-job"));
router.use("/delete-job", require("./delete-job"));
module.exports = router;
