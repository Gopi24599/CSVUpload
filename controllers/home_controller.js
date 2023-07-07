const File = require("../models/csv");

module.exports.home = async function(req, res){
    try{
        let file = await File.find({});
        return res.render('home',{
            files: file,
            title: "Home"
        });
    }catch{
        console.log('Error in homecontroller/home',error);
        return;
    }
}