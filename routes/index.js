const express=require('express');

const router = express.Router();
const homeController=require('../controllers/home_controller');
const userController=require('../controllers/user_controller');

router.get('/',homeController.home);
router.use('/signup',require('./signup'));
router.use('/signin',require('./signin'));
router.use('/signup-recruiter',require('./signup-recruiter'));
router.use('/signin-recruiter',require('./signin_recruiter'));
// router.use('/searchHome',require('./search'));
//router.use('/users',require('./users'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
module.exports=router;