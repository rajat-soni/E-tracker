
var express = require('express');
var multer = require('multer');
var router = express.Router();

var database = require('../database');
var path = require('path');
const e = require('connect-flash');


router.get("/", function (request, response, next) {


    var alltask = "SELECT * FROM addtask";

   

    var query = "select *,a.id as eid,a.id as rbid,u.first_name as ebfname,a.camp_name as campname,CONCAT( a.blast_date ,' | ', a.blast_time) as eblast_date,a.status as ebstatus,CONCAT( a.rb_date ,' | ', a.rb_time) as rblast_date,t3.first_name as rbfname,a.camp_name as rbcampname,a.rbstatus as rb_status,a.rb_type as rbtype from user_tbl u join addtask a on u.user_id=a.allocated_to left join user_tbl t3 on a.rballocated_to=t3.user_id ";

    var query1 = " SELECT *, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS rb_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,' | ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,' | ', rb_time) >= CURRENT_TIMESTAMP)";
    var query2 = "SELECT * FROM campaign ORDER BY id DESC";
    var currentblast = "select (select count(*) from addtask where (blast_date = current_date && (DATE_ADD(concat(blast_date, ' ', blast_time),interval 1 hour) > now() ) && status=0))+ (select count(*) from addtask where (rb_date = current_date && (DATE_ADD(concat(rb_date, ' ', rb_time),interval 1 hour) > now() ) && rbstatus=0)) + (select count(*) from addtask where (mg_date = current_date && (DATE_ADD(concat(mg_date, ' ', mg_time),interval 1 hour) > now() ) && mg_status=0)) + (select count(*) from addtask where (rb_mg_date = current_date && (DATE_ADD(concat(rb_mg_date, ' ', rb_mg_time),interval 1 hour) > now() ) && rb_mg_status=0)) as currentblast";
    var weektask = "SELECT *, CONCAT( blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)";
    var clientlist = "select *,c.client_id as cid,c.client_name as cname from client_tbl c right join sender_tbl s on c.client_id=s.client_id  ";
    var userlist = "SELECT * FROM  user_tbl ORDER BY user_id DESC";


    var completed = "select((select count(*) from addtask where status=1)+(select count(*) from addtask where rbstatus=1)+(select count(*) from addtask where mg_status=1)+(select count(*) from addtask where rb_mg_status=1)) as completed";
    var missed = "select (select count(*) FROM `addtask` WHERE (DATE_ADD(concat(blast_date, ' ', blast_time),interval 1 hour) < now() && status=0)) + (select count(*) from addtask where (DATE_ADD(concat(rb_date, ' ', rb_time),interval 1 hour) < now() && rbstatus=0)) + (select count(*) from addtask where (DATE_ADD(concat(mg_date, ' ', mg_time),interval 1 hour) < now() && mg_status=0)) + (select count(*) from addtask where (DATE_ADD(concat(rb_mg_date, ' ', rb_mg_time),interval 1 hour) < now() && rb_mg_status=0)) as missed";
    var pending = "select (select count(*) from addtask where (DATE_ADD(concat(blast_date, ' ', blast_time),interval 1 hour) > now() ) and status=0) + (select count(*) from addtask where (DATE_ADD(concat(rb_date, ' ', rb_time),interval 1 hour) > now()) and rbstatus=0 ) + (select count(*) from addtask where (DATE_ADD(concat(mg_date, ' ', mg_time),interval 1 hour) > now()) and mg_status=0 ) + (select count(*) from addtask where (DATE_ADD(concat(rb_mg_date, ' ', rb_mg_time),interval 1 hour) > now()) and rb_mg_status=0 ) as pending    ";


   
    database.query(alltask, function (error, alltask) {
        database.query(query, function (error, data) {
            database.query(query1, function (error, data1) {
                database.query(query2, function (error, data2) {
                    database.query(currentblast, function (error, currentblast) {
                        database.query(weektask, function (error, data4) {
                            database.query(clientlist, function (error, clientlist) {
                                database.query(userlist, function (error, userlist) {
                                    database.query(completed, function (error, completed) {
                                        database.query(pending, function (error, pending) {
                                            database.query(missed, function (error, missed) {

                                               

                                                response.render('alltask', { title: 'TASK Details', missed: missed, alltask: alltask, data: data, data1: data1, data2: data2, currentblast: currentblast, data4: data4, clientlist: clientlist, completed: completed, pending: pending, userlist: userlist, session: request.session });
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



// Code start for Fetch Dropdown value



router.get('/get_sender_data11', function (request, response, next) {

    console.log("get_sender_data11 called");
    var type = request.query.type;

    var search_query = request.query.parent_value;
    var id = request.query.id;

    if (type == 'load_senderdtl') {
        var query = `
             SELECT DISTINCT CONCAT( " Sender Name:","  ", sender_name  ," Sender Email:",  "  ", sender_email) AS Data FROM sender_tbl 
             WHERE client_id = '${search_query}'  
             ORDER BY sender_email ASC `;


    }



    if (action == 'Edit')
        console.log("Edit action button clicked");
    var id = request.body.id;
    var action = request.query.action;
    console.log("rajashri")
    console.log(action);
    {

        if (type == 'load_asset_name11') {
            //alert("app task edit");
            var id = request.query.id;
            console.log(id);
            var query = `SELECT asset_name AS Data FROM addtask WHERE id = "${id}"`;


        }

    }



    database.query(query, function (error, data) {

        var data_arr = [];

        data.forEach(function (row) {
            data_arr.push(row.Data);
        });

        response.json(data_arr);

    });

});


// Code End for Fetch Dropdown value



///code for display profile




//end code for display profile

router.get('/get_data', function (request, response, next) {
    // alert("get data");


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if (typeof order_data == 'undefined') {
        var column_name = 'addtask.blast_date';

        var column_sort_order = 'desc';
    }
    else {
        var column_index = request.query.order[0]['column'];

        var column_name = request.query.columns[column_index]['data'];

        var column_sort_order = request.query.order[0]['dir'];
    }

    //search data

    var search_value = request.query.search['value'];

    var search_query = `
     AND (camp_name LIKE '%${search_value}%' 
      OR blast_date LIKE '%${search_value}%' 
     
      OR id LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    database.query("SELECT COUNT(*) AS Total ,MAX(CONCAT(  blast_date ,' | ', blast_time)) AS balst_dt FROM addtask", function (error, data) {

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total ,MAX(CONCAT(  blast_date ,' | ', blast_time)) AS balst_dt FROM addtask WHERE 1 ${search_query}`, function (error, data) {

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT * ,CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask left join comment_tbl on addtask.id=comment_tbl.camp_id
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;


            console.log("check query:" + query);
            var data_arr = [];

            database.query(query, function (error, data) {

                data.forEach(function (row) {


                    const getDate = () => {
                        const newDate = new Date();
                        const year = newDate.getFullYear();
                        const month = newDate.getMonth() + 1;
                        const d = newDate.getDate();

                        return `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                    }

                    console.log("GetDate" + getDate());
                    console.log("RBStatus" + row.rbstatus);
                    console.log("EBSTatus" + row.status);


                    var priority = row.priority;
                    var tact = row.tact;

                    console.log("tact in routes:" + tact);
                    console.log("blast_type in routes:" + row.blast_type);

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


                        
                        //  if (row.blast_type == "RBMake-Good" && row.rb_mgasset_name !== null && row.rb_mgasset_link !== null) {
                        //     var tact = "RB Make Good";
                        //     console.log("RB Make Good" +row.blast_type);
                        // }

                    }
                     if (tact === "webinar") {
                        var tact = "Webinar";
                        console.log("webinar" +row.blast_type);
                    }



                    if (priority == "Rush") {
                        var camp_name = row.camp_name + " " + `<span class="bg-danger text-light px-1 rounded small">Rush</span>`;
                    }
                    else {
                        var camp_name = row.camp_name;
                    }



                    console.log("tact is:" +tact);

                    data_arr.push({
                        'balst_dt': row.balst_dt,
                        'camp_name': camp_name,
                        'tact': tact,

                        'status': row.status,
                        'allocated_to': row.allocated_to,
                        'blast_date': row.blast_date,
                        'blast_type': row.blast_type,
                        'rb_type': row.rb_type,
                        'rb_date': row.rb_date,
                        'blast_time': row.blast_time,
                        'camp_id': row.camp_id,
                        'admin_rb_file': row.admin_rb_file,
                        'mg_date': row.mg_date,
                        'mg_time': row.mg_time,
                        'mg_status': row.mg_status,
                        'rb_mg_date': row.rb_mg_date,
                        'rb_mg_time': row.rb_mg_time,
                        'rb_mg_status': row.rb_mg_status,
                        'rbstatus': row.rbstatus,
                        'mgasset_name': row.mgasset_name,
                        'mgasset_link': row.mgasset_link,
                        'rb_assetname': row.rb_assetname,
                        'rb_assetlink': row.rb_assetlink,
                        'rb_time': row.rb_time,
                        'comment': row.comment,
                        'rb_comment': row.rb_comment,
                        'admin_ebmgcmt': row.admin_ebmgcmt,
                        'admin_rbmgcmt': row.admin_rbmgcmt,
                        'webinar_comment': row.webinar_comment,
                        'admin_ebmgfiles': row.admin_ebmgfiles,
                        'admin_rbmgfiles': row.admin_rbmgfiles,
                        'admin_files': row.admin_files,
                        'admin_rb_file': row.admin_rb_file,
                       
                        'id': row.id
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

//end code for display all data



//start code for display priority data
router.get('/get_prioritydata', function (request, response, next) {


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if (typeof order_data == 'undefined') {
        var column_name = 'addtask.id';

        var column_sort_order = 'desc';
    }
    else {
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

    database.query("SELECT COUNT(*) AS Total, MAX(CONCAT(  blast_date ,' | ', blast_time)) AS balst_dt ,MAX(CONCAT( rb_date ,' | ', rb_time)) AS rb_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,'  ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,'  ', rb_time) >= CURRENT_TIMESTAMP) ", function (error, data) {

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total, MAX(CONCAT(  blast_date," | ", blast_time)) AS balst_dt, MAX(CONCAT( rb_date ,' | ', rb_time)) AS rb_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,'  ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,'  ', rb_time) >= CURRENT_TIMESTAMP) AND 1 ${search_query}`, function (error, data) {

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT *, CONCAT( blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS rb_dt, CONCAT( mg_date ,' | ', mg_time) AS mg_dt, CONCAT( rb_mg_date ,' | ', rb_mg_time) AS rb_mg_dt FROM addtask WHERE priority='Rush' && (CONCAT( blast_date ,' ', blast_time) >= CURRENT_TIMESTAMP OR CONCAT( rb_date ,' ', rb_time) >= CURRENT_TIMESTAMP OR CONCAT( mg_date ,' ', mg_time) >= CURRENT_TIMESTAMP OR CONCAT(rb_mg_date ,' ', rb_mg_time) >= CURRENT_TIMESTAMP) AND 1 ${search_query} 
            ORDER BY balst_dt,${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

           
            var data_arr = [];

            database.query(query, function (error, data) {

                data.forEach(function (row) {


                    var priority = row.priority;
                    var tact = row.tact;

                    console.log("tact in routes:" + tact);
                    console.log("blast_type in routes:" + row.blast_type);

                    if (tact === "e_blast") {


                        if(row.blast_type="E-blast" && row.asset_name!="" && row.asset_link!="")
                        {

                            var tact = "Email Blast";
                        }

                       if(row.blast_type="Make-Good" && row.mgasset_name!="" && row.mgasset_link!="")
                        {

                            var tact = "Make Good";
                        }


                        if (row.blast_type="Reminder-Blast" && row.rb_assetname != "" && row.rb_assetlink != "") {
                            var tact = "Email Blast / Reminder Blast";
                        }
                        
                         if (row.blast_type="RBMake-Good" && row.rb_mgasset_name != "" && row.rb_mgasset_link != "") {
                            var tact = "RB Make Good";
                        }

                    }
                     if (tact === "webinar") {
                        var tact = "Webinar";
                    }



                    if (priority == "Rush") {
                        var camp_name = row.camp_name + " " + `<span class="bg-danger text-light px-1 rounded small">Rush</span>`;
                    }
                    else {
                        var camp_name = row.camp_name;
                    }

console.log("check tact in priority data:" +tact)

                    data_arr.push({
                        'camp_name': camp_name,
                        'blast_date1': row.balst_dt,
                        'tact': tact,

                        'status': row.status,
                        'allocated_to': row.allocated_to,
                        'blast_date': row.blast_date,
                        'blast_type': row.blast_type,
                        'rb_type': row.rb_type,
                        'rb_date': row.rb_date,
                       
                        'blast_time': row.blast_time,
                       
                        'mg_date': row.mg_date,
                        'mg_time': row.mg_time,
                        'mg_status': row.mg_status,
                        'rbstatus': row.rbstatus,
                        'mgasset_name': row.mgasset_name,
                        'mgasset_name': row.mgasset_name,
                        'mgasset_link': row.mgasset_link,
                        'rb_assetname': row.rb_assetname,
                        'rb_assetlink': row.rb_assetlink,
                        'rb_time': row.rb_time,
                        'rb_mg_date': row.rb_mg_date,
                        'rb_mg_time': row.rb_mg_time,
                        'rb_mg_status': row.rb_mg_status,
                        'id': row.id
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

//End code for display priority data






router.get('/get_todaytaskdata', function (request, response, next) {


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if (typeof order_data == 'undefined') {
        var column_name = 'addtask.id';

        var column_sort_order = 'desc';
    }
    else {
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

    database.query("SELECT COUNT(*) AS Total, MAX(CONCAT(  blast_date ,' | ', blast_time)) AS balst_dt FROM addtask where blast_date=CURDATE() && (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) > now()) || (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) > now() ) order by date(blast_date)asc,blast_time asc", function (error, data) {

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total, MAX(CONCAT(  blast_date ,' | ', blast_time)) AS balst_dt FROM addtask WHERE blast_date=CURDATE() && (DATE_ADD(concat(blast_date, ' ', blast_time),interval 2 hour) > now()) || (DATE_ADD(concat(rb_date, ' ', rb_time),interval 2 hour) > now() ) AND 1 ${search_query}`, function (error, data) {

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT *, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt FROM addtask WHERE blast_date=CURDATE() && (DATE_ADD(concat(blast_date, ' ', blast_time),interval 1 hour) > now()) || (DATE_ADD(concat(rb_date, ' ', rb_time),interval 1 hour) > now() ) || (DATE_ADD(concat(mg_date, ' ', mg_time),interval 1 hour) > now() ) || (DATE_ADD(concat(rb_mg_date, ' ', rb_mg_time),interval 1 hour) > now() ) AND 1 ${search_query} 
            ORDER BY balst_dt,${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;


            
            var data_arr = [];

            database.query(query, function (error, data) {

                data.forEach(function (row) {

                    var priority = row.priority;
                    var tact = row.tact;

                    console.log("tact in routes:" + tact);
                    console.log("blast_type in routes:" + row.blast_type);

                    if (tact === "e_blast") {


                        if(row.blast_type="E-blast" && row.asset_name!="" && row.asset_link!="")
                        {

                            var tact = "Email Blast";
                        }

                       if(row.blast_type="Make-Good" && row.mgasset_name!="" && row.mgasset_link!="")
                        {

                            var tact = "Make Good";
                        }


                        if (row.blast_type="Reminder-Blast" && row.rb_assetname != "" && row.rb_assetlink != "") {
                            var tact = "Email Blast / Reminder Blast";
                        }
                        
                         if (row.blast_type="RBMake-Good" && row.rb_mgasset_name != "" && row.rb_mgasset_link != "") {
                            var tact = "RB Make Good";
                        }

                    }
                     if (tact === "webinar") {
                        var tact = "Webinar";
                    }



                    if (priority == "Rush") {
                        var camp_name = row.camp_name + " " + `<span class="bg-danger text-light px-1 rounded small">Rush</span>`;
                    }
                    else {
                        var camp_name = row.camp_name;
                    }

console.log("check tact in todays task data:" +tact)


                    data_arr.push({
                        'camp_name': camp_name,
                        'blast_date1': row.balst_dt,
                        'blast_date': row.blast_date,
                        'tact': tact,
                        'blast_time': row.blast_time,
                        'rb_date': row.rb_date,
                        'rb_type': row.rb_type,
                        'allocated_to': row.allocated_to,
                        'status': row.status,
                        'rbstatus': row.rbstatus,
                        'mgasset_name': row.mgasset_name,
                        'mgasset_name': row.mgasset_name,
                        'mgasset_link': row.mgasset_link,
                        'rb_assetname': row.rb_assetname,
                        'rb_assetlink': row.rb_assetlink,
                        'rb_time': row.rb_time,
                        'rb_mg_date': row.rb_mg_date,
                        'rb_mg_time': row.rb_mg_time,
                        'rb_mg_status': row.rb_mg_status,
                        'id': row.id
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






router.get('/get_weeklytaskdata', function (request, response, next) {


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if (typeof order_data == 'undefined') {
        var column_name = 'addtask.id';

        var column_sort_order = 'desc';
    }
    else {
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

    database.query("SELECT COUNT(*) AS Total,  MAX(CONCAT(blast_date, ' | ', blast_time)) AS blast_dt,  MAX(CONCAT(rb_date, ' | ', rb_time)) AS reminder_dt FROM addtask WHERE (blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) OR (rb_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY); ", function (error, data) {


     


        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total, MAX(CONCAT(  blast_date ,' | ', blast_time)) AS balst_dt, MAX(CONCAT( rb_date ,' | ', rb_time)) AS reminder_dt FROM addtask WHERE (blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) || (rb_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) AND 1 ${search_query}`, function (error, data) {

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT *, CONCAT( blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS reminder_dt FROM addtask WHERE (blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) || (rb_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) || (mg_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) || (rb_mg_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) AND 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;






            var data_arr = [];

            database.query(query, function (error, data) {

                data.forEach(function (row) {

                    var priority = row.priority;
                    var tact = row.tact;

                    console.log("tact in routes:" + tact);
                    console.log("blast_type in routes:" + row.blast_type);

                    if (tact === "e_blast") {


                        if(row.blast_type="E-blast" && row.asset_name!="" && row.asset_link!="")
                        {

                            var tact = "Email Blast";
                        }

                       if(row.blast_type="Make-Good" && row.mgasset_name!="" && row.mgasset_link!="")
                        {

                            var tact = "Make Good";
                        }


                        if (row.blast_type="Reminder-Blast" && row.rb_assetname != "" && row.rb_assetlink != "") {
                            var tact = "Email Blast / Reminder Blast";
                        }
                        
                         if (row.blast_type="RBMake-Good" && row.rb_mgasset_name != "" && row.rb_mgasset_link != "") {
                            var tact = "RB Make Good";
                        }

                    }
                     if (tact === "webinar") {
                        var tact = "Webinar";
                    }



                    if (priority == "Rush") {
                        var camp_name = row.camp_name + " " + `<span class="bg-danger text-light px-1 rounded small">Rush</span>`;
                    }
                    else {
                        var camp_name = row.camp_name;
                    }



                    data_arr.push({
                        'camp_name': camp_name,
                        'blast_date1': row.balst_dt,
                        'tact': tact,

                        'status': row.status,
                        'allocated_to': row.allocated_to,
                        'blast_date': row.blast_date,
                        'blast_type': row.blast_type,
                        'rb_type': row.rb_type,
                        'rb_date': row.rb_date,
                        'blast_time': row.blast_time,
                        'rb_date': row.rb_date,
                        'rb_type': row.rb_type,
                        'allocated_to': row.allocated_to,
                      
                        'rbstatus': row.rbstatus,
                        'mgasset_name': row.mgasset_name,
                        'mgasset_name': row.mgasset_name,
                        'mgasset_link': row.mgasset_link,
                        'rb_assetname': row.rb_assetname,
                        'rb_assetlink': row.rb_assetlink,
                        'rb_time': row.rb_time,
                        'rb_mg_date': row.rb_mg_date,
                        'rb_mg_time': row.rb_mg_time,
                        'rb_mg_status': row.rb_mg_status,
                        'id': row.id
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




router.get("/logout", function (request, response, next) {
    response.send("Logged out")

});


router.post("/action", function (request, response, next) {

    var action = request.body.action;

    if (action == 'fetch') {
        var query = "SELECT * FROM addtask ORDER BY id DESC";


        database.query(query, function (error, data) {

            response.json({
                data: data
            });

        });
    }




    /* Start Code For Priority Task */
    if (action == 'task_priority') {
        var query = "SELECT * FROM addtask where priority='Rush'";

        database.query(query, function (error, data) {

            response.json({
                data: data
            });

        });
    }

    /* End Code For Priority Task */

    if (action == "fetch_single_Profile") { // for profile view //
       
console.log("within fetch_single_Profile");
    
        var id = request.body.user_id;
      
        console.log("user_id"+id)
        var swlquery = `SELECT * FROM  user_tbl where user_id  = "${id}" `;
       
       
        database.query(swlquery, function (error, data) {
            response.json(data[0]);
            console.log("myqueryCheck"+swlquery)
        });
    }

    /* Start Code For Today's Task */



    if (action == 'task_today') {
        var query = "SELECT * FROM addtask where blast_date=CURDATE()";

        database.query(query, function (error, data) {

            response.json({
                data: data
            });

        });
    }



    /* End Code For Today's Task */



    /* Start Code For This Week Task */
    if (action == 'task_week') {
        var query = "select * from addtask where blast_date > (current_date - interval 7 day)";

        database.query(query, function (error, data) {

            response.json({
                data: data
            });

        });
    }

    /* End Code For This Week Task */


    if (action == 'Add') {
        console.log("Add Action Clicked");

        var tact = request.body.tactebweb;
        console.log("Tactics:" + tact);

        if (tact == "e_blast") {


            var cname = request.body.cname;

            console.log("Cname check during add:" + cname);
            var camp_name = request.body.camp_name;
            var camp_from = request.body.camp_from;
            var blast_count = request.body.blast_count;
            var asset_name = request.body.asset_name;
            var asset_link = request.body.asset_link;


            var blast_type = request.body.blast_type11;
            var blast_date = request.body.blast_date;
            var blast_time = request.body.blast_time;
            var geoe = request.body.geo;


            var rb_type = "";
            var rb_assetname = "";
            var rb_assetlink = "";
            var rb_date = "";
            var rb_time = "";
            var rballocated_to = "";
            //var comment = request.body.comment;
            var priority = request.body.priority;
            var allocated_to = request.body.allocated_to;
            var status = 0;
            var cname = cname[0];

            console.log("check cname 0:" + cname);


            console.log("Blast Time during add" + blast_time);

            // start code to Convert AM/PM to 24 Hours  

            var hrs = Number(blast_time.match(/^(\d+)/)[1]);
            var mnts = Number(blast_time.match(/:(\d+)/)[1]);
            var format = blast_time.match(/\s(.*)$/)[1];
            if (format == "PM" && hrs < 12) hrs = hrs + 12;
            if (format == "AM" && hrs == 12) hrs = hrs - 12;
            var hours = hrs.toString();
            var minutes = mnts.toString();
            if (hrs < 10) hours = "0" + hours;
            if (mnts < 10) minutes = "0" + minutes;
            var blast_time = hours + ":" + minutes + ":00";
            console.log("check Blast Time during add:" + blast_time); //h:i:s


            // End code to Convert AM/PM to 24 Hours  
            console.log(cname);
            var query = `
		INSERT INTO addtask 
		(cname,camp_name, camp_from,blast_count,asset_name,asset_link,tact,blast_type,blast_date,blast_time,rb_type,rb_assetname,rb_assetlink,rb_date,rb_time,rballocated_to,priority,allocated_to,status,geo) 
		VALUES ("${cname}", "${camp_name}","${camp_from}","${blast_count}", "${asset_name}", "${asset_link}", "${tact}", "${blast_type}", "${blast_date}","${blast_time}", "${rb_type}", "${rb_assetname}","${rb_assetlink}","${rb_date}","${rb_time}","${rballocated_to}","${priority}", "${allocated_to}", "${status}","${geoe}")
		`;
       
            console.log(query);
            database.query(query, function (error, data) {

                response.json({
                    message: "Data Inserted Successfully..."
                });

            });
        }

        else if (tact == "webinar") {
            var cnamewebinar = request.body.cnamewebinar;
            
            var webcamp_name = request.body.webcamp_name;
            var webcamp_from = request.body.webcamp_from;
            var webinar_count = request.body.webinar_count;
            var webpriority = request.body.webpriority;
            var weballocated_to = request.body.weballocated_to;
            var webblsttype = request.body.webblsttype;
            var registration_link = request.body.registration_link;
            var registration_date = request.body.registration_date;
            var registration_time = request.body.registration_time;
           // var webcomment = request.body.webcomment;


            console.log("webblsttype:" + webblsttype);
            var webasset_name = "";

            var rb_type = "";
            var rb_assetname = "";
            var rb_date = "";
            var rb_time = "";
            var rb_assetname = "";
            var rb_assetlink = "";
            var webstatus = "0";




            console.log("Registration Time during add" + registration_time);

            // start code to Convert AM/PM to 24 Hours  

            var hrs1 = Number(registration_time.match(/^(\d+)/)[1]);
            var mnts1 = Number(registration_time.match(/:(\d+)/)[1]);
            var format1 = registration_time.match(/\s(.*)$/)[1];
            if (format1 == "PM" && hrs1 < 12) hrs1 = hrs1 + 12;
            if (format1 == "AM" && hrs1 == 12) hrs1 = hrs1 - 12;
            var hours1 = hrs1.toString();
            var minutes1 = mnts1.toString();
            if (hrs1 < 10) hours1 = "0" + hours1;
            if (mnts1 < 10) minutes1 = "0" + minutes1;
            var registration_time = hours1 + ":" + minutes1 + ":00";
            console.log("check Registration Time during add:" + registration_time); //h:i:s

            var querywebinar = `
		INSERT INTO addtask 
		(cname,camp_name, camp_from,blast_count,asset_name,asset_link,tact,blast_type,blast_date,blast_time,rb_type,rb_assetname,rb_assetlink,rb_date,rb_time,priority,allocated_to,status) 
		VALUES ("${cnamewebinar}", "${webcamp_name}","${webcamp_from}","${webinar_count}", "${webasset_name}", "${registration_link}", "${tact}", "${webblsttype}", "${registration_date}","${registration_time}", "${rb_type}", "${rb_assetname}","${rb_assetlink}","${rb_date}","${rb_time}","${webpriority}", "${weballocated_to}", "${webstatus}")
		`;
            console.log(querywebinar);
            database.query(querywebinar, function (error, data) {

                response.json({
                    message: "Data Inserted Successfully..."
                });

            });

        }

    }

    if (action == 'fetch_single') {
        console.log("Raj Fetch single");

        var id = request.body.id;
        console.log(id);

        var query = `SELECT * FROM  addtask a right join sender_tbl s on a.cname=s.client_id WHERE a.id = "${id}"`;
        console.log("Fetch Single Query");
        console.log(query);
        database.query(query, function (error, data) {

            response.json(data[0]);

        });
    }





    if (action == 'fetch_single_view') {
        //alert("Fetch Single Record");
        var id = request.body.id;
        console.log("id" + id);

        var query = `SELECT * FROM sender_tbl s right join addtask a on s.client_id=a.cname right join client_tbl c on s.client_id=c.client_id right join user_tbl u on a.allocated_to=u.user_id left join comment_tbl cm on cm.camp_id=a.id WHERE a.id = "${id}"`;
        console.log("Fetch Single Query For View");
        console.log(query);
        database.query(query, function (error, data) {

            response.json(data[0]);

        });
    }



    if (action == 'fetch_senderdtl') {
        //  console.log("Fetch sender detail");
        //alert("Fetch Single Record");
        //var id = request.body.id;
        var cname = request.body.cname;

        //var query = `SELECT * FROM  addtask a right join sender_tbl s on a.cname=s.client_id WHERE  a.cname="${cname}"`;


        var query = `select *,c.client_id as cid,c.client_name as cname from client_tbl c right join sender_tbl s on c.client_id=s.client_id WHERE  c.client_id="${cname}"`;
        console.log(query);
        database.query(query, function (error, data) {

            response.json(data[0]);

        });
    }




    if (action == 'fetch_senderdtladd') {
        console.log("Fetch sender detail");
        //alert("Fetch Single Record");
        //var id = request.body.id;
        var cname = request.body.cname;
        console.log(cname);
        var query = `select *,c.client_id as cid from client_tbl c right join sender_tbl s on c.client_id=s.client_id where s.client_id="${cname}"`;
        console.log(query);

        database.query(query, function (error, data) {

            response.json(data[0]);

        });
    }




    // start code for view uploaded files


    if (action == 'fetch_files') {
        //alert("Fetch Single Record");
        var id = request.body.id;
        console.log("id" + id);

        var query = `SELECT * FROM comment_tbl WHERE camp_id = "${id}"`;
        console.log("Fetch Single Query For View");
        console.log(query);
        database.query(query, function (error, data) {

            response.json(data[0]);

        });
    }

    //end code for view uploaded files

    /*  if(action == 'fetch_senderdtl')
     {
       //  console.log("Fetch sender detail");
         //alert("Fetch Single Record");
         //var id = request.body.id;
         var cname = request.body.cname;
         
         var query = `SELECT * FROM addtask a left join sender_tbl s on a.cname=s.client_id left join client_tbl c on s.client_id=c.client_id WHERE  a.cname="${cname}"`;
         console.log(query);
 
         database.query(query, function(error, data){
 
             response.json(data[0]);
 
         });
     }
  */




    if (action == 'Edit') {
        console.log("Clicked on Edit Button");


        var tact = request.body.tact1122;


        console.log("tact is 11:" + tact);

        const getDate = () => {
            const newDate = new Date();
            const year = newDate.getFullYear();
            const month = newDate.getMonth() + 1;
            const d = newDate.getDate();

            return `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
        }

        console.log("GetDate" + getDate());




        //alert("app task edit");
        var id = request.body.id;


        var cname = request.body.cname;


        var camp_name = request.body.camp_name;
        console.log("camp_name is:" + camp_name);
        var camp_from = request.body.camp_from;
        var blast_count = request.body.blast_count;
        var asset_name = request.body.asset_name;
        var asset_link = request.body.asset_link;
        var rb_type = request.body.blast_typerr;
        var rb_assetname = request.body.rb_assetname;
        var rb_asset_link = request.body.rb_asset_link;



        var rballocated_to = request.body.rballocated_to;

        var blast_type = request.body.blast_typerr;
        var blast_date = request.body.blast_date;
        var blast_time = request.body.blast_time;
      //  var comment = request.body.comment;
        var priority = request.body.priority;
        var allocated_to = request.body.allocated_to;

        var mgallocated_to = request.body.mgallocated_to;
        var mgasset_name = request.body.mgasset_name;
        var mgasset_link = request.body.mgasset_link;
        var mg_date = request.body.mg_date;

        console.log("MG Date in routes file is:" +mg_date);
        var mg_time = request.body.mg_time;

        console.log("mg_time in routes file is:" +mg_time);

        var rb_mgallocated_to = request.body.rb_mgallocated_to;
        var rb_mgasset_name = request.body.rb_mgasset_name;
        var rb_mgasset_link = request.body.rb_mgasset_link;
        var rb_mg_date = request.body.rb_mg_date;
        var rb_mg_time = request.body.rb_mg_time;
        var geo = request.body.geo;
        var mg_geo= request.body.mg_geo;
        var rb_geo= request.body.rb_geo;
        var rb_mg_geo= request.body.rb_mg_geo;
        var geo_chosen= request.body.geo;

    
        console.log("check geo :" +geo);
        console.log("check mg_geo :" +mg_geo);
        console.log("check rb_geo :" +rb_geo);
        console.log("check rb_mg_geo :" +rb_mg_geo);
        var cname = cname[0];



        // start code to Convert AM/PM to 24 Hours  
        var rb_date = request.body.rb_date;
        var rb_time = request.body.rb_time;

        console.log("Blast Time:" + blast_time);
//convert blast time to 24 hours format
        var validTime = blast_time.match(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/);
        if (!validTime) {

            console.log("In 24 hours Format");
            var blast_time = request.body.blast_time;
            console.log("Else RB Time:" + blast_time);
        } else {
            console.log("In AM/PM Format");
            var hrs = Number(blast_time.match(/^(\d+)/)[1]);
            var mnts = Number(blast_time.match(/:(\d+)/)[1]);
            var format = blast_time.match(/\s(.*)$/)[1];
            if (format == "PM" && hrs < 12) hrs = hrs + 12;
            if (format == "AM" && hrs == 12) hrs = hrs - 12;
            var hours = hrs.toString();
            var minutes = mnts.toString();
            if (hrs < 10) hours = "0" + hours;
            if (mnts < 10) minutes = "0" + minutes;
            var blast_time = hours + ":" + minutes + ":00";
            console.log("check blast_time Blast Time during Update]:" + blast_time); //h:i:s
        }


//end code for convert blast time to 24 hours format



//code start to convert RB time AM/PM to 24 hurs format

        if (rb_date != "") {
            // var rb_date = request.body.rb_date;
            console.log("Reminder Blast Date displayed");
            console.log(rb_date);
            console.log("RB time" + rb_time);

            var validTime = rb_time.match(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/);
            if (!validTime) {

                console.log("In 24 hours Format");
                var rb_time = request.body.rb_time;
                console.log("Else RB Time:" + rb_time);
            }
            else {
                var hrs = Number(rb_time.match(/^(\d+)/)[1]);
                var mnts = Number(rb_time.match(/:(\d+)/)[1]);
                var format = rb_time.match(/\s(.*)$/)[1];
                if (format == "PM" && hrs < 12) hrs = hrs + 12;
                if (format == "AM" && hrs == 12) hrs = hrs - 12;
                var hours = hrs.toString();
                var minutes = mnts.toString();
                if (hrs < 10) hours = "0" + hours;
                if (mnts < 10) minutes = "0" + minutes;
                var rb_time = hours + ":" + minutes + ":00";
                console.log("check Reminder Blast Time during Update]:" + rb_time); //h:i:s
            }

           


        }
        // End code to Convert AM/PM to 24 Hours  




        //start code for convert MG Time AM/PM to 24 hours format
        if (mg_date != "") {
            // var rb_date = request.body.rb_date;
            console.log("Make Good Date displayed");
            console.log(mg_date);
            console.log("mg_date time" + mg_time);

            var validTime = mg_time.match(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/);
            if (!validTime) {

                console.log("In 24 hours Format");
                var mg_time = request.body.mg_time;
                console.log("Else MG Time:" + mg_time);
            }
            else {
                var hrs = Number(mg_time.match(/^(\d+)/)[1]);
                var mnts = Number(mg_time.match(/:(\d+)/)[1]);
                var format = mg_time.match(/\s(.*)$/)[1];
                if (format == "PM" && hrs < 12) hrs = hrs + 12;
                if (format == "AM" && hrs == 12) hrs = hrs - 12;
                var hours = hrs.toString();
                var minutes = mnts.toString();
                if (hrs < 10) hours = "0" + hours;
                if (mnts < 10) minutes = "0" + minutes;
                var mg_time = hours + ":" + minutes + ":00";
                console.log("check Make Good Time during Update]:" + mg_time); //h:i:s
            }

           


        }
        // End code to Convert AM/PM to 24 Hours  




             //start code for convert RB MG Time AM/PM to 24 hours format
             if (rb_mg_date != "") {
                // var rb_date = request.body.rb_date;
                console.log("RB Make Good Date displayed");
                console.log(rb_mg_date);
                console.log("rb_mg_date time" + rb_mg_date);
    
                var validTime = rb_mg_time.match(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/);
                if (!validTime) {
    
                    console.log("In 24 hours Format");
                    var rb_mg_time = request.body.rb_mg_time;
                    console.log("Else RB MG Time:" + rb_mg_time);
                }
                else {
                    var hrs = Number(rb_mg_time.match(/^(\d+)/)[1]);
                    var mnts = Number(rb_mg_time.match(/:(\d+)/)[1]);
                    var format = rb_mg_time.match(/\s(.*)$/)[1];
                    if (format == "PM" && hrs < 12) hrs = hrs + 12;
                    if (format == "AM" && hrs == 12) hrs = hrs - 12;
                    var hours = hrs.toString();
                    var minutes = mnts.toString();
                    if (hrs < 10) hours = "0" + hours;
                    if (mnts < 10) minutes = "0" + minutes;
                    var rb_mg_time = hours + ":" + minutes + ":00";
                    console.log("check RB Make Good Time during Update]:" + rb_mg_time); //h:i:s
                }
    
               
    
    
            }
            // End code to Convert RB MG AM/PM to 24 Hours  

            




        console.log("check tact above if:" + tact);
        if (tact === "webinar") {
            console.log("If tact is webinar");
            var tact = request.body.tact1122;
            var cnamewebinar = request.body.cnamewebinar;
            var webcamp_name = request.body.webcamp_name;
            var webcamp_from = request.body.webcamp_from;
            var webinar_count = request.body.webinar_count;
            var webpriority = request.body.webpriority;
            var webblsttype = request.body.webblsttype;
            var weballocated_to = request.body.weballocated_to;
            var registration_link = request.body.registration_link;
            var registration_date = request.body.registration_date;
            var registration_time = request.body.registration_time;
        //    var webcomment = request.body.webcomment;
            console.log("Web Priority:" + webpriority);
            var query = `
    UPDATE addtask 
    SET cname = "${cnamewebinar}", 
    camp_name = "${webcamp_name}", 
    camp_from = "${webcamp_from}", 
    blast_count = "${webinar_count}", 
    priority = "${webpriority}",
    blast_type = "${webblsttype}",
    allocated_to = "${weballocated_to}",
    asset_link = "${registration_link}",
    blast_date = "${registration_date}",
    blast_time = "${registration_time}",
    tact = "${tact}"
    
    WHERE id = "${id}"
    `;

            console.log("Update Query" + query);
            console.log(query);
            database.query(query, function (error, data) {
                response.json({
                    message: 'Data Edited'
                });
            });

        }

        else {


            if (rb_assetname != "" && rb_asset_link != "") {
                var rb_type = "Reminder-Blast";
                var query = `
        UPDATE addtask 
        SET cname = "${cname}", 
        camp_name = "${camp_name}", 
        camp_from = "${camp_from}", 
        blast_count = "${blast_count}", 
        asset_name = "${asset_name}" ,
        asset_link = "${asset_link}",
        rb_type = "${rb_type}" ,
        rb_assetname = "${rb_assetname}" ,
        rb_assetlink = "${rb_asset_link}",
        rb_date = "${rb_date}" ,
        rb_time = "${rb_time}",
        rballocated_to="${rballocated_to}",
        blast_type = "${blast_type}",
        blast_date = "${blast_date}",
        blast_time = "${blast_time}",
        asset_name = "${asset_name}" ,
        asset_link = "${asset_link}",

        mgallocated_to = "${mgallocated_to}",
        mgasset_name = "${mgasset_name}",
        mgasset_link = "${mgasset_link}",
        mg_date = "${mg_date}",
        mg_time = "${mg_time}",
       
        rb_mgallocated_to = "${rb_mgallocated_to}",
        rb_mgasset_name = "${rb_mgasset_name}",
        rb_mgasset_link = "${rb_mgasset_link}",
        rb_mg_date = "${rb_mg_date}",
        rb_mg_time = "${rb_mg_time}",
        geo = "${geo}",
        mg_geo = "${mg_geo}",
        rb_geo = "${rb_geo}",
        rb_mg_geo = "${rb_mg_geo}",
       
        priority = "${priority}",
        allocated_to = "${allocated_to}"
        WHERE id = "${id}"
        `;

                console.log("Update Query");
                console.log("query for update:",query);
                database.query(query, function (error, data) {
                    response.json({
                        message: 'Data Edited'
                    });
                });
            }


            else {
                var query = `
        UPDATE addtask 
        SET cname = "${cname}", 
        camp_name = "${camp_name}", 
        camp_from = "${camp_from}", 
        blast_count = "${blast_count}", 
        asset_name = "${asset_name}" ,
        asset_link = "${asset_link}",
        rb_type = "${rb_type}" ,
       
        blast_type = "${blast_type}",
        blast_date = "${blast_date}",
        blast_time = "${blast_time}",
       

        mgallocated_to = "${mgallocated_to}",
        mgasset_name = "${mgasset_name}",
        mgasset_link = "${mgasset_link}",
        mg_date = "${mg_date}",
        mg_time = "${mg_time}",


        rb_mgallocated_to = "${rb_mgallocated_to}",
        rb_mgasset_name = "${rb_mgasset_name}",
        rb_mgasset_link = "${rb_mgasset_link}",
        rb_mg_date = "${rb_mg_date}",
        rb_mg_time = "${rb_mg_time}",
        geo = "${geo}",
        mg_geo = "${mg_geo}",
        rb_geo = "${rb_geo}",
        rb_mg_geo="${rb_mg_geo}",

       
        priority = "${priority}",
        allocated_to = "${allocated_to}"
        WHERE id = "${id}"
        `;

                console.log("Update Query in else condition",query);


                console.log(query);
                database.query(query, function (error, data) {
                    response.json({
                        message: 'Data Edited'
                    });
                });



            }


        }








    }

    if (action == 'delete') {
        var id = request.body.id;

        var query = `DELETE FROM addtask WHERE id = "${id}"`;

        database.query(query, function (error, data) {

            response.json({
                message: 'Data Deleted'
            });

        });
    }




    //start code for update file


    // if(action == 'replacefile')
    // {
    //     console.log("REplace file function");
    //     var filereplace = request.body.filereplace;
    //     var filenumber = request.body.filenumber;
    //     var filename = request.body.filename;
    //     var campid = request.body.campid;

    //     console.log("Filereplace:" +filereplace);
    //     console.log("filename:" +filename);
    //     console.log("campid:" +campid);
    //     console.log("filenumber:" +filenumber);
    // }

    //End code for update file



});





router.post("/test", (req, res) => { // =>  image upload code start
    console.log('test port');
    res.send("this is custom route to post");
})






var storage = multer.diskStorage({
    destination: (req, files, callBack) => {
        console.log("✔😃 IN MULTER DISK STORAGE");
        var campid = req.body.camp_id;
        var tact = req.body.tact;
        console.log("within storage:" + campid);
        console.log("check tact :" + tact);
        //start code for create new directory


        var fs = require('fs');
        //var dir = './tmp';

        var dir1 = `./files/${campid}`;
        if (!fs.existsSync(dir1)) {
            fs.mkdirSync(dir1);
            console.log("First Camp ID directory created successfully......");
        }


        var dir2 = `./files/${campid}/Admin`;



        if (!fs.existsSync(dir2)) {
            fs.mkdirSync(dir2);
            console.log("Admin folder created");

        }



        if (tact === "Email-Blast") {
            var dir3 = `./files/${campid}/Admin/Email-Blast`;

            if (!fs.existsSync(dir3)) {
                fs.mkdirSync(dir3);
                console.log("Email Blast folder created....");

            }
        }

        else if (tact === "Make-Good") {
            var dir3 = `./files/${campid}/Admin/Make-Good`;
            console.log("check Make-Good");

            if (!fs.existsSync(dir3)) {
                fs.mkdirSync(dir3);
                console.log("Make-Good folder created....");

            }
        }



        else if (tact === "Email-Reminder-Blast") {
            var dir3 = `./files/${campid}/Admin/Email-Reminder-Blast`;
            console.log("check Email-Reminder-Blast tact");

            if (!fs.existsSync(dir3)) {
                fs.mkdirSync(dir3);
                console.log("Reminder Blast folder created....");

            }
        }


        else if (tact === "RB-Make-Good") {
            var dir3 = `./files/${campid}/Admin/RB-Make-Good`;
            console.log("check RB-Make-Good");

            if (!fs.existsSync(dir3)) {
                fs.mkdirSync(dir3);
                console.log("RB-Make-Good folder created....");

            }
        }






        else if (tact === "Webinar") {
            var dir3 = `./files/${campid}/Admin/Webinar`;

            if (!fs.existsSync(dir3)) {
                fs.mkdirSync(dir3);
                console.log("Webinar Blast folder created....");

            }
        }

        console.log("Dir3 is:" + dir3);






        //     var dir3=`./files/${campid}/Admin/${tact}`;
        // console.log("Directory is:" +dir3);
        //     console.log("Directory already existed......");



        console.log("Dir 3 is out of if else:" + dir3);

        callBack(null, `./${dir3}`) // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        // callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        callBack(null, file.originalname)
        // }
    }
})

var upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    //   },
});



router.post("/admin_comment",upload.any('admin_files'), (request, response) => {

    var comment = request.body.comment;
    console.log("within admn comment js" + comment);

    var camp_id = request.body.camp_id;
    var tact = request.body.tact;
    console.log("tact" + tact);


   


    if (camp_id != "") {
        console.log('inside 1');
        var selectQuery = `select * from comment_tbl where camp_id = '${camp_id}'`; // verifying code id either exist or not //
        console.log(selectQuery);
        database.query(selectQuery, function (err, data) {
            if (err) {
                response.json({
                    success: false,
                    message: 'errror'
                })
                console.log(err)
            } else {
                
                
                
                
                
                console.log('inside 2');
                if (data.length > 0) {
                    console.log('inside 2 update');
                    // console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                    console.log("type of " + typeof uploadFiles);
                    console.log("check tact in route js:" + tact);
                    if (tact == "Email-Reminder-Blast") {
                        console.log("in if condition");
                        var updateSql = `UPDATE comment_tbl SET  rb_comment='${comment}' WHERE camp_id = '${camp_id.trim()}'`;
                        console.log("tact is eb/rb:" + updateSql);

                    }


                    else if (tact == "Make-Good") {
                        console.log("Make-Good in if condition");
                        var updateSql = `UPDATE comment_tbl SET  admin_ebmgcmt='${comment}' WHERE camp_id = '${camp_id.trim()}'`;
                        console.log("tact is Make-Good:" + updateSql);

                    }

                    else if (tact == "RB-Make-Good") {
                        console.log("RB-Make-Good in if condition");
                        var updateSql = `UPDATE comment_tbl SET  admin_rbmgcmt='${comment}' WHERE camp_id = '${camp_id.trim()}'`;
                        console.log("tact is RB-Make-Good:" + updateSql);

                    }


                    else {
                        console.log("in else condition");
                        var updateSql = `UPDATE comment_tbl SET  comment='${comment}' WHERE camp_id = '${camp_id.trim()}'`;

                    }

                    console.log("Update query" + updateSql);
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
                            message: 'Record Updated Successfully...'
                        });





                    })
                }

                else {
                    console.log('inside 1 else');
                    if (tact == "Email-Reminder-Blast") {
                        console.log("in if condition tact is Email-Reminder-Blast");
                        //var updateSql = `UPDATE comment_tbl SET  rb_comment='${comment}', admin_rb_file = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;

                        var sqlQry = `INSERT INTO comment_tbl (camp_id,rb_comment) VALUES (${camp_id},  '${comment}')`; // insert query //
                        console.log("tact is eb/rb:" + sqlQry);

                        

                    }


                    else if (tact == "Make-Good") {
                        console.log("in if condition tact is Make-Good");
                        //var updateSql = `UPDATE comment_tbl SET  rb_comment='${comment}', admin_rb_file = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;

                        var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_ebmgcmt) VALUES (${camp_id},  '${comment}')`; // insert query //
                        console.log("tact is eb/rb:" + sqlQry);

                        

                    }



                    else if (tact == "RB-Make-Good") {
                        console.log("in if condition tact is RB-Make-Good");
                        //var updateSql = `UPDATE comment_tbl SET  rb_comment='${comment}', admin_rb_file = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;

                        var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_rbmgcmt) VALUES (${camp_id},  '${comment}')`; // insert query //
                        console.log("tact is eb/rb:" + sqlQry);

                        

                    }


                    else{

   //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                    var sqlQry = `INSERT INTO comment_tbl (camp_id,comment) VALUES (${camp_id},  '${comment}')`; // insert query //
                    console.log("insert query" + sqlQry);

                  
                    }

                    database.query(sqlQry, function (err, data) {

                        response.json({
                            success: true,
                            message: 'Comment inserted successfully....'
                        })
                    })
                 
                }

            }
        })

    }
    // }else{
})

//End code for insert image





//Start code for update image



//start code for insert image if no data available



router.post("/admin_imginsert", upload.any('admin_files'), (request, response) => {
    console.log("✔😃 IN /admin_imginsert");
   
    var camp_id = request.body.camp_id;
    var tact = request.body.tact;
    console.log("tact in admin img insert" + tact);


    var uploadFiles = request.files;


   // var admin_files = request.files.admin_files;
    const imagePath = request.files.filename;

    //console.log(imagePath);
    console.log("image+image" + imagePath);
    console.log("hello hello")

   


    var filenames = uploadFiles.map(item => item.filename);
    var combinedFilenames = filenames.join(',');
    console.log(combinedFilenames);


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
                    console.log("type of " + typeof uploadFiles);
                    console.log("check tact in route js:" + tact);
                    if (tact == "Email-Reminder-Blast") {
                        console.log("in if condition");
                        var updateSql = `UPDATE comment_tbl SET  admin_rb_file = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;
                        console.log("tact is eb/rb:" + updateSql);

                    }

                   else if (tact == "Make-Good") {
                        console.log("in if condition");
                        var updateSql = `UPDATE comment_tbl SET  admin_ebmgfiles = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;
                        console.log("tact is Make-Good:" + updateSql);

                    }
                    else if (tact == "RB-Make-Good") {
                        console.log("in if condition");
                        var updateSql = `UPDATE comment_tbl SET  admin_rbmgfiles = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;
                        console.log("tact is RB-Make-Good:" + updateSql);

                    }

                    else {
                        console.log("in else condition");
                        var updateSql = `UPDATE comment_tbl SET   admin_files = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;

                    }

                    console.log("Update query" + updateSql);
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
                            message: 'File Updated Successfully...'
                        });





                    })
                }

                else {
                    console.log('inside 1 else');
                    if (tact == "Email-Reminder-Blast") {
                        console.log("in if condition tact is Email-Reminder-Blast");
                        //var updateSql = `UPDATE comment_tbl SET  rb_comment='${comment}', admin_rb_file = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;

                        var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_rb_file) VALUES (${camp_id}, '${combinedFilenames}')`; // insert query //


                        console.log("tact is eb/rb:" + sqlQry);

                        

                    }

                   else if (tact == "Make-Good") {
                        console.log("in if condition tact is Make-Good");
                        //var updateSql = `UPDATE comment_tbl SET  rb_comment='${comment}', admin_rb_file = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;

                        var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_ebmgfiles) VALUES (${camp_id}, '${combinedFilenames}')`; // insert query //


                        console.log("tact is admin_ebmgfiles:" + sqlQry);

                        

                    }

                    else if (tact == "RB-Make-Good") {
                        console.log("in if condition tact is RB-Make-Good");
                        //var updateSql = `UPDATE comment_tbl SET  rb_comment='${comment}', admin_rb_file = '${combinedFilenames}' WHERE camp_id = '${camp_id.trim()}'`;

                        var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_rbmgfiles) VALUES (${camp_id}, '${combinedFilenames}')`; // insert query //


                        console.log("tact is admin_rbmgfiles:" + sqlQry);

                        

                    }



                    else{

   //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));
                    var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_files) VALUES (${camp_id}, '${combinedFilenames}')`; // insert query //
                    console.log("insert query" + sqlQry);

                  
                    }

                    database.query(sqlQry, function (err, data) {

                        response.json({
                            success: true,
                            message: 'Files Inserted Successfully.. '
                        })
                    })
                 
                }

            }
        })

    }
    // }else{
})

//End code for insert image


//end code for insert image if no data available



// replace code //


router.post('/admin_comment2', upload.single('admin_files'), (request, response) => {

    // const newfile = request.file.filename;
    // console.log("updatedfile:" + newfile);



    console.log("within admn comment js");

   



    var tact = request.body.tact;

    console.log("tact in route file:" + tact);
    var filenum = request.body.filenum;
    var oldfname = request.body.oldfname;
    console.log("oldfname" + oldfname);
    console.log("filenum" + filenum);

    var camp_id = request.body.camp_id;
    console.log("camp_id" + camp_id);




    

  
  //start code for delete file from folder
  
  var admin_files = oldfname;
  if (tact === "Email-Blast") {
    var tactfolder = "Email-Blast";
  }

  else if (tact === "Email-Reminder-Blast") {
    var tactfolder = "Email-Reminder-Blast";
  }


  else if (tact === "Make-Good") {
    var tactfolder = "Make-Good";
  }


  else if (tact === "RB-Make-Good") {
    var tactfolder = "RB-Make-Good";
  }

  else if (tact === "Webinar") {
    var tactfolder = "Webinar";
  }

  
    var url = "./files/" + camp_id + "/Admin/" + tactfolder + "/" + admin_files;
    console.log("URL:" + url);
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
  
 // return;
  //End code for delete file from folder




    // if (comment == 'sendComment') {  




    if (camp_id != "") {
        console.log('inside 1');
        var selectQuery = `select * from comment_tbl where camp_id = '${camp_id}'`; // verifying code id either exist or not //
        console.log(selectQuery);



        database.query(selectQuery, function (err, data) {
            console.log("within first condition");

            data.forEach(function (row) {

                console.log("within second condition delete");
                console.log("within admin_files");
                console.log("check tact is" +tact);

                var camp_id = row.camp_id;
               if (tact === "Email-Reminder-Blast") {
                    var admin_files = row.admin_rb_file;
                    console.log("Email-Reminder-Blast is:" +tact);

                }
                else if (tact === "Make-Good") {
                    var admin_files = row.admin_ebmgfiles;
                    console.log(" Make-Good tact is:" +tact);

                }
                else if (tact === "RB-Make-Good") {
                    var admin_files = row.admin_rbmgfiles;
                    console.log("RB-Make-Good is:" +tact);

                }

                else {
                    var admin_files = row.admin_files;
                    console.log("else tact is:" +tact);
                }


console.log("admin_files" +admin_files)
                const myArray =  new Array(admin_files);

               // if(myArray=="")
              //  {
              //      var output = "";
               // }
              //  else{

                    var output = admin_files.split(',');
                    console.log("Array:" + output[filenum]);
                    var deletefile=output[filenum]
    
                    console.log("deletefile Array:" + filenum);
    
                    const x = output.splice(filenum,1);
                    
                    console.log(`output values: ${output}`);
                    console.log(`variable x value: ${x}`);
             //   }

                
               
                




                console.log("camp_id" + camp_id);
                console.log("admin_files" + admin_files);

              const admin_files1 = new Array(admin_files);
              console.log("admin_files1" +admin_files1);
             
            


            


               


                //admin_files.remove(output[filenum]);

           //  delete admin_files[0];
           




               


             
                // Replace the item at the found index

                // if(filenum > 4)
                // {

                //     var newfile="";
                // }
                // else{

                //      var newfile="";
                // }

              


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

                        console.log("check tact:" + tact);

                        console.log("Output check:" + output);
                        // console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));

                        if (tact === "Email-Reminder-Blast") {
                            var updateSql = `UPDATE comment_tbl SET admin_rb_file='${output}' WHERE camp_id = '${camp_id}'`;

                        }

                       else if (tact === "Make-Good") {
                            var updateSql = `UPDATE comment_tbl SET admin_ebmgfiles='${output}' WHERE camp_id = '${camp_id}'`;

                        }


                        else if (tact === "RB-Make-Good") {
                            var updateSql = `UPDATE comment_tbl SET admin_rbmgfiles='${output}' WHERE camp_id = '${camp_id}'`;

                        }


                        else {
                            var updateSql = `UPDATE comment_tbl SET admin_files='${output}' WHERE camp_id = '${camp_id}'`;
                        }


                        console.log("Update query" + updateSql);
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
                                    message: 'Files Deleted Successfully.. '
                                })
                            }


                        })
                    } else {
                        console.log('inside 1 else');

                        //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));

                        if (tact = "Email-Reminder-Blast") {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_rb_file) VALUES (${camp_id}, '${output}')`; // insert query //
                        }

                        else if (tact = "Make-Good") {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_ebmgfiles) VALUES (${camp_id}, '${output}')`; // insert query //
                        }


                        else if (tact = "RB-Make-Good") {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_rbmgfiles) VALUES (${camp_id}, '${output}')`; // insert query //
                        }


                        else {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_files) VALUES (${camp_id}, '${output}')`; // insert query //
                        }

                        console.log("insert query" + sqlQry);

                        database.query(sqlQry, function (err, data) {

                            response.json({
                                success: true,
                                message: 'Files Deleted Successfully.. '
                            })
                        })
                    }

                }

            })
        })

    }
    // }else{





})



//End code for update image




//start code for insert new image

router.post("/fileinsert", upload.any('admin_files'), (request, response) => {

 
    var camp_id = request.body.camp_id;
    var tact = request.body.tact;
    console.log("tact" + tact);


    var uploadFiles = request.files;


    var admin_files = request.files.admin_files;
    const imagePath = request.files.filename;

    //console.log(imagePath);
    console.log("image+image" + imagePath);
    console.log("hello hello")

    console.log("admin_files:" + admin_files);
    // if (comment == 'sendComment') {  


    var filenames = uploadFiles.map(item => item.filename);
    var combinedFilenames = filenames.join(',');
    console.log(combinedFilenames);


    if (camp_id != "") {
        console.log('inside 1');
        var selectQuery = `select * from comment_tbl where camp_id = '${camp_id}'`; // verifying code id either exist or not //
        console.log(selectQuery);
      database.query(selectQuery, function (err, data) {
            console.log("within first condition");
            data.forEach(function (row) {

                console.log("within second condition file insert");

                var camp_id = row.camp_id;

                if (tact === "Email-Reminder-Blast") {
                    var admin_files = row.admin_rb_file;

                }

                else if (tact === "Make-Good") {
                    var admin_files = row.admin_ebmgfiles;

                }
                else if (tact === "RB-Make-Good") {
                    var admin_files = row.admin_rbmgfiles;

                }


                else {
                    var admin_files = row.admin_files;
                }



                console.log("camp_id" + camp_id);
                console.log("admin_files" + admin_files);

                //  const admin_files1 = new Array(admin_files);
                if(admin_files=="")
                {
                    var output = combinedFilenames;
                    console.log("If Admin file is empty output:" + output);
                }

                else{
                    var output = admin_files+','+combinedFilenames;
                    console.log("Else Admin files not empty output:" + output);
                }
               
               

                


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

                        console.log("check tact:" + tact);

                        console.log("Output check:" + output);
                        // console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));

                        if (tact === "Email-Reminder-Blast") {
                            var updateSql = `UPDATE comment_tbl SET admin_rb_file='${output}' WHERE camp_id = '${camp_id}'`;

                        }

                        else if (tact === "Make-Good") {
                            var updateSql = `UPDATE comment_tbl SET admin_ebmgfiles='${output}' WHERE camp_id = '${camp_id}'`;

                        }


                       else if (tact === "RB-Make-Good") {
                            var updateSql = `UPDATE comment_tbl SET admin_rbmgfiles='${output}' WHERE camp_id = '${camp_id}'`;

                        }



                        else {
                            var updateSql = `UPDATE comment_tbl SET admin_files='${output}' WHERE camp_id = '${camp_id}'`;
                        }


                        console.log("Update query" + updateSql);
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

                        //   console.log(Object.keys(imagePath).map(function(k){return imagePath[k]}).join(","));

                        if (tact = "Email-Reminder-Blast") {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_rb_file) VALUES (${camp_id}, '${output}')`; // insert query //
                        }

                        else if (tact = "Make-Good") {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_ebmgfiles) VALUES (${camp_id}, '${output}')`; // insert query //
                        }


                        else if (tact = "RB-Make-Good") {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_rbmgfiles	) VALUES (${camp_id}, '${output}')`; // insert query //
                        }

                        else {
                            var sqlQry = `INSERT INTO comment_tbl (camp_id,admin_files) VALUES (${camp_id}, '${output}')`; // insert query //
                        }

                        console.log("insert query" + sqlQry);

                        database.query(sqlQry, function (err, data) {

                            response.json({
                                success: true,
                                message: 'File inserted successfully....'
                            })
                        })
                    }

                }

            })
        })

    }
    // }else{
})



//end code for inser new image

// router.post("/admin_comment", upload.single('admin_files'),(request, response) => {



//     var admin_files = request.body.admin_files;
//     const imagePath = request.file.filename;
//     console.log(imagePath);
//     console.log("image+image" + admin_files);
//     console.log("hello hello")

//         var camp_id = request.body.camp_id;

//         console.log("image admin_files " + admin_files)
//         console.log("Campaign ID:"+camp_id);


//                 var sqlQry = `INSERT INTO files_tbl (camp_id,admin_files) VALUES (${camp_id}, '${imagePath}')`; // insert query //
//                 console.log(sqlQry);
//                 database.query(sqlQry, function (err, data) {

//                     if (!data) {
//                         response.json({
//                             success: true,
//                             message: 'File Uploaded.. '
//                         })
//                     } else {
//                         response.json({
//                             success: false,
//                             message: 'File Not Uploaded.. '
//                         })

//                     }
//                 });

// });

module.exports = router;



