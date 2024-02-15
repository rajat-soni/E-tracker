var express = require('express');
var multer = require('multer');
var router = express.Router();

var database = require('../database');
var path = require('path');
const { log } = require('console');
const e = require('connect-flash');


router.get("/", function (request, response, next) {

    var user_id = request.session.user_id;
 

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
    

    //Total number of records without filtering
    var user_id = request.session.user_id;
  
    database.query(`
    SELECT COUNT(*) As Total,now() as todaydt,MAX((DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour))) as eblast_datetime,MAX((DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour))) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query}
    `, function (error, data) {
        var qq = `SELECT COUNT(*) As Total,now() as todaydt,MAX((DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour))) as eblast_datetime,MAX((DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour))) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query}`;
      

        var total_records = data[0].Total;
       
        database.query(`
        
        SELECT COUNT(*) As Total,now() as todaydt,MAX((DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour))) as eblast_datetime,MAX((DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour))) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query}`, function (error, data) {
            var total_records_with_filter = data[0].Total;

           
            var query = `
            SELECT *,now() as todaydt,(DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour)) as eblast_datetime,(DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour)) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id left join comment_tbl on addtask.id=comment_tbl.camp_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
          `;
           
          

            var data_arr = [];
           
            database.query(query, function (error, data) {

           
                data.forEach(function (row) {
                    // console.log(row.role);
                    var user_id = request.session.user_id;
                    var role = request.session.role;
                    var image_link = row.mg_link;
                    console.log("linkUrl"+image_link)
                        
                    const getDate = () => {
                        const newDate = new Date();
                        const year = newDate.getFullYear();
                        const month = newDate.getMonth() + 1;
                        const d = newDate.getDate();

                        return `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                    }
                    
                    var curdate = getDate();
                   






                    var tact=row.tact;

                   
                    
                    if(tact==="e_blast")
                    {  
                        if(row.rb_assetname!="" && row.rb_assetlink!="")
                        {
                           var tact="Email Blast / Reminder Blast"; 
                      
                        }else if(row.mg_link!="" && row.mg_image!=""){
                            var tact = "Make-Good"
                            console.log("mk find"+tact)
                        }
                        else if((row.rb_mg_link!="" && row.rb_mg_image!="")){
                             var tact="RB-Make-Good";
                             console.log("mkRB find"+tact)
                        }else{
                            var tact="Email Blast";
                            console.log("Email Blast");
                        }
                    }
                    else if(tact==="webinar"){
                        var tact="Webinar";
                        
                    }
                    


                  
                    if (role == 'user' && user_id == row.user_id) {

                        var allocated_to = row.allocated_to;
                        var rballocated_to = row.rballocated_to;
                        var id = row.id;
                        var user_id = request.session.user_id;

                    

                        var blast_type;
                        if (row.allocated_to == row.rballocated_to) {
                           
                            blast_type = "E-Blast/Reminder Blast";
                        } else if (row.allocated_to == request.session.user_id && row.allocated_to != row.rballocated_to) {
                           

                            blast_type = "Email Blast";
                        } else if (row.allocated_to != row.rballocated_to && row.rballocated_to == request.session.user_id) {
                           
                            blast_type = "Reminder Blast";
                        } else {

                        }
                    }
                   
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
                        'user_rbfiles': row.user_rbfiles,
                        'user_ebfiles': row.user_ebfiles,
                        'webinar_files': row.webinar_files,
                        'id': row.id,
                        'tact': tact,
                        'eblast_datetime': row.eblast_datetime,
                        'reblast_datetime': row.reblast_datetime,
                        'mg_link': row.mg_link,
                        'mg_image': row.mg_image,
                        'mg_status' : row.mg_status,
                        'rb_mg_status' : row.rb_mg_status
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


    database.query(query, function(error, data){

        response.json(data[0]);

    });
}



    //

    if (action == "fetch_single") {
        // fetech single record query //
        var user_id = request.session.user_id;
       

        var id = request.body.id;
      

        var swlquery = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname 
         right join client_tbl c on s.client_id=c.client_id 
         right join user_tbl u on a.allocated_to=u.user_id join
          comment_tbl cm on cm.camp_id=a.id WHERE a.id = "${id}" `;
       
       
        database.query(swlquery, function (error, data) {
            response.json(data[0]);
        });
    }


    if (action == "fetch_single_Profile") { // for profile view //
       
        var id = request.body.user_id;
      
        console.log("user_id"+id)
        var swlquery = `SELECT * FROM  user_tbl where user_id  = "${id}" `;
       
       
        database.query(swlquery, function (error, data) {
            response.json(data[0]);
            console.log("myqueryCheck"+swlquery)
        });
    }



    if (action == "admin_fetch_files") {
        // fetech single record query //
        var user_id = request.session.user_id;
       

        var id = request.body.id;
        console.log("ID in fetch single" + id);

        var swlquery = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname 
         right join client_tbl c on s.client_id=c.client_id 
         right join user_tbl u on a.allocated_to=u.user_id join
          comment_tbl cm on cm.camp_id=a.id WHERE a.id = "${id}" `;
       

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
   
    res.send("this is custom rout to post");
})









var storage = multer.diskStorage({
    destination: (request, files, callBack) => {

       
      
     


var camp_id =  request.body.camp_id;
var tact = request.body.tact;



var fs = require('fs');
//var dir = './tmp';

var dir1=`./files/${request.body.camp_id}`;
if (!fs.existsSync(dir1)){
    fs.mkdirSync(dir1);
   

}

    var dir2=`./files/${request.body.camp_id}/user`;

    if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
      

    }

    var dir3=`./files/${request.body.camp_id}/user`;

    if (!fs.existsSync(dir3)){
        fs.mkdirSync(dir3);
      

    }

    if(tact==="Email-Blast")
    {
        var dir3=`./files/${request.body.camp_id}/user/Email-Blast`;

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
           
    
        }
    }

    else if(tact==="Email-Reminder-Blast")
    {

        
        var dir3=`./files/${request.body.camp_id}/user/Email-Reminder-Blast`;

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
           
    
        }
    }

    else if(tact==="Make_Good")
    {
       
        console.log("check tact  make good tactics:" +tact);
        var dir3=`./files/${request.body.camp_id}/user/Make_Good`;
 
        

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
           
    
        }
    }
    



    
    else if(tact==="Webinar")
    {
       
        var dir3=`./files/${request.body.camp_id}/user/Webinar`;
 
        

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
           
    
        }
    }
  

    
  







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
  

    var uploadFiles = request.files;



    var image = request.files.image;
    const imagePath = request.files.filename;

    var filenames = uploadFiles.map(item => item.filename);
    var combinedFilenames = filenames.join(',');
    

    
    


        var sendComment = request.body.sendComment;
      
        var camp_id = request.body.camp_id;
       var tact = request.body.tact;
        // var tact = request.body.tact;
    
        var status = request.body.status;
        var rb_status = request.body.rb_status;
        
      




        if (camp_id != "") {
           
            var selectQuery = `select * from comment_tbl where camp_id = '${camp_id}'`; // verifying code id either exist or not //
            
            database.query(selectQuery, function (err, data) {
                if (err) {
                    response.json({
                        success: false,
                        message: 'errro'
                    })
                   
                } else {
                   
                    if (data.length > 0) {
                        data.forEach(function (row) {
                      
                        // console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                      

                        if(tact=="Email-Reminder-Blast")
                        {


                            let arr=row.user_rbfiles.split(",")
                            if(row.user_rbfiles.trim().length>0 && arr.length==1 && filenames.length==1){
                                arr.push(filenames[0])
                                combinedFilenames=arr.join(",")
                            }

                           


                        let  comment_section=`user_rbcomment='${sendComment}',`
                         if(sendComment==undefined){
                            comment_section=""
                         }

                            var updateSql = `UPDATE comment_tbl SET  ${comment_section} user_rbfiles = '${combinedFilenames}' WHERE camp_id = '${camp_id}'`;
                           
                    

                            
      
                        }

                         // Make good code start  here//

                         if(tact=="Make_Good")
                         {
 
                           console.log("i am in eb_mg_files🤣😃😄😅"+ tact)
                             let arr=row.eb_mg_files.split(",")
                             if(row.eb_mg_files.trim().length>0 && arr.length==1 && filenames.length==1){
                                 arr.push(filenames[0])
                                 combinedFilenames=arr.join(",")
                             }
 
                            
 
 
                        //  let  comment_section=`user_rbcomment='${sendComment}',`
                        //   if(sendComment==undefined){
                        //      comment_section=""
                        //   }
 
                             var updateSql = `UPDATE comment_tbl SET   eb_mg_files = '${combinedFilenames}' WHERE camp_id = '${camp_id}'`;
                            
                     
       
                         //make good code end there //


                         } else if(tact == "Webinar")
                        {
                            
                            let arr=row.webinar_files.split(",")
                            if(row.webinar_files.trim().length>0 && arr.length==1 && filenames.length==1){
                                arr.push(filenames[0])
                                combinedFilenames=arr.join(",")

                                
                            }

                            let  comment_section=`webinar_comment='${sendComment}',`
                            if(sendComment==undefined){
                               comment_section=""
                            }


                          
                            var updateSql = `UPDATE comment_tbl SET ${comment_section} webinar_files = "${combinedFilenames}" WHERE camp_id = '${camp_id}'`;
    
                        }else{
                          
                          

                            let arr=row.user_ebfiles.split(",")

                            if(row.user_ebfiles.trim().length>0 && arr.length==1 && filenames.length==1){
                                arr.push(filenames[0])
                                combinedFilenames=arr.join(",")
                            }

                            let  comment_section=`user_ebcomment='${sendComment}',`
                            if(sendComment==undefined){
                               comment_section=""
                            }



                            var updateSql = `UPDATE comment_tbl SET ${comment_section} user_ebfiles = '${combinedFilenames}' WHERE camp_id = '${camp_id}'`;
                           
                        }   
                         
                            database.query(updateSql, function (err, data) {
    
                                response.json({
                                    success: true,
                                    message : 'File Uploaded Successfully...'
                                });
                          
                            })
                       
                        })
                    } else {
                       
          
                     if(tact === "Webinar"){
                        var sqlQry =  `INSERT INTO comment_tbl (camp_id,webinar_comment,webinar_files) VALUES (${camp_id}, '${sendComment}', '${combinedFilenames}')`;
                     }
    
                     else if(tact==="Email-Reminder-Blast")
                     {
                        var sqlQry = `INSERT INTO comment_tbl (camp_id, user_rbcomment, user_rbfiles) VALUES (${camp_id}, '${sendComment}','${combinedFilenames}')`; // insert query //
                     }
                     // make good  code start here //
                     else if(tact==="Make_Good")
                     {
                        var sqlQry = `INSERT INTO comment_tbl (camp_id,user) VALUES (${camp_id}, '${sendComment}','${combinedFilenames}')`; // insert query //
                     }
                     //make good code end here //
                     else{
                        var sqlQry = `INSERT INTO comment_tbl (camp_id,mg_eb_files) VALUES (${camp_id},'${combinedFilenames}')`; //
                        // insert query //
                        console.log("inser mg qeruy"+sqlQry)
                     }
                       
                        console.log("insert query "+sqlQry);
    
                        database.query(sqlQry, function (err, data) {
    
                            response.json({
                                success: true,
                                message: 'Files Uploaded Successfully...'
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


   


    router.post('/image_replace', upload.single('user_rbfiles'), (request, response) => {  // for delete images //
     

        var oldfname1 = request.body.oldfname;
        var camp_id = request.body.camp_id;
     

        // const newfile1 = request.file.filename;
        // console.log("new Rajat  file"+newfile1 );



   
      
       
        // const newfile = request.file.filename;
        // console.log("updatedfile:" +newfile);
    
    
     
      
        var tact = request.body.tact;
    
        var filenum = request.body.filenum;
        var oldfname = request.body.oldfname;
       


var url = "./files/" + camp_id + "/user/" + tact + "/"+oldfname ;
  
   // var url = window.URL || window.webkitURL;

    

      
  
  

  const fs = require("fs");
  const path = require("path");
  



  fs.unlink(url, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  
  });   
  
  

  



         var camp_id = request.body.camp_id;
      
    
    
    
        // if (comment == 'sendComment') {  
       
     
    
    
        if (camp_id != "") {
            console.log('inside 1');
            var selectQuery = `select * from comment_tbl where camp_id = '${camp_id}'`; // verifying code id either exist or not //
           
    
    
    
            database.query(selectQuery, function (err, data) {
    
                data.forEach(function(row){
    
                
    
                    var camp_id=row.camp_id;
                    if(tact === "Webinar"){
                   var  admin_files = row.webinar_files;

                  

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
                  
    
                  // Find the index of the item to replace
    let index = user_files11.indexOf(user_files11);
    
    
    
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
                        
    
                    
                        
                        var updateSql = `UPDATE comment_tbl SET user_ebfiles='${output}' WHERE camp_id = '${camp_id}'`;

                        if( tact === "Webinar"){

                         
                             //
                            // if(output.length==1){
                            //     output.push(output)
                            // }

                           
                            
                            
                            var updateSql = `UPDATE comment_tbl SET webinar_files='${output}' WHERE camp_id = '${camp_id}'`;

                           
                        }
                       else if(tact==="Email-Reminder-Blast")
                       {
                        // if(output.length==1){
                        //     output.push(output)
                        // }
                        
                        var updateSql = `UPDATE comment_tbl SET user_rbfiles='${output}' WHERE camp_id = '${camp_id}'`;
    
                       }
                       else{
                        // if(output.length==1){
                        //     output.push(output)
                        // }

                        var updateSql = `UPDATE comment_tbl SET user_ebfiles ='${output}' WHERE camp_id = '${camp_id}'`;
                       }
                       
                      
                        console.log("Update query" +updateSql);
                        database.query(updateSql, function (err, data) {
    
                            if (err) {
                                response.json({
                                    success: false,
                                    message: 'errro'
                                })
                              
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
                    //     console.log('inside 1 else');
                        

                    //     var sqlQry = `INSERT INTO comment_tbl (camp_id,webinar_files,eb_comment) VALUES (${camp_id}, '${output}')`; // insert query //
                    //  //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));

                     if(tact = "Webinar"){
                        var sqlQry =  `INSERT INTO comment_tbl (camp_id,webinar_files) VALUES (${camp_id}, '${output}')`;
                     }
    
                     else if(tact="Email-Reminder-Blast")
                     {
                        var sqlQry = `INSERT INTO comment_tbl (camp_id,user_rbfiles) VALUES (${camp_id}, '${output}')`; // insert query //
                     }
                     else{
                        var sqlQry = `INSERT INTO comment_tbl (camp_id,user_ebfiles) VALUES (${camp_id}, '${output}')`; // insert query //
                     }
                       
                 
    
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


   router.post("/singleComment",(request, response) => {



          
    
   
    var camp_id = request.body.id;
    var sendcmt = request.body.sendComment;
    var tact = request.body.tact;
     //var sendComment = request.body.sendComment;
   console.log("send_id"+camp_id)
   console.log("tact"+tact)
   console.log("cmt"+sendcmt)
  
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
                }else {
                    
                     if (data.length > 0) {
                       
                       
                       
                     
                         console.log( tact,'my console.log check 2');
 
                         if(tact=="Email-Reminder-Blast")
                         {
                             
 
                             var updateSql = `UPDATE comment_tbl SET   user_rbcomment = '${sendcmt}' WHERE camp_id = '${camp_id}'`;
  
                        }else if(tact == "Webinar")
                         {
                             
                           
                             var updateSql = `UPDATE comment_tbl SET webinar_comment ='${sendcmt}' WHERE camp_id = ${camp_id}`;
     
                        }else{
                       
                             var updateSql = `UPDATE comment_tbl SET  user_ebcomment = '${sendcmt}' WHERE camp_id = '${camp_id}'`;
                            
                         }    
                          
                             database.query(updateSql, function (err, data) {
                            // console.log("updateSql😍🤔☺😊😊😊😉",updateSql)
     
                                 response.json({
                                     success: true,
                                     message : 'Message Inserted  Successfully...'
                                 });
                           
                             })
                        
                        
                    } else {
                         console.log('in else part');
                     
                       
                         // var sqlQry = `INSERT INTO comment_tbl (camp_id,webinar_files,eb_comment) VALUES (${camp_id}, '${combinedFilenames}')`; // insert query //
                      //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                   
           
                      if(tact == "Webinar"){
                         var sqlQry =  `INSERT INTO comment_tbl (camp_id,webinar_comment) VALUES (${camp_id}, '${sendcmt}')`;
                      }
     
                      else if(tact=="Email-Reminder-Blast")
                      {
                         var sqlQry = `INSERT INTO comment_tbl (camp_id, user_rbcomment) VALUES (${camp_id},'${sendcmt}')`; // insert query //
                      }
                      else{
                         var sqlQry = `INSERT INTO comment_tbl (camp_id,user_ebcomment) VALUES (${camp_id},'${sendcmt}')`; //
                         // insert query //
                         console.log("inser qeruy"+sqlQry)
                      }
                        
                         console.log("insert query"+sqlQry);
     
                         database.query(sqlQry, function (err, data) {
     
                             response.json({
                                 success: true,
                                 message: 'Message Inserted  Successfully...'
                             })
                         })
                     }
     
                }
             })
     
         }
         // }else{
     })









module.exports = router;