const express=require('express');
const cookieParser=require('cookie-parser');
const app= express();
const port=8000;
const Contact=require('./models/signup');

//setup for mongoose
const db=require('./config/mongoose')
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
//set up for static files 
app.use(express.static('./assets'));//with respect to this we need to give the location of our static files
app.use(express.urlencoded());
app.use(cookieParser());
//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//use express server
app.use('/',require('./routes'));//it will move to routes/index.js for furthur 
app.use(session({
    name:'job_server',
    //change the secret before deployment in production mode
    secret:'blahsomething',
    saveUnintialized:false,//to prevent creation of uncessary cookies
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongoUrl :'mongodb://localhost/sign_up_db',
        autoRemve:'interval',
        autoRemoveInterval:'1'
    }),function(error){
        console.log(error || 'connect-mongo setup ok')
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.listen(port,function(err){
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});





























// app.post('/signup',function(req,res){
//     console.log(req.body);
//     Contact.create({
//       fname:req.body.fname,
//       lname:req.body.lname,
//       email:req.body.email,
//       password:req.body.password
//     }, function(err, newContact){
//       if(err)
//       {
//         console.log('error in creating a contact!');
//         return;
//       }
//       console.log('**********',newContact);
//     });
//     return res.redirect('/');
  
//   });