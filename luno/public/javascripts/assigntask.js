$(document).ready(function () { // for fetch Data //

    //     load_data();

    // function load_data() {

    var dataTable = $('#table_data').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        'ajax': {
            'url': 'http://localhost:3000/assigntask/get_data',

        },


        'columns': [
            { data: 'tact', },
            { data: 'camp_name', },
            { data: 'eblast_date', },
            { data: 'rblast_date', },

            { data: 'ebfname' },
            { data: 'status' },
            { data: 'id' }


        ],
        "aaSorting": [[1, "desc"]],
        columnDefs: [
            {
                targets: 6,
                orderable: false,
                render: function (data, type, row, meta) {


                    console.log("Datatable");
                    console.log("ID" + row.id);
                    console.log("blast_type" + row.blast_type);
                    alert(row.tact)
                    
//    alert(row.rb_assetlink) alert(row)
                    var mg_status = row.mg_status;
                   console.log("row.status ✨🎊🎃🧧🎁"+row.rb_status)
                    var rowId = row.id;
                    var rb_mg = row.rb_mg_link;
                    var mg_link = row.mg_link;
                    var mg_image = row.image;
                    console.log(row.mg_link);
                    console.log(row.image)
                    dt1 = new Date(row.tdte_time);
                 
                    console.log("dt1=>" + dt1)
                    var dt2 = row.eblast_date;
                    console.log("dt2=>" + dt2)
                    dt3 = new Date(row.reblast_datetime);
                     var status =  row.satus;
                     console.log("status me =>"+status)
                   
                    allocated_to = row.allocated_to;
                    rballocated_to = row.rballocated_to;
                    user_id = row.user_id;
                    var tact = row.tact;
                    console.log("tact value is:" + tact);

                    if (row.tact === "Email Blast") {

                        console.log("Email Blast nrew" + row.tact);
                        var tact = "Email-Blast";

                    } else {
                        console.log("we are not in blast condtion..")
                    }


                    // code for make good //

                    if (row.tact == "Make-Good") {
                        var tact = "Make_Good"
                    }



                    //end code for make good //

                    if (row.tact === "RB-Make-Good") {
                        var tact = "RB-Make-Good"
                    }


                    if (row.tact === "Email Blast / Reminder Blast") {
                        var tact = "Email-Reminder-Blast";
                    }




                    if (row.tact === "Email Blast / Reminder Blast")

                    {

                        tact = "Email-Reminder-Blast";
                    }




                    if (row.tact === "Webinar") {

                        console.log("Webinar Blast");
                        tact = "Webinar";
                    }


                    if ((row.camp_id !== "" || row.mg_status !== "" || row.rb_mg_status !== "")  || (row.tact == "Email Blast / Reminder Blast" && row.user_rbfiles == "" || (row.user_rbfiles == "undefined")) || (row.tact == "Email Blast" && (row.user_ebfiles == "" || (row.user_ebfiles === "undefined"))) || (row.tact == "Webinar" && (row.webinar_files == "" || (row.webinar_files === "") || (mgasset_link == "") || (mg_asset_name == "") || (row.rb_mgasset_link == "") || (row.rb_mgasset_name == "") || ))) 
                    {
                     
                          return ` 
                           
                          ${(row.status == 1 && ) ? `<span class="bg-primary text-light px-1 rounded small" data-bs-toggle="tooltip" title="${tact}">EB done</span>` : (row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm  myStatusCheckbox"  data-bs-toggle="tooltip" data-bs-placement="top" title="${row.tact}" data-rowid='${meta.row}' data-id="${data}" onclick = checkboxClick(this)></button>`:` `} 
           
                          
                          ${(row.mg_status == 1 &&  row.mg_asset_name !== "" && row.mg_link !== "" ) ? `<span class="bg-info text-light px-1 rounded small">Mk Done</span>` : (row.mg_status == 0 && row.mg_asset_name == "" && row.mg_link == "") ?`<input type="checkbox" class="btn btn-link btn-sm  myMakeGoodStatusCheckbox"  data-bs-toggle="tooltip" data-bs-placement="top" name = checkbox title="${row.tact}" data-rowid='${meta.row}' data-id="${data}" onclick = MakeGoodcheckboxClick(this)></button>`:` `} 

 
                          ${(row.rbstatus == 1 && row.rb_assetname !== "" &&  row.rb_assetlink !== "") ? `<span class="bg-success text-light px-1 rounded small">Rb Done</span>` : (row.rbstatus == 0 && row.rb_assetname == "" && row.rb_assetlink == "") ?`<input type="checkbox" class="btn btn-link btn-sm  rbStatusCheckbox"  data-bs-toggle="tooltip" data-bs-placement="top" name = checkbox title="${row.tact}" data-rowid='${meta.row}' data-id="${data}" onclick = rbCheckboxClick(this)></button>`:` `} 
                   

                          ${(row.rb_mg_status == 1 && row.tact == "RB-Make-Good" && row.rb_mg_link !== "" &&  row.rb_mgasset_name !== "") ? `<span class="bg-danger text-light px-1 rounded small">RB MG Done</span>` : (row.rb_mg_status == 0  && row.rb_mg_link == "" &&  row.rb_mgasset_name == "" ) ?`<input type="checkbox" class="btn btn-link btn-sm  rbMgStatusCheckbox"  data-bs-toggle="tooltip" data-bs-placement="top" name = checkbox title="${row.tact}" data-rowid='${meta.row}' data-id="${data}" onclick = rbMgCheckboxClick(this)></button>`:` `} 
                   

                            <button type="button" hidden class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"  data-id =" `+ row.id + ' ' + row.blast_type + ` "><i class="fa fa-trash"></i></button>
                            
                            
                            <button type="button" hidden class="btn btn-link btn-sm edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  data-id =" `+ row.id + ' ' + row.blast_type + ` "><i class="fa fa-pencil"></i></button>

                            <button type="button" class="btn btn-link btn-sm view1" data-bs-toggle="tooltip" data-bs-placement="top" title="View"  data-id =" `+ row.id + ' ' + row.blast_type + ' ' + row.tact +` "><i class="fa fa-eye"></i></button>

               
                  
                          `;
                    }    
                }
            }


        ]


    });


    $('#add_data').click(function () { // for insert the Data //

        $('#dynamic_modal_title').text('Add Data');

        $('#sample_form')[0].reset();

        $('#action').val('Add');

        $('#action_button').text('Add');

        $('#action_modal').modal('show');

    });

    $('#sample_form').on('submit', function (event) {

        event.preventDefault();

        $.ajax({
            url: "http://localhost:3000/assigntask/action",
            method: "POST",
            data: $('#sample_form').serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $('#action_button').attr('disabled', 'disabled');
            },
            success: function (data) {

                $('#action_button').attr('disabled', false);
                $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

                $('#table_data').DataTable().ajax.reload();
                $('#action_modal').modal('hide');



                setTimeout(function () {
                    $('#message').html('');
                }, 1000);

            }
        });

    });


    $(document).on('click', '.edit', function () { // for edit data //
        $("#editdataa").show();
        var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var blast_type = myArray[2];








        $('#dynamic_modal_title').text('Edit Data');

        $('#action').val('Edit');

        $('#action_button').text('Edit');

        $('#action_modal').modal('show');

        var action = $("#action").val();
        console.log("Edit action Rajashri");
        console.log(action);
        if (action === "Edit") {
            console.log("If Edit condition is true");
            $("#viewdata11").hide();
            $("#editdataa").show();

        }
        $.ajax({
            url: "http://localhost:3000/assigntask/action",
            method: "POST",
            data: {
                id: id,
                blast_type: blast_type,
                action: 'fetch_single'
            },
            dataType: "JSON",
            success: function (data) {
                if (blast_type == "Reminder-Blast") {
                    alert("Reminder Blast");

                    $('#camp_id').val(data.camp_name);
                    $('#blst_type').val(data.blast_type);
                    $('#user_id').val(data.user_id);
                    $('#id').val(data.id);
                    $('#table_data').DataTable().ajax.reload();
                }else {
                    alert("E - Blast");
                    $('#camp_id').val(data.camp_name);
                    $('#blst_type').val(data.blast_type);
                    $('#user_id').val(data.user_id);
                    $('#id').val(data.id);
                    $('#table_data').DataTable().ajax.reload();

                }


            }
        });

    });


    $('#view_data').click(function () {


        $('#dynamic_modal_title').text('View Data');

        $('#action').val('view1');

        $('#action_button').text('view1').hide();

        $('#action_modal').modal('show');

    });


    $(document).on('click', '.view1', function () {



        var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var blast_type = myArray[2];
        var tact = myArray[3];

        console.log("Check Tact:" + tact);
        console.log("ID:" + id);
        console.log("Blast Type:" + blast_type);


        $('#dynamic_modal_title').text('View Data');

        $('#action').val('view1');

        $('#action_button').text('View').hide();
        // $("#action_button").css("display","none");
        $('#action_modal').modal('show');



        var action = $("#action").val();
        console.log("View1 action Rajashri");
        console.log(action);
        if(tact === "webinar")
        {
            console.log("Webinar Tact");
            $("#webinarasset").show();  
            $("#rbasset").hide();
            $("#ebasset").hide();
            $('#sender_nameview')[0].hide = false;
        }
        if (action === "view1") {
            console.log("If View condition is true");
            $("#viewdata11").show();
            $("#editdataa").hide();

        }

        if (blast_type === "Reminder-Blast") {

            $("#rbasset").show();
            $("#ebasset").hide();

        }

        else if (blast_type === "E-blast") {

            $("#rbasset").hide();
            $("#ebasset").show();

        }
        else {

        }

        $.ajax({
            url: "http://localhost:3000/assigntask/action",
            method: "POST",
            data: { id: id, blast_type: blast_type,tact: tact, action: 'fetch_single_view' },

            dataType: "JSON",
            success: function (data) {
                console.log("Allocated TO EB:" + data.allocated_to);
                console.log("RB Allocated To RB:" + data.rballocated_to);
                if (data.allocated_to === data.rballocated_to) {
                   // console.log("Allocated to and rb allocated to are same");
                    $("#rbasset").show();
                    $("#ebasset").show();
                }
                else {
                  //  $("#rbasset").show();
                    
                }

                $('#cnameview').val(data.client_name);
                $('#camp_nameview').val(data.camp_name);
                $('#camp_fromview').val(data.camp_from);
                $('#blast_countview').val(data.blast_count);
                $('#commentview').val(data.comment);
                // $('#asset_name').val(data.asset_name);
                // $('#asset_link').val(data.asset_link);
                $('#rbfname').val(data.first_name);
                $('#rb_type').val(data.rb_type);
                $('#rb_assetnameview').val(data.rb_assetname);
                $('#rb_asset_linkview').val(data.rb_assetlink);
                $('#rb_dateview').val(data.rb_date);
                $('#rb_timeview').val(data.rb_time);
                $('#ebasset_nameview').val(data.asset_name);
                $('#ebasset_linkview').val(data.asset_link);
                $('#sender_nameview').val(data.sender_name);
                $('#sender_emailview').val(data.sender_email);
                $('#tactview').val(data.tact);
                $('#blast_typeview').val(data.blast_type);
                // $('#blast_date').val(data.blast_date);
                // $('#blast_time').val(data.blast_time);
                $('#blast_date1view').val(data.blast_date);
                $('#blast_time1view').val(data.blast_time);

                $('#priorityview').val(data.priority);
                $('#webinar_allocated').val(data.first_name);
                $('#tactviewwebinar').val(data.tact);
                $('#registration_linkview').val(data.asset_link);
                $('#registration_date').val(data.blast_date);
                $('#registration_time1view').val(data.blast_time);
                $('#id').val(data.id);

                setTimeout(function () {
                    $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
                    $('#message').html('');
                }, 5000);

            }
        });


    });



    $(document).on('click', '.delete', function () {
        var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var blast_type = myArray[2];


        if (confirm("Are you sure you want to delete this data?")) {
            $.ajax({
                url: "http://localhost:3000/assigntask/action",
                method: "POST",
                data: { action: 'delete', id: id, blast_type: blast_type },
                dataType: "JSON",
                success: function (data) {
                    $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();
                    $('#table_data').DataTable().ajax.reload();

                    setTimeout(function () {
                        $('#message').html('');
                    }, 3000);

                }
            });
        }

    });
});

