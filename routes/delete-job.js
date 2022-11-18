const express = require("express");
const job = require("../models/jobs_post");
const router = express.Router();
const app = express();
router.get("/", function (req, res) {
    console.log(req.query);
    job.findByIdAndRemove(req.query.id, function (err) {
      if (err) {
        console.log("ERORRR", err);
      }
      return res.redirect("back");
    });
  });
module.exports = router;
