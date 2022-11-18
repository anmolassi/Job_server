const express=require('express');
const Contact=require('../models/signup-recuiter');
const User=require('../models/signup-recuiter');
const router = express.Router();
const app = express();
var nodemailer = require('nodemailer');
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
            from: `jobportal@gmail.com`, 
            to: `${req.body.email}`, 
            subject: "Welcome to JOB PORTAL", 
            text: "Welcome to JOB PORTAL", 
            html: `<b>Hi ${req.body.business_owner}, Welcome to the JOB PORTAL </b>`,
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
        console.log('**********',newContact);
      });
      return res.redirect('back');
    }else{
      return res.render('duplicateCredentials');
    }});

    
  });
module.exports=router;