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
        async function main() {
          let testAccount = await nodemailer.createTestAccount();
          console.log(testAccount.user);
          let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user,
              pass: testAccount.pass, 
            },
          });
          let info = await transporter.sendMail({
            from: `${testAccount.user}`, 
            to: `${req.body.email}`, 
            subject: "Welcome to JOB PORTAL", 
            text: "Welcome to JOB PORTAL", 
            html: `<b>Hi ${req.body.fname} ${req.body.lname} </b>`,
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
        console.log('**********',newContact);
      });
      return res.redirect('/');
    }else{
      return res.render('duplicateCredentials');
    }});

    
  });
module.exports=router;