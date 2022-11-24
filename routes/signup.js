const express=require('express');
const Contact=require('../models/signup');
const User=require('../models/signup');
const router = express.Router();
const app = express();
var nodemailer = require('nodemailer');
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
          let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
              user: 'anmolassi01@gmail.com',
               pass: '***********'
            },
          });
          let details={
            from: "anmolassi01@gmail.com",
            to:`${newContact.email}`,
            subject:"Welcome to our family",
            text:`Hi ${newContact.fname} ${newContact.lname}, welcome to the job portal.`
          }
          mailTransporter.sendMail(details,(err)=>{
            if(err){
              console.log(err);
              console.log("it has an Error");
            }else{
              console.log("email has sent !");
            }
          });
        console.log('**********',newContact);
      });
      return res.redirect('/');
    }else{
      return res.render('duplicateCredentials');
    }});

    
  });
module.exports=router;
