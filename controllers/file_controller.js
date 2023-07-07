const fs = require('fs');
const csvParser = require('csvParser');
const CSV = require('../models.csv');
const path = require('path');

module.exports.upload = async function(req, res){
    try{
        if(!req.file){
            return res.status(400).send('No files were uploaded!');
        }
        if(req.file.mimetype != "text/csv"){
        return res.status(400).send('Select CSV files only.');
        }
        let file= await CSV.create({
        filename: req.file.originalname,
        filepath: req.file.path,
        file: req.file.filename
        });
        return res.redirect('/');
    }
    catch(error){
        console('error in filecontroller/upload',error);
        res.status(500).send('Internal server error');
    }
  
}
module.exports.view = async function(req, res){
    try{
        let csvFile = await CSV.FindOne ({file: req.params.id}); 
        const results = [];
        const header = [];
        fs.createReadStream(csvFile.filepath)
        .pipe(csvParser())
        .on('headers', (headers) => {
            headers.map((head)=>{
                headers.push(head);
            });
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            // console.log(results.length);
            // console.log(results);
            res.render("file_viewer", {
                title: "File Viewer",
                fileName: csvFile.fileName,
                head: header,
                data: results,
                length: results.length
            });
        });


    } catch (error) {
        console.log('Error in fileController/view', error);
        res.status(500).send('Internal server error');
    }
}

/** ------------------ EXPORTING FUNCTION To delete the file ------------------ **/
module.exports.delete = async function(req, res) {
    try {
        // console.log(req.params);
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){
            await CSV.deleteOne({file: req.params.id});            
            return res.redirect("/");
        }else{
            console.log("File not found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}