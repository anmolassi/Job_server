// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }
const User = require("../models/signup");
// sign out
module.exports.signOut=function(req,res){
    let id=req.cookies.user_id;
    console.log(id);
    res.cookies("user_id",""); 
    return res.redirect("back");
}