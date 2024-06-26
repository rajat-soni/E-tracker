var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/", function(request, response, next){

    var querycampaign = "SELECT * FROM addtask";
    var query = "SELECT * FROM  user_tbl";
    var query1 = "SELECT * FROM addtask where priority=3 ORDER BY id DESC";
    var query2 = "SELECT * FROM campaign ORDER BY id DESC";
    var currentblast = "select (select count(*) from addtask where (blast_date = current_date && (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) > now() ) && status=0))+ (select count(*) from addtask where (rb_date = current_date && (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) > now() ) && rbstatus=0)) as currentblast";

    var weektask = "select * from addtask where blast_date > (current_date - interval 7 day)";
    var clientlist = "SELECT * FROM client_tbl c right join sender_tbl s on c.client_id=s.client_id ";
    var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";
    var completed = "select * from addtask where status=1 || rbstatus=1";
    var missed="select (select count(*) FROM `addtask` WHERE (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) < now() && status=0)) + (select count(*) from addtask where (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) < now() && rbstatus=0)) as missed";
    var pending = "select (select count(*) from addtask where (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) > now() ) and status=0) + (select count(*) from addtask where (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) > now()) and rbstatus=0 ) as pending";

    // var client_id = request.query.client_id;
    // var mysql = require('mysql');
   // var draw = request.query.draw;
//    console.log("client_id:");
//     console.log(client_id);
//  var senderlist = 'SELECT * FROM  sender_tbl WHERE client_id ='+ mysql.escape(client_id);
  
//   console.log(request.body.client_name);
database.query(querycampaign, function(error, querycampaign){
        database.query(query, function(error, data){
        database.query(query1, function(error, data1){
        database.query(query2, function(error, data2){
        database.query(currentblast, function(error, currentblast){
        database.query(weektask, function(error, data4){
        database.query(clientlist, function(error, clientlist){
            database.query(userlist, function(error, userlist){
                database.query(completed, function(error, completed){
                    database.query(pending, function(error, pending){
                        database.query(missed, function(error, missed){
        
      //  database.query(senderlist, function(error, senderlist){
//console.log(senderlist);
            
        response.render('assigntask', {title : 'Assigntask Module',querycampaign: querycampaign,data: data,data1: data1,data2: data2,currentblast: currentblast,data4: data4,clientlist: clientlist,userlist:userlist, completed:completed,pending:pending, session:request.session,missed:missed});
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


//	response.render('sender', {title : 'Sender Module',session:request.session});

});





router.get('/get_data', function(request, response, next){
    // alert("get data");
    
 
     var draw = request.query.draw;
 
     var start = request.query.start;
 
     var length = request.query.length;
 
     var order_data = request.query.order;
 
     if(typeof order_data == 'undefined')
     {
         var column_name = 'addtask.blast_date';
 
         var column_sort_order = 'desc';
     }
     else
     {
         var column_index = request.query.order[0]['column'];
 
         var column_name = request.query.columns[column_index]['data'];
 
         var column_sort_order = request.query.order[0]['dir'];
     }
 
     //search data
 
     var search_value = request.query.search['value'];
 
     var search_query = `
      AND (camp_name LIKE '%${search_value}%' 
       OR blast_date LIKE '%${search_value}%' 
       OR tact LIKE '%${search_value}%' 
       OR id LIKE '%${search_value}%'
      )
     `;
 
     //Total number of records without filtering
 
     database.query("SELECT COUNT(*) AS Total ,MAX(CONCAT(a.blast_date ,' | ', a.blast_time)) AS balst_dt,MAX(CONCAT(a.rb_date,' | ',a.rb_time)) AS reminderbalst_dt from addtask a left join user_tbl u on a.allocated_to=u.user_id", function(error, data){
 
         var total_records = data[0].Total;
         console.log("Total Records");
         console.log(total_records);
 
         //Total number of records with filtering
 
         database.query(`SELECT COUNT(*) AS Total ,MAX(CONCAT(a.blast_date ,' | ', a.blast_time)) AS balst_dt,MAX(CONCAT(a.rb_date,' | ',a.rb_time)) AS reminderbalst_dt from addtask a left join user_tbl u on a.allocated_to=u.user_id WHERE 1 ${search_query}`, function(error, data){
 
             var total_records_with_filter = data[0].Total;
 
             var query = `
             select *,now() as tdtetime,a.id as eid,a.id as rbid,u.first_name as ebfname,a.camp_name as campname,CONCAT( a.blast_date ,' | ', a.blast_time) as eblast_date,a.status as ebstatus,CONCAT( a.rb_date ,' | ', a.rb_time) as rblast_date,t3.first_name as rbfname,a.camp_name as rbcampname,a.rbstatus as rb_status,a.rb_type as rbtype from user_tbl u join addtask a on u.user_id=a.allocated_to left join user_tbl t3 on a.rballocated_to=t3.user_id  
             WHERE 1 ${search_query} 
             ORDER BY ${column_name} ${column_sort_order} 
             LIMIT ${start}, ${length}
             `;
 
             var data_arr = [];
           
             database.query(query, function (error, data) {
 
            
                 data.forEach(function (row) {
                     // console.log(row.role);
                     var user_id = request.session.user_id;
                     console.log("session_id 🎏✨🎉🎏🎋🎆"+user_id)
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
  

if(row.rb_status=="1")
{
    var rb_status=`<span class="bg-success text-light px-1 rounded small">RB-Done</span>`;
}
else  if(row.rb_status=="0" && row.rb_date!="" && getDate() > row.rb_date){
    var rb_status=`<span class="bg-danger text-light px-1 rounded small">RB-Missed</span>`;
}
else  if(row.rb_status=="0" && row.rb_date!="" && getDate() <= row.rb_date){
    var rb_status=`<span class="bg-info text-light px-1 rounded small">RB-Pending</span>`;
}
else{
    var rb_status=""; 
}


//if tact is webinar add status
if(tact === "webinar")
{
    if(row.ebstatus=="1")
    {
        var ebstatus=`<span class="bg-success text-light px-1 rounded small">Webinar-Done</span>`;
        console.log("Eblast current date 1");
        console.log(getDate());
    }
    else  if(row.ebstatus=="0" && getDate() > row.blast_date){
        var ebstatus=`<span class="bg-danger text-light px-1 rounded small">Webinar-Missed</span>`;
        console.log("Eblast current date 2" );
        console.log(getDate());
    }
    else{
        var ebstatus=`<span class="bg-info text-light px-1 rounded small">Webinar-Pending</span>`;
        console.log("Eblast current date 3");
        console.log(getDate());
    }
}

else{
    if(row.ebstatus=="1")
{
    var ebstatus=`<span class="bg-success text-light px-1 rounded small">EB-Done</span>`;
    console.log("Eblast current date 1");
    console.log(getDate());
}
else  if(row.ebstatus=="0" && getDate() > row.blast_date){
    var ebstatus=`<span class="bg-danger text-light px-1 rounded small">EB-Missed</span>`;
    console.log("Eblast current date 2" );
    console.log(getDate());
}
else{
    var ebstatus=`<span class="bg-info text-light px-1 rounded small">EB-Pending</span>`;
    console.log("Eblast current date 3");
    console.log(getDate());
}
}

//if blast type is webinar
if( row.allocated_to == row.rballocated_to)
{
    var ebstatus=ebstatus+ " " +rb_status;
}
else{}
if(row.rblast_date==" | " )
{
var rblast_date="";
}
else
{
    var rblast_date=row.rblast_date;

} 

var tact=row.tact;

                   
       // Assign Tactics here //   

       if (tact === "e_blast") {


        if(row.blast_type=="E-blast" && row.asset_name  !== null && row.asset_link  !== null)
        {

            var tact = "Email Blast";
            console.log("Email Blast" +row.blast_type);
        }

       if(row.blast_type=="Make-Good" && row.mgasset_name !== null && row.mgasset_link !== null)
        {

            var tact = "Make Good";
            console.log("Make Good" +row.blast_type);
        }


        if (row.blast_type=="Reminder-Blast" && row.rb_assetname !== null && row.rb_assetlink !== null) {
            var tact = "Email Blast / Reminder Blast";
            console.log("Email Blast / Reminder Blast" +row.blast_type);
        }


        if (row.blast_type=="RBMake-Good" && row.rb_mgasset_name !== null && row.rb_mgasset_link !== null) {
            var tact = "RB Make Good";
            console.log("RB Make Good" +row.blast_type);
        }

    }
// End //


                        if(row.rballocated_to!=row.allocated_to && row.rballocated_to!="")
                        {
                            data_arr.push({
                                'eblast_date' : row.eblast_date,
                                'camp_name' : row.camp_name,
                                'tact' : row.tact,
                                'status' : rb_status,
                                'ebfname' : row.rbfname,
                                'blast_date' : row.blast_date,
                                'rblast_date' : rblast_date,
                                'blast_type' : row.rb_type,
                               
                                'id' : row.id
                            });
                        }
                      

                        data_arr.push({
                            'eblast_date' : row.eblast_date,
                            'camp_name' : row.camp_name,
                            'tact' : row.tact,
                            'status' : ebstatus,
                            'ebfname' : row.ebfname,
                            'blast_date' : row.blast_date,
                            'blast_type' : row.blast_type,
                            'rblast_date' : rblast_date,
                            'rb_type' : row.rb_type,
                            'id' : row.id,
                            'camp_id': row.camp_id,
                            'user_rbfiles': row.user_rbfiles,
                            'user_ebfiles': row.user_ebfiles,
                            'webinar_files': row.webinar_files,
                            'id': row.id,
                            'tact': tact,
                            'tdte_time': row.tdtetime,
                            'status' : row.status,
                            'todaydt': row.todaydt,
                            'blast_date': row.blast_date,
                            'eblast_datetime': row.eblast_date,
                            'reblast_datetime': row.reblast_datetime,
                            'mg_link': row.mg_link,
                            'mg_image': row.mg_image,
                            'mg_status' : row.mg_status,
                            'rb_mg_image': row.rb_mg_image,
                            'rb_mg_link' : row.rb_mg_link,
                            'seesion_id' : user_id,
                            'allocated_to' : row.allocated_to,
                            'rbstatus' : row.rbstatus,
                            'rb_assetname' : row.rb_assetname,
                            'rb_mg_status' : row.rb_mg_status,
                            'rb_mgasset_link' : row.rb_mgasset_link,
                            'rb_mgasset_name'  : row.rb_mgasset_name,
                            'mgasset_name' : row.mgasset_name,
                            'mgasset_link' : row.mgasset_link,
                            'rb_assetlink' : row.rb_assetlink,
                            'rb_assetname' : row.rb_assetname,
                            'asset_name' : row.asset_name,
                            'asset_link' : row.asset_link
                        });

                        
                    });
             
        




 
            
                 
                 
 
                 var output = {
                     'draw' : draw,
                     'iTotalRecords' : total_records,
                     'iTotalDisplayRecords' : total_records_with_filter,
                     'aaData' : data_arr
                 };
 
                 response.json(output);
 
             });
 
         });
 
     });
 
 });
 
 
router.post('/action', function(request, response, next) { // fetch all query //

        var action = request.body.action;
    
        if (action == 'fetch') {
    
            var sqlFetch = `SELECT * FROM addtask ORDER BY id DESC`;
    
            database.query(sqlFetch, function(err, data) {
    
    
                response.json({
                    data: data
                })
    
            });
    
        }
        
      



        // Code for 

        

    if (action == 'fetch_single') // fetch single record query //
    {
        console.log("Rajashri ID:");
        var id = request.body.id;
      
        console.log(id);

        console.log("Blast Type")
        var blast_type = request.body.blast_type;
console.log(blast_type);
if(blast_type=="Reminder-Blast")
{

    var querySql = `SELECT * FROM addtask a left join user_tbl u on a.rballocated_to=u.user_id WHERE a.id = '${id}' `;
    console.log("Reminder Blast Query");
    console.log(querySql);

    database.query(querySql, function(error, data) {

        response.json(data[0]);

    });
}
else{
    var querySql = `SELECT * FROM addtask a left join user_tbl u on a.allocated_to=u.user_id WHERE a.id = '${id}' `;
    console.log("E-blast Query");
    console.log(querySql);

    database.query(querySql, function(error, data) {

        response.json(data[0]);

    });
}
       
    }


///============================= EB Admin status Code Start ==================================//
        if (action == "admin_status") {
            // edit query //

            var status_id = request.body.status_id;
            console.log("status_id" + status_id);
            var user_id = request.session.user_id; // session variable //
            // console.log('session user '+user_id);

            
                    var updateTask = `UPDATE addtask SET status = 1   WHERE id = ${status_id}`;
                
                    database.query(updateTask, function (error, data) {
                        if (!error) {
                            response.json({
                                success: true,
                                message: "EB  status  Done.. ",
                            });
                        } else {
                            response.json({
                                success: false,
                                message: "Error in Error in Make Good!",
                            });
                        }
                    });
            } ///============================= EB  Admin status Code End ==================================//

    


///============================= EB Make Good status Code Start ==================================//
            if (action == "admin_make_good_status") {
                // edit query //
        
                var makeGoodStatusId = request.body.makeGoodStatusId;
                console.log("makeGoodStatusId" + makeGoodStatusId);
                var user_id = request.session.user_id; // session variable //
                // console.log('session user '+user_id);
        
                
                        var updateTask = `UPDATE addtask SET mg_status = 1   WHERE id = ${makeGoodStatusId}`;
                        console.log("updateTask🎟🎞🎞🎗🎁"+updateTask)
                      
                        database.query(updateTask, function (error, data) {
                            if (!error) {
                                response.json({
                                    success: true,
                                    message: "Make good  status  Done.. ",
                                });
                            } else {
                                response.json({
                                    success: false,
                                    message: "Error in Error in Make Good!",
                                });
                            }
                        });
            }   ///============================= EB Make Good status Code End ==================================//
                
            
            

            ///============================= RB status code Start ==================================//
            if (action == "admin_rb_status") {
                // edit query //
        
                var rbStatusId = request.body.rbStatusId;
                console.log("makeGoodStatusId" + rbStatusId);
                var user_id = request.session.user_id; // session variable //
                // console.log('session user '+user_id);
        
                
                        var updateTask = `UPDATE addtask SET rbstatus = 1   WHERE id = ${rbStatusId}`;
                        console.log("updateTask🎟🎞🎞🎗🎁"+updateTask)
                      
                        database.query(updateTask, function (error, data) {
                            if (!error) {
                                response.json({
                                    success: true,
                                    message: "Admin RB  status  Done.. ",
                                });
                            } else {
                                response.json({
                                    success: false,
                                    message: "Error in Error in Make Good!",
                                });
                            }
                        });
            } ///============================= RB status code End ==================================//
    


///============================= RB MG Status Code Start ==================================//
            if (action == "admin_rb_mg_status") {
                // edit query //
        
                var rbMgStatusId = request.body.rbMgStatusId;
                console.log("makeGoodStatusId" + rbMgStatusId);
                var user_id = request.session.user_id; // session variable //
                // console.log('session user '+user_id);
        
                
                        var updateTask = `UPDATE addtask SET rb_mg_status = 1   WHERE id = ${rbMgStatusId}`;
                        console.log("updateTask🎟🎞🎞🎗🎁"+updateTask)
                      
                        database.query(updateTask, function (error, data) {
                            if (!error) {
                                response.json({
                                    success: true,
                                    message: "Make good  RB status  Done.. ",
                                });
                            } else {
                                response.json({
                                    success: false,
                                    message: "Error in Error in Make Good!",
                                });
                            }
                        });
            } ///============================= RB MG Status Code End ==================================//



    if (action == 'Edit') // edit query //
     {
console.log("Record Edit Clicked");
        var assignid = request.body.assignid;
        var camp_id = request.body.camp_id;
        var blst_type = request.body.blst_type;
        var user_id = request.body.user_id; 
       

        var sqlQryUpdated =
            `UPDATE taskassign SET 
            camp_id = "${camp_id}", 
            blst_type = "${blst_type}",
            user_id = "${user_id}"
            WHERE id = "${id}"`;

          
        database.query(sqlQryUpdated, function(error, data) {
         
            response.json({
                message: 'Record updated!'
            })

        })

    }


    if(action == 'delete'){ // delete query //
		console.log("Delete");

        var id = request.body.id;
      
        console.log(id);

        console.log("Blast Type")
        var blast_type = request.body.blast_type;
if(blast_type=="Reminder-Blast")
{
	var query = ` UPDATE addtask SET 
    rb_assetname = "${rb_assetname}", 
    blst_type = "${blst_type}",
    rballocated_to = ""
    WHERE id = "${id}"`;
        console.log(query);

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});

}

	
	}






    if(action == 'fetch_single_view')
	{
		//alert("Fetch Single Record");
		var id = request.body.id;
        var blast_type = request.body.blast_type;
        var tact = request.body.tact;
        console.log("Tact in js" +tact);
        console.log("ID in js" +id);
        console.log("Blast Type in js:" +blast_type);
        if(blast_type=="E-blast" || tact=="webinar")
        {
            var query = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname right join client_tbl c on s.client_id=c.client_id right join user_tbl u on a.allocated_to=u.user_id where a.id = "${id}"`;
        }
        else{
            var query = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname right join client_tbl c on s.client_id=c.client_id right join user_tbl u on a.rballocated_to=u.user_id where a.id = "${id}"`;
        }
       
            
            console.log("Fetch Single Query For View");
                    console.log(query);
                    database.query(query, function(error, data){
            
                        response.json(data[0]);
            
                    });
     

   
	
	}



});


// router.get("/", function(request, response, next){

//     //console.log(request.session);
        

//     })
module.exports = router;