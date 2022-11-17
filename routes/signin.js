const express = require("express");
const User = require("../models/signup");
const search = require("../models/search");
const router = express.Router();
const app = express();
const homeController = require("../controllers/home_controller");
var userid;
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
      userid=user.id;
      res.cookie("user_id", user.id);
      search.find({}, function (err, searches) {
        if (err) {
          console.log("Error in fetching contacts from db");
          return;
        }
        // return res.redirect("back");
        return res.render("search", { search_list: searches, user: user });
      });
    } else {
      return res.redirect("back");
    }
  });
});




router.get("/", function (req, res) {
  // return res.redirect("back");
  res.cookie("user_id", userid);
  var list;
  search.find({},function (err, searches){
    list=searches;
    console.log(list);
  });
  var userr;
  User.findOne({id:req.cookies.user_id}, function (err, user) {
    if (err) {
      console.log("Error in fetching USER from db");
      return;
    }
    console.log(user);
    userr=user;
    console.log(userr);
    return res.render("search", { search_list: list, user:  userr});
  }); 
});


router.use("/filter", require("./search"));



router.get("/deleteSearch", function (req, res) {
  console.log(req.query);
  search.findByIdAndRemove(req.query.id, function (err) {
    if (err) {
      console.log("ERORRR", err);
    }
    console.log("aa chleya");
    search.find({}, function (err, searches) {
      if (err) {
        console.log("Error in fetching contacts from db");
        return ;
      }
      console.log(searches);
      //return res.send(req.params);
      var user=User.findOne({_id:req.cookies.user_id}, function (err, user) {
            if (err) {
              console.log("Error in fetching USER from db");
              return;
            }
          });
        res.render("search", { search_list: searches, user: user });
    });
    return res.redirect("back");
  });
});

module.exports = router;
