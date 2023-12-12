var express = require('express');
var router = express.Router();
var database = require('../database');
var path = require('path');

var multer = require('multer');


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
        var qq = ` SELECT COUNT(*) As Total,now() as todaydt,(DATE_ADD(concat(addtask.blast_date, ' ', addtask.blast_time),interval 2 hour)) as eblast_datetime,(DATE_ADD(concat(addtask.rb_date, ' ', addtask.rb_time),interval 2 hour)) as reblast_datetime FROM user_tbl JOIN addtask ON  user_tbl.user_id =addtask.allocated_to left join user_tbl t3 on addtask.rballocated_to=t3.user_id WHERE (rballocated_to = ${user_id} || allocated_to = ${user_id}) AND ${search_query}`;
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


                data.forEach(function (row) {
                    // console.log(row.role);
                    var user_id = request.session.user_id;
                    var role = request.session.role;

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


                    //  console.log("user_id"+user_id);
                    //   console.log("pdid"+data.row['id']);
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
                            blast_type = "E-Blast/Reminder-Blast";
                        } else if (row.allocated_to == request.session.user_id && row.allocated_to != row.rballocated_to) {
                            console.log("Email Blast");

                            blast_type = "Email Blast";
                        } else if (row.allocated_to != row.rballocated_to && row.rballocated_to == request.session.user_id) {
                            console.log("Reminder Blast");
                            blast_type = "Reminder Blast";
                        } else {

                        }
                    }


var tact=row.tact;
                    
if(tact=="e_blast"){
   
    if(row.rb_assetname!="" && row.rb_assetlink!="")
{
   
    var tact="Email Blast / Reminder Blast"; 
    console.log("check tact in routes:" +tact);

}
else{
   
    var tact="Email Blast";
    console.log("check tact in routes:" +tact);


}

}
else if(tact="webinar")
{
    var tact="Webinar";
    console.log("check tact in routes:" +tact);

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
                        'rb_type': row.rb_type,
                        'rb_date': row.rb_date,
                        'blast_time': row.blast_time,
                        'tact': tact,
                        'id': row.id,
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

    //

    if (action == "fetch_single") {
        // fetech single record query //
        var user_id = request.session.user_id;
        console.log("User ID on fetch single:" + user_id);

        var id = request.body.id;
        console.log("ID in fetch single" + id);

        var swlquery = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname right join client_tbl c on s.client_id=c.client_id right join user_tbl u on a.allocated_to=u.user_id where a.id = "${id}" `;
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
        //    console.log('the query '+updateCamp);

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


router.post("/test", (req, res) => {   // =>  image upload code start
    console.log('test port');
    res.send("this is custom rout to post");
})




var storage = multer.diskStorage({
    destination: (req, files, callBack) => {
      
        var campid=req.body.camp_id;
        var tact=req.body.tact;

       console.log("check tact:" +tact);
        var tact = tact.toString().split(",");
       var tact=tact[0];
        console.log("check:" +tact);

console.log("within storage:"+campid);

//start code for create new directory


var fs = require('fs');
//var dir = './tmp';

var dir1=`./files/${campid}`;
if (!fs.existsSync(dir1)){
    fs.mkdirSync(dir1);
    console.log("First Camp ID directory created successfully......");
}


var dir2=`./files/${campid}/User`;



    if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
        console.log("User folder created");

    }

   
    if(tact ==="Email-Blast")
    {

        console.log("First if condition");
        var dir3=`./files/${campid}/User/Email-Blast`;

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
            console.log("Email Blast folder created....");
    
        }
    }

    else if(tact=="Email-Reminder-Blast")
    {

        var dir3=`./files/${campid}/User/Email-Reminder-Blast`;
        console.log("check Email-Reminder-Blast tact");

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
            console.log("Reminder Blast folder created....");
    
        }
    }



    
    else if(tact == "Webinar")
    {

        console.log("tact is webinar" +tact);
        var dir3=`./files/${campid}/User/Webinar`;

        if (!fs.existsSync(dir3)){
            fs.mkdirSync(dir3);
            console.log("Webinar Blast folder created....");
    
        }
    }

    else{
console.log("within last else tact not found");
    }
  
console.log("Dir3 is:" +dir3);
    

var dir3=`./files/${campid}/User/${tact}`;



//     var dir3=`./files/${campid}/Admin/${tact}`;
// console.log("Directory is:" +dir3);
//     console.log("Directory already existed......");



console.log("Dir 3 is out of if else:" +dir3);

        callBack(null, `./${dir3}`) // './public/images/' directory name where save the file
    },
    filename: (req, files, callBack) => {
        // callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        callBack(null, files.originalname)
    // }
    }
})


var upload = multer({
    storage: storage
});

router.post("/comment", upload.single('image'),(request, response) => {
    
    

    var comment = request.body.comment;
    var image = request.body.image;

    
    const imagePath = request.file.filename;
    console.log(imagePath);
    
    // if (comment == 'sendComment') {


        var sendComment = request.body.emailBlastComment;
        var camp_id = request.body.camp_id;
        var tact = request.body.tact;
        var tact = tact.toString().split(",");
        var tact=tact[0];

        var status = request.body.status;
        var rb_status = request.body.rb_status;
        console.log("sendComment" + "" + sendComment)
        console.log("tact" + "" + tact)
  
        console.log("camp_id"+camp_id);
        var selectQuery = `select * from comment_tbl where camp_id =  ${camp_id}`; // verifying code id either exist or not //
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
                   
                    console.log("type of " +typeof uploadFiles);
                   console.log("check tact in route js:" +tact);
                    if(tact=="Email-Reminder-Blast")
                    {
                        console.log("in if condition");
                        var updateSql = `UPDATE comment_tbl SET  user_rbcomment='${sendComment}', user_rbfiles = '${imagePath}' WHERE camp_id = '${camp_id.trim()}'`;
                        console.log("tact is eb/rb:" +updateSql);
  
                    }
                    else
                    {
                        console.log("in else condition");
                    var updateSql = `UPDATE comment_tbl SET  user_ebcomment='${sendComment}', user_ebfiles = '${imagePath}' WHERE camp_id = '${camp_id.trim()}'`;

                    }

                    console.log("Update query" +updateSql);
                    database.query(updateSql, function (err, data) {

                        // if (err) {
                        //     response.json({
                        //         success: false,
                        //         message: 'errro'
                        //     })
                        //     console.log(err)
                        // } else {
                        //      response.json({
                        //         success: true,
                        //         message: 'Eamil Balst updated  id exist'
                        //     })
                        // }



                       
                            response.json({
                                success: true,
                                message : 'File Updated Successfully...'
                            });
                      




                    })
                } 
                
                else {
                    console.log('inside 1 else');
                    
                 //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                   


                    if(tact=="Email-Reminder-Blast")
                    {
                        console.log("in if condition");
                        var sqlQry = `INSERT INTO comment_tbl (camp_id,user_rbcomment,user_rbfiles) VALUES (${camp_id}, '${sendComment}', '${imagePath}')`; // insert query //
                        console.log("insert query"+sqlQry);
  
                    }
                    else
                    {
                        console.log("in else condition");
                      


                        var sqlQry = `INSERT INTO comment_tbl (camp_id,user_ebcomment,user_ebfiles) VALUES (${camp_id}, '${sendComment}', '${imagePath}')`; // insert query //
                        console.log("insert query"+sqlQry);

                    }





                    database.query(sqlQry, function (err, data) {

                        response.json({
                            success: true,
                            message: 'Files Uploaded Successfully.. '
                        })
                    })
                }

            }
       })
}
    // }
) // end upload images code //


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


module.exports = router;