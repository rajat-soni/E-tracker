var express = require('express');
var multer = require('multer');
var router = express.Router();

var database = require('../database');
var path = require('path');
const { log } = require('console');


router.get("/", function (request, response, next) {

    var user_id = request.session.user_id;
    console.log("me", user_id);

    var queryuser = `SELECT * FROM user_tbl where user_id = ${user_id}`;

    var query = "SELECT * FROM addtask a right join sender_tbl s on a.cname=s.client_id order by date(a.blast_date)desc,a.blast_time desc;";

    var query1 = "SELECT * FROM addtask where priority='rush' order by date(blast_date)asc,blast_time asc";
    var query2 = "SELECT * FROM campaign ORDER BY id DESC";
    var query3 = `select (SELECT count(*) FROM addtask where (blast_date = current_date && (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) > now() AND allocated_to =${user_id} AND status=0)) + (rb_date = current_date &&(DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) > now() AND rballocated_to =${user_id}  && rbstatus=0)) ) as current`;

    var weektask = "select * from addtask where blast_date <= (current_date + interval 7 day);";
    var clientlist = "SELECT * FROM client_tbl c right join sender_tbl s on c.client_id=s.client_id ";
    var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
    var completed = `select * from addtask where(status=1 AND allocated_to =${user_id}) || (rbstatus=1 and rballocated_to =${user_id})   `;
    var missed = `select (select count(*) from addtask where (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0 and allocated_to =${user_id})) + (select count(*) from addtask where (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) < now() && rbstatus=0 and rballocated_to =${user_id}) ) as missed`;

    // var missed = "select (select count(*) from addtask where blast_date > current_date ) + (select count(*) from addtask where rb_date > current_date ) as missed";


    console.log("Missed:" + missed);
    var pending = `select (select count(*) from addtask where (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) > now() ) and status=0 and allocated_to=${user_id}) + (select count(*) from addtask where (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) > now()) and rbstatus=0 and rballocated_to=${user_id}) as pending`;

    console.log("Pending blast" + pending);
    // var client_id = request.query.client_id;
    // var mysql = require('mysql');
    // var draw = request.query.draw;
    //    console.log("client_id:");

    //     console.log(client_id);
    //  var senderlist = 'SELECT * FROM  sender_tbl WHERE client_id ='+ mysql.escape(client_id);

    //   console.log(request.body.client_name);
    database.query(queryuser, function (error, queryuser) {
        database.query(query, function (error, data) {
            database.query(query1, function (error, data1) {
                database.query(query2, function (error, data2) {
                    database.query(query3, function (error, data3) {
                        database.query(weektask, function (error, data4) {
                            database.query(clientlist, function (error, clientlist) {
                                database.query(userlist, function (error, userlist) {
                                    database.query(completed, function (error, completed) {
                                        database.query(pending, function (error, pending) {
                                            database.query(missed, function (error, missed) {

                                                //  database.query(senderlist, function(error, senderlist){
                                                //console.log(senderlist);

                                                response.render('customEmp', {
                                                    title: 'Custom Details',
                                                    queryuser: queryuser,
                                                    data: data,
                                                    data1: data1,
                                                    data2: data2,
                                                    data3: data3,
                                                    data4: data4,
                                                    clientlist: clientlist,
                                                    completed: completed,
                                                    pending: pending,
                                                    userlist: userlist,
                                                    session: request.session,
                                                    missed: missed
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});


router.get('/get_data', function (request, response, next) {
    console.log("get data query");
    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if (typeof order_data == 'undefined') {
        var column_name = 'addtask.id';

        var column_sort_order = 'desc';
    } else {
        var column_index = request.query.order[0]['column'];

        var column_name = request.query.columns[column_index]['data'];

        var column_sort_order = request.query.order[0]['dir'];
    }

    //search data

    var search_value = request.query.search['value'];

    var search_query = `
   (camp_name LIKE '%${search_value}%' 
   OR asset_name LIKE '%${search_value}%'
   OR blast_type LIKE '%${search_value}%'  
   
 )
  `;
    console.log(search_value);
    console.log(search_query);

    //Total number of records without filtering
    var user_id = request.session.user_id;
    console.log("User ID:" + user_id);
    database.query(`
    SELECT COUNT(*) As Total,now() as todaydt,(DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour)) as eblast_datetime,(DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour)) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query}
    `, function (error, data) {
        var qq = `SELECT COUNT(*) As Total,now() as todaydt,(DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour)) as eblast_datetime,(DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour)) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query}`;
        console.log("QQ:" + qq);

        var total_records = data[0].Total;
        console.log(total_records);
        database.query(`
        
        SELECT COUNT(*) As Total,now() as todaydt,(DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour)) as eblast_datetime,(DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour)) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query}`, function (error, data) {
            var total_records_with_filter = data[0].Total;

            console.log("Rajashri");
            var query = `
            SELECT *,now() as todaydt,(DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour)) as eblast_datetime,(DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour)) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
          `;
            console.log("Query:" + query);

            var data_arr = [];
           
            database.query(query, function (error, data) {

              console.log("mydata"+data)
                data.forEach(function (row) {
                    // console.log(row.role);
                    var user_id = request.session.user_id;
                    var role = request.session.role;
                        console.log("session"+user_id);
                    const getDate = () => {
                        const newDate = new Date();
                        const year = newDate.getFullYear();
                        const month = newDate.getMonth() + 1;
                        const d = newDate.getDate();

                        return `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                    }
                    console.log("Current date11");
                    var curdate = getDate();
                    console.log(curdate);






                    var tact=row.tact;

                    console.log("tact in routes:" +tact);
                    
                    if(tact==="e_blast"){
                       
                        if(row.rb_assetname!="" && row.rb_assetlink!="")
                    {
                        var tact="Email Blast / Reminder Blast"; 
                        console.log("Email Blast / Reminder Blast");
                    }
                    else{
                        var tact="Email Blast";
                        console.log("Email Blast");
                    
                    }
                    
                    }
                    else if(tact==="webinar")
                    {
                        var tact="Webinar";
                        console.log("Webinar");
                    }
                    



console.log("ebBlastDateCjeck"+row.balst_dt);
                     console.log("user_id"+user_id);
                      console.log("pdid"+row['id']);
                    if (role == 'user' && user_id == row.user_id) {

                        var allocated_to = row.allocated_to;
                        var rballocated_to = row.rballocated_to;
                        var id = row.id;
                        var user_id = request.session.user_id;

                        console.log("EB Allocated To: " + allocated_to);
                        console.log("RB Allocated To: " + rballocated_to);
                        console.log("User ID: " + user_id);
                        console.log("ID: " + id);

                        var blast_type;
                        if (row.allocated_to == row.rballocated_to) {
                            console.log("Email and Re Blast");
                            blast_type = "E-Blast/Reminder Blast";
                        } else if (row.allocated_to == request.session.user_id && row.allocated_to != row.rballocated_to) {
                            console.log("Email Blast");

                            blast_type = "Email Blast";
                        } else if (row.allocated_to != row.rballocated_to && row.rballocated_to == request.session.user_id) {
                            console.log("Reminder Blast");
                            blast_type = "Reminder Blast";
                        } else {

                        }
                    }
                    console.log("user_id1"+row.user_id);
                    data_arr.push({
                        'user_id': user_id,
                        'camp_name': row.camp_name,
                        'asset_name': row.asset_name,
                        'blast_type': blast_type || row.blast_type,
                        'status': row.status,
                        'allocated_to': row.allocated_to,
                        'rballocated_to': row.rballocated_to,
                        'rbstatus': row.rbstatus,
                        'todaydt': row.todaydt,
                        'blast_date': row.blast_date,
                        'camp_id': row.camp_id,
                        'id': row.id,
                        'tact': tact,
                        'eblast_datetime': row.eblast_datetime,
                        'reblast_datetime': row.reblast_datetime
                    });



                });

                var output = {
                    'draw': draw,
                    'iTotalRecords': total_records,
                    'iTotalDisplayRecords': total_records_with_filter,
                    'aaData': data_arr
                };


                response.json(output);

            });

        });

    });

});


router.post("/action", function (request, response, next) {
    // fetch all query //
    var action = request.body.action;

    if (action == "fetch") {
        var sqlu = `SELECT * FROM taskassign `;

        database.query(sqlu, function (err, data) {
            response.json({
                data: data,
            });
        });
    }





    if(action == 'fetch_files')
{
    //alert("Fetch Single Record");
    var id = request.body.camp_id;
    console.log("id" +id);

    var query = `SELECT * FROM comment_tbl WHERE camp_id = "${id}"`;
console.log("Fetch Single Query For View");
    console.log(query);
    database.query(query, function(error, data){

        response.json(data[0]);

    });
}
    //

    if (action == "fetch_single") {
        // fetech single record query //
        var user_id = request.session.user_id;
        console.log("User ID on fetch single:" + user_id);

        var id = request.body.id;
        console.log("ID in fetch single" + id);

        var swlquery = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname 
         right join client_tbl c on s.client_id=c.client_id 
         right join user_tbl u on a.allocated_to=u.user_id join
          comment_tbl cm on cm.camp_id=a.id WHERE a.id = "${id}" `;
       
         console.log("my nrw query"+swlquery)
        database.query(swlquery, function (error, data) {
            response.json(data[0]);
        });
    }


    if (action == "admin_fetch_files") {
        // fetech single record query //
        var user_id = request.session.user_id;
        console.log("User ID on fetch single:" + user_id);

        var id = request.body.id;
        console.log("ID in fetch single" + id);

        var swlquery = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname 
         right join client_tbl c on s.client_id=c.client_id 
         right join user_tbl u on a.allocated_to=u.user_id join
          comment_tbl cm on cm.camp_id=a.id WHERE a.id = "${id}" `;
        console.log(swlquery);

        database.query(swlquery, function (error, data) {
            response.json(data[0]);
        });
    }




    
    if (action == "check") {
        // edit query //

        var p_id = request.body.p_id;
        // console.log("p_id" + p_id);
        var user_id = request.session.user_id; // session variable //
        // console.log('session user '+user_id);

        var updateCamp = `INSERT INTO camp_info_tbl (camp_id,user_id) VALUES (${p_id},${user_id})`;
          console.log('the query '+updateCamp);

        database.query(updateCamp, function (error, data) {
            if (!error) {
                var updateTask = `UPDATE addtask SET status = 1   WHERE id = ${p_id}`;
                database.query(updateTask, function (error, data) {
                    if (!error) {
                        response.json({
                            success: true,
                            message: "Email Blast Done.. ",
                        });
                    } else {
                        response.json({
                            success: false,
                            message: "Error in Email Blast",
                        });
                    }
                });
            } else {
                response.json({
                    success: false,
                    message: "1st Updatee failed " + error,
                });
            }
        });
    }

    if (action == "remider_blstcheckbox") {
        // edit query //

        var id = request.body.id;

        console.log("routes ID:" + id);

        var user_id = request.session.user_id; // session variable //
        // console.log('session user '+user_id);

        //    console.log('the query '+updateCamp);

        // var updateREmTask = `UPDATE addtask SET status = 2  , blast_type = 'ReminderBlast'  WHERE id = ${p_id}`;
        var updateREmTask = `UPDATE addtask SET rbstatus = 1 WHERE id = ${id}`;
        console.log("Update Query:" + updateREmTask);

        database.query(updateREmTask, function (error, data) {
            if (!error) {
                response.json({
                    success: true,
                    message: "Reminder Blast Done successfully..",
                });
            } else {
                response.json({
                    success: false,
                    message: "Error in Reminder Blast updation",
                });
            }
        });
    }

    // if(comment == 'send_comment'){
    //    // console.log("Comment box rouytes");

    // var sendCommet = request.body.sendCommet;
    // var sqlQry = `INSERT INTO addtask (emailBlastComment) VALUES ('${sendCommet}')`;
    // console.log(sqlQry);
    // database.query(sqlQry, function(err, data) {
    //     response.json({
    //         message: "Comment Request Added Successfully.."
    //     })
    // });
    // }
});



// router.post('/image_remove', (request, response) => { //  delete code //
// 	{
// 		var camp_id = request.body.camp_id;
//         var file = request.body.file;
//         var tact = request.body.tact;
//         console.log("mynewData"+camp_id,file,tact)

// 		// var query = `DELETE FROM comment_tbl WHERE  client_id = '${client_id}' `;

// 		// database.query(query, function(error, data){

// 		// 	response.json({

// 		// 		message : 'Client Request Deleted Successfully..'
// 		// 	});

// 		// });
// 	}

//})



router.post("/test", (request, res) => {   // =>  image upload code start
    console.log('test port');
    res.send("this is custom rout to post");
})


var storage = multer.diskStorage({
    destination: (request, files, callBack) => {

        console.log( request.body,"😀😀😀");

var camp_id =  request.body.camp_id;

var tact = request.body.tact;
console.log(` tactics value: ==> ${request.body.tact}`);
console.log(` camp_id2: ==> ${request.body.camp_id}`);
// console.log("check tact  tactics:" +tact);
var fs = require('fs');
//var dir = './tmp';

var dir1=`./files/${request.body.camp_id}`;
if (!fs.existsSync(dir1)){
    fs.mkdirSync(dir1);
    console.log("First Camp ID directory created successfully......");

}

    var dir2=`./files/${request.body.camp_id}/user`;

    if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
        console.log("Admin folder created");

    }

    if(tact==="Email-Blast")
    {
        var dir3=`./files/${request.body.camp_id}/user/Email-Blast`;

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
            console.log("Email Blast folder created....");
    
        }
    }

    else if(tact==="Email-Reminder-Blast")
    {

        
        var dir3=`./files/${request.body.camp_id}/user/Email-Reminder-Blast`;

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
            console.log("Reminder Blast folder created....");
    
        }
    }



    
    else if(tact==="Webinar")
    {
        var dir3=`./files/${request.body.camp_id}/user/Webinar`;

        

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
            console.log("Webinar Blast folder created....");
    
        }
    }
  
console.log("Dir3 is:" +dir3);
    






console.log("Dir 3 is out of if else:" +dir3);

        callBack(null, `./${dir3}`) // './public/images/' directory name where save the file
    },


//         callBack(null, './public/images/') // './public/images/' directory name where save the file
//    },
    filename: (request, file, callBack) => {
        // callBack(null, 'image' + '-' + Date.now() + path.extname(file.originalname))
        callBack(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
});

router.post("/comment",  upload.any('image'),(request, response) => {


  

   var camp_id = request.body.camp_id;
   var tact = request.body.tact;
   var sendComment = request.body.sendComment;
   console.log("myckeck comment"+sendComment)

    console.log("hello"+tact)

    var uploadFiles = request.files;



    var image = request.files.image;
    const imagePath = request.files.filename;

    var filenames = uploadFiles.map(item => item.filename);
    var combinedFilenames = filenames.join(',');
    

    
    


        var sendComment = request.body.sendComment;
        console.log("comment"+sendComment)
        var camp_id = request.body.camp_id;
       var tact = request.body.tact;
        // var tact = request.body.tact;
    console.log("tactice value new"+tact);
        var status = request.body.status;
        var rb_status = request.body.rb_status;
        console.log("status" + "" + status)
        console.log("rb_status" + "" + rb_status)
        
        console.log("filenames" ,filenames,request.files)
        console.log("image image " + combinedFilenames)
        console.log("mytact"+ tact);
        console.log("mycamp_id",camp_id);
        console.log("sendComment"+sendComment);
      
console.log("Rajashri comments");
console.log("hhhhh");



        if (camp_id != "") {
            console.log('inside 1');
            var selectQuery = `select * from comment_tbl where camp_id = '${camp_id}'`; // verifying code id either exist or not //
             console.log(selectQuery);
            database.query(selectQuery, function (err, data) {
                if (err) {
                    response.json({
                        success: false,
                        message: 'errro'
                    })
                    console.log(err)
                } else {
                    console.log('inside 2');
                    if (data.length > 0) {
                        console.log('inside 2 update');
                        // console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                        console.log("type of " +typeof uploadFiles);

                        if(tact=="Email-Reminder-Blast")
                        {
                            console.log("in if condition reminder Balst condition");
                            var updateSql = `UPDATE comment_tbl SET  user_rbcomment='${sendComment}', user_rbfiles = '${combinedFilenames}' WHERE camp_id = '${camp_id}'`;
                            console.log("tact is eb/rb:" +updateSql);
      
                        }
                        else if(tact == "Webinar")
                        {
                            console.log("in else  webinar condition");
                            var updateSql = `UPDATE comment_tbl SET webinar_comment = "${sendComment}", webinar_files = "${combinedFilenames}" WHERE camp_id = '${camp_id}'`;
    
                        }else
                            var updateSql = `UPDATE comment_tbl SET user_ebcomment = '${sendComment}', user_ebfiles = '${combinedFilenames}' WHERE camp_id = '${camp_id}'`;
                            console.log(" Email Blast Contion Update query" +updateSql);
                         
                            database.query(updateSql, function (err, data) {
    
                                response.json({
                                    success: true,
                                    message : 'id already exits...'
                                });
                          
                        })
                       
            
                    } else {
                        console.log('inside 1 else');
                        
                     //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                        var sqlQry = `INSERT INTO comment_tbl (camp_id, user_ebcomment , user_ebfiles) VALUES (${request.body.camp_id}, '${sendComment}' , '${combinedFilenames}')`; // insert query //
                        console.log("insert query"+sqlQry);
    
                        database.query(sqlQry, function (err, data) {
    
                            response.json({
                                success: true,
                                message: 'Image  Inseted.. '
                            })
                        })
                    }
    
                }
            })
    
        }
        // }else{
    })
           // }

       // });
    // } // end upload images code //


// }elseif(rb_status == '0' || rb_status == '0'  ){

//     var sqlQry = `INSERT INTO comment_tbl (camp_id,eb_comment) VALUES (${camp_id},'${sendComment}')`;
//     console.log(sqlQry);
//     database.query(sqlQry, function(err, data) {

//       if(!data){
//         response.json({
//           success: true,
//           message: 'Email Blast  file uploaded.. '})
//       }else{
//           response.json({
//             success: false,
//                 message: 'Email Blast not file uploaded.. '}) 

//       }
//     });



    // }else{


    router.post('/image_replace', upload.single('user_rbfiles'), (request, response) => {
     

        var oldfname1 = request.body.oldfname;
        var camp_id = request.body.camp_id;
        console.log("myfiles"+ oldfname1)

    
        console.log("oldRajat file"+oldfname1 )

        // const newfile1 = request.file.filename;
        // console.log("new Rajat  file"+newfile1 );



   
      
       
        // const newfile = request.file.filename;
        // console.log("updatedfile:" +newfile);
    
    
     
        console.log("within admn comment js");
        var tact = request.body.tact;
    
        console.log("tact in route file:" +tact);
        var filenum = request.body.filenum;
        var oldfname = request.body.oldfname;
        console.log("oldfname" + oldfname);
        console.log("filenum mean index of file" + filenum);


var url = "./files/" + camp_id + "/user/" + tact + "/"+oldfname ;
    console.log("URL:😍😎😋" + url);
   // var url = window.URL || window.webkitURL;

      console.log("url" + url);

      
  
  console.log("oldfname:" +oldfname);

  const fs = require("fs");
  const path = require("path");
  



  fs.unlink(url, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File deleted successfully');
  });   
  
  

  



         var camp_id = request.body.camp_id;
        console.log("camp_id" + camp_id);
    
    
    
        // if (comment == 'sendComment') {  
       
     
    
    
        if (camp_id != "") {
            console.log('inside 1');
            var selectQuery = `select * from comment_tbl where camp_id = '${camp_id}'`; // verifying code id either exist or not //
            console.log(selectQuery);
    
    
    
            database.query(selectQuery, function (err, data) {
    console.log("within first condition");
                data.forEach(function(row){
    
                    console.log("within second condition");
    
                    var camp_id=row.camp_id;
                    if(tact === "Webinar"){
                   var  admin_files = row.webinar_files;

                   console.trace();
                   console.log("trace project"+row.user_ebfiles)

                    }
    
                    else if(tact==="Email-Reminder-Blast")
    
                    {
                        var admin_files=row.user_rbfiles;
    
                    }
    
                    else{
                        var admin_files = row.user_ebfiles;
                    }
                   
                    const myArray =  new Array(admin_files);

                    var output = admin_files.split(',');
                    console.log("Array:" + output[filenum]);
                    var deletefile=output[filenum]
    
                    console.log("deletefile Array:" + filenum);
    
                    const x = output.splice(filenum,1);
                    
                    console.log(`output values: ${output}`);
                    console.log(`variable x value: ${x}`);
    
    
    
                    console.log("camp_id" +camp_id);
                    // console.log("user_files",newfile);
    
                   
                   

                    // array = array.filter(v => v !== 'B');

                //    const indexOfOldFile= output.indexOf(oldfname1);
                //    output[indexOfOldFile]=newfile1

                    // console.log("Array:" +output[filenum]);
                    // var updatedfile=output[filenum];
    
                    // console.log("updatedfile:" +newfile);
    
    
                    var user_files11=row.user_rbfiles;
                    console.log("user_files11:" +user_files11);
    
                  // Find the index of the item to replace
    let index = user_files11.indexOf(user_files11);
    console.log("Index:" +index);
    // Replace the item at the found index
   // output[filenum] = newfile;
    console.log("Updated Files:" +user_files11);
    
    console.log("BEFORE🙀🙀🙀😽😼😻😻🐱‍💻🐱‍💻",updateSql);
    //console.log("admin_files11:" +admin_files11);
    
               
                if (err) {
                    response.json({
                        success: false,
                        message: 'errro'
                    })
                    console.log(err)
                } else {
                    console.log('inside 2');
                    if (data.length > 0) {
                        console.log('inside 2 update');
    
                        console.log("check image taactics:" +tact);
    
                    
                        
                        var updateSql = `UPDATE comment_tbl SET user_ebfiles='${output}' WHERE camp_id = '${camp_id}'`;

                        if( tact === "Webinar"){

                         
                             //
                            if(output.length==1){
                                output.push(output)
                            }

                           
                            
                            
                            var updateSql = `UPDATE comment_tbl SET webinar_files='${output}' WHERE camp_id = '${camp_id}'`;

                            console.log("🙀🙀🙀😽😼😻😻🐱‍💻🐱‍💻",updateSql);
                        }
                       else if(tact==="Email-Reminder-Blast")
                       {
                        if(output.length==1){
                            output.push(output)
                        }
                        
                        var updateSql = `UPDATE comment_tbl SET user_rbfiles='${output}' WHERE camp_id = '${camp_id}'`;
    
                       }
                       else{
                        if(output.length==1){
                            output.push(output)
                        }

                        var updateSql = `UPDATE comment_tbl SET user_ebfiles ='${output}' WHERE camp_id = '${camp_id}'`;
                       }
                       
                      
                        console.log("Update query" +updateSql);
                        database.query(updateSql, function (err, data) {
    
                            if (err) {
                                response.json({
                                    success: false,
                                    message: 'errro'
                                })
                                console.log(err)
                            } else {
                                // let inserted_id = data.insertId;
                                //    if(inserted_id == data_id){
                                    response.json({
                                        success: true,
                                        message: 'Files Updated Successfully.. '
                                    })
                            }
    
    
                        })
                    } else {
                        console.log('inside 1 else');
                        

                        var sqlQry = `INSERT INTO comment_tbl (camp_id,webinar_files,eb_comment) VALUES (${camp_id}, '${output}')`; // insert query //
                     //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));

                     if(tact = "Webinar"){
                        var sqlQry =  `INSERT INTO comment_tbl (camp_id,user_ebfiles) VALUES (${camp_id}, '${output}')`;
                     }
    
                     else if(tact="Email-Reminder-Blast")
                     {
                        var sqlQry = `INSERT INTO comment_tbl (camp_id,user_rbfiles) VALUES (${camp_id}, '${output}')`; // insert query //
                     }
                     else{
                        var sqlQry = `INSERT INTO comment_tbl (camp_id,user_ebfiles) VALUES (${camp_id}, '${output}')`; // insert query //
                     }
                       
                        console.log("insert query"+sqlQry);
    
                        database.query(sqlQry, function (err, data) {
    
                            response.json({
                                success: true,
                                message: 'Files Uploaded Successfully...'
                            })
                        })
                    }
    
                }
    
            })
            })
    
        }
     
                
   })



module.exports = router;