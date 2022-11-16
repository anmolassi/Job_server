// module.exports.home=function(req,res){
//     return res.end('<h1>Express is up for Codeial</h1>');
// }
// console.log('ejs file');

// module.exports.home = function(req, res){
    
//     return res.render('search', {
        
//     });
// }
const search=require('../models/search');
module.exports.home = function (req, res) {
   
  
    search.find({/*condition     name:"New"*/},function(err,searches){
      if(err)
      {
        console.log('Error in fetching contacts from db');
        return;
      }
      return res.render("search", { search_list: searches});
    })
    
  };