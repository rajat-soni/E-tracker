var express = require('express');

var multer = require('multer');

var router = express.Router();

router.get("/", function(request, response, next){

	response.render('fileupload', {title:'File Upload in Node JS Express using Multer', message : request.flash('success')});

});

router.post("/", function(request, response, next){


    const fs = require("fs")
fs.mkdir("./new-directory-name", function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("New directory successfully created.")
  }
})


	var storage = multer.diskStorage({

		destination:function(request, file, callback)
		{
			callback(null, './upload');
		},
		filename : function(request, file, callback)
		{
			var temp_file_arr = file.originalname.split(".");

			var temp_file_name = temp_file_arr[0];

			var temp_file_extension = temp_file_arr[1];

			callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
		}

	});

	console.log("Check Storage:" +storage);

	var upload = multer({storage:storage}).single('sample_image');
	console.log("Check upload:" +upload);

	upload(request, response, function(error){
		console.log("within upload:");

		if(error)
		{console.log("error");
			return response.end('Error Uploading File');
			
		}
		else
		{
			console.log("success");
			request.flash('success', request.file.filename);

			response.redirect("/fileupload");

			//return response.end('File is uploaded successfully');
		}

	});

});

module.exports = router;