const express=require('express');
const Contact=require('../models/signup-recuiter');
const User=require('../models/signup-recuiter');
const router = express.Router();
const app = express();
router.post('/',function(req,res){


  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      Contact.create({
        business:req.body.business,
        business_owner:req.body.business_owner,
        email:req.body.email,
        password:req.body.password,
        type:'company'
      }, function(err, newContact){
        if(err)
        {
          return res.render('duplicateCredentials');
        }
        console.log('**********',newContact);
      });
      return res.redirect('back');
    }else{
      return res.render('duplicateCredentials');
    }});

    
  });
module.exports=router;