// module.exports.home=function(req,res){
//     return res.end('<h1>Express is up for Codeial</h1>');
// }
module.exports.home = function(req, res){
    
    return res.render('home', {
        
    });
}
module.exports.blogs = function(req, res){
    
    return res.render('blogs', {
        
    });
}