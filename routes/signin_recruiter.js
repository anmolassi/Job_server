const express = require("express");
const User = require("../models/signup-recuiter");
// const Contact = require("../models/search");
const router = express.Router();
const app = express();
var list;
//const User=require('../models/signup-recuiter');
const homeController = require("../controllers/home_controller");
router.post("/", function (req, res) {
  //steps to authenticate
  //find the  user
  console.log(req.body);
  User.findOne({ email: req.body.business }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing in");
      return;
    }
    //handle user found
    if (user) {
      // handle password which don't match
      if (user.password != req.body.password) {
        console.log(user.password);
        return res.render("wrongCredentials");
      }
      //handle session creation
      res.cookie("rec_id", user.id);
    } else {
      //handle user not found
      return res.render("back");
    }
  });
});

module.exports = router;
