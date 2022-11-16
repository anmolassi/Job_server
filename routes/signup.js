const express=require('express');
const Contact=require('../models/signup');
const User=require('../models/signup');
const router = express.Router();
const app = express();
const homeController=require('../controllers/home_controller');
router.post('/',function(req,res){


  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      Contact.create({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password,
        type:'employee'
      }, function(err, newContact){
        if(err)
        {
          return res.render('duplicateCredentials');
        }
        console.log('**********',newContact);
      });
      return res.redirect('/');
    }else{
      return res.render('duplicateCredentials');
    }});

    
  });
module.exports=router;