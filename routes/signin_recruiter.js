const express = require("express");
const User = require("../models/signup-recuiter");
const router = express.Router();
const app = express();
const homeController = require("../controllers/home_controller");
var globaluser;
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
      return res.render("company_homepage", { user: user });
    } else {
      return res.render("back");
    }
  });
});
router.get("/", function (req, res) {
  res.cookie("rec_id", globaluser.id);
  return res.render("company_homepage", { user: globaluser });
});
router.use("/create-job", require("./create-job"));
module.exports = router;
