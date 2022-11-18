const express = require("express");
const User = require("../models/signup");
const search = require("../models/search");
const job = require("../models/jobs_post");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const app = express();
const homeController = require("../controllers/home_controller");
const userController = require("../controllers/user_controller");
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
var userid;
var joblist;
router.post("/", function (req, res) {
  console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing in");
      return;
    }
    if (user) {
      if (user.password != req.body.password) {
        return res.render("wrongCredentials");
      }
      userid = user.id;
      res.cookie("user_id", user.id);
      job.find({}, function (err, searches) {
        if (err) {
          console.log("Error in fetching contacts from db");
          return;
        }
        joblist = searches;
      });
      search.find({ user_id: user._id }, function (err, searches) {
        if (err) {
          console.log("Error in fetching contacts from db");
          return;
        }
        // return res.redirect("back");
        var arr = [];
        for (let i = 0; i < joblist.length; i++) {
          for (let j = 0; j < searches.length; j++) {
            if (searches[j].search == joblist[i].business_name) {
              arr.push(joblist[i]);
            }
          }
        }
        return res.render("search", {
          search_list: searches,
          user: user,
          job_list: arr,
        });
      });
    } else {
      return res.redirect("back");
    }
  });
});

router.get("/sign-out", userController.signOut);

router.get("/", function (req, res) {
  // return res.redirect("back");
  res.cookie("user_id", userid);
  job.find({}, function (err, searches) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    joblist = searches;
  });
  var list;
  search.find({ user_id: userid }, function (err, searches) {
    var arr = [];
    list = searches;
    for (let i = 0; i < joblist.length; i++) {
      for (let j = 0; j < searches.length; j++) {
        if (searches[j].search == joblist[i].business_name) {
          arr.push(joblist[i]);
        }
      }
    }
    var userr;
    var cookieid = req.cookies.user_id;
    User.findOne({ _id: ObjectId(cookieid) }, function (err, user) {
      if (err) {
        console.log("Error in fetching USER from db");
        return;
      }
      userr = user;
      return res.render("search", {
        search_list: list,
        user: user,
        job_list: arr,
      });
    });
  });
});

router.use("/filter", require("./search"));

router.get("/deleteSearch", function (req, res) {
  console.log(req.query);
  search.findByIdAndRemove(req.query.id, function (err) {
    if (err) {
      console.log("ERORRR", err);
    }
    search.find({}, function (err, searches) {
      if (err) {
        console.log("Error in fetching contacts from db");
        return;
      }
      //return res.send(req.params);
      User.findOne({ _id: req.cookies.user_id }, function (err, user) {
        if (err) {
          console.log("Error in fetching USER from db");
          return;
        }
      });
      return res.redirect("back");
    });
  });
});
router.use("/apply-job", require("./apply-job"));
module.exports = router;
