



router.get('/get_weeklytaskdata', function(request, response, next){


    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'addtask.id';

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

    database.query("SELECT COUNT(*) AS Total, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS reminder_dt FROM addtask WHERE (blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) || (rb_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) ", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total, CONCAT(  blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS reminder_dt FROM addtask WHERE (blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) || (rb_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) AND 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT *, CONCAT( blast_date ,' | ', blast_time) AS balst_dt, CONCAT( rb_date ,' | ', rb_time) AS reminder_dt FROM addtask WHERE (blast_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) || (rb_date BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY) AND 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;


            



            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'camp_name' : row.camp_name,
                        'blast_date' : row.balst_dt,
                        'tact' : row.tact,
						'id' : row.id
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

