// const express=require('express');
// const Contact=require('../models/search');
// const router = express.Router();
// const searchController=require('../controllers/search_controller');

// router.get('/',searchController.home);
// router.post('/filter',function(req,res){
//     res.redirect('back');
// });
//router.use('/users',require('./users'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
// module.exports=router;

const express = require("express");
const Contact = require("../models/search");
const router = express.Router();
const app = express();
const searchController = require("../controllers/search_controller");
router.post("/", function (req, res) {
  console.log(req.body);
  console.log(req.query);
  Contact.create(
    {
      search: req.body.search,
      user_id:req.query.user_id
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact!");
        return;
      }
      console.log("**********", newContact);
    }
  );
  return res.redirect('back');
});
module.exports = router;
