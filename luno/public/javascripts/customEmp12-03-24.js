// This is just a sample script. Paste your real code (javascript or HTML) here.
var dataTable;
$(document).ready(function() { // for fetch Data //

    //     load_data();

    // function load_data() {

    //  var user_id = $("#user_id").val();
    //  alert("")

    dataTable = $('#tdata').DataTable({

        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        'ajax': {
            'url': 'https://staging.webtechstar.com:7777/customEmp/get_data'
        },
        'aaSorting': [],
        'columns': [{
                data: 'camp_name'
            },
            {
                data: 'asset_name'
            },
            {
                data: 'tact'
            },
            //   { data: 'emailBlastComment' },
            //   { data : 'user_id' },
            {
                data: 'id'
            },
            //  { data : 'status' }




        ],

        columnDefs: [{
                targets: 3,
                orderable: false,
                render: function(data, type, row, meta) {


                  var mg_status = row.mg_status;
                  
                    var rowId = row.id;
                    var rb_mg = row.rb_mg_link;
                    var mg_link = row.mg_link;
                    var mg_image = row.image;
                    console.log(row.mg_link);
                    console.log(row.image)
                    dt1 = new Date(row.todaydt);
                    console.log("dt1=>" + dt1)
                    dt2 = new Date(row.eblast_datetime);
                    console.log("dt2=>" + dt2)
                    dt3 = new Date(row.reblast_datetime);
                   
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

                    if (row.tact == "Make Good") {
                        var tact = "Make_Good"
                    }



                    //end code for make good //

                    if (row.tact == "RB Make Good") {
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




                    if ((row.camp_id !== "" || row.mg_status !== "" || row.rb_mg_status !== "")  || (row.tact == "Email Blast / Reminder Blast" && row.user_rbfiles == "" || (row.user_rbfiles == "undefined")) || (row.tact == "Email Blast" && (row.user_ebfiles == "" || (row.user_ebfiles === "undefined"))) || (row.tact == "Webinar" && (row.webinar_files == "" || (row.webinar_files === undefined) || (mgasset_link == "") || (mg_asset_name == "") || (row.rb_mgasset_link == "") || (row.rb_mgasset_name == "")))) 
                    {

                        return `
                       
                     
                       

                        ${(row.allocated_to == row.user_id && row.status == 1 && row.asset_link!="") ? `<span class="bg-dark text-light px-1 rounded small">Blast Done!</span>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 &&  row.asset_name=="" && row.asset_link=="" ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0  &&  row.asset_link!="") ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="${row.tact}" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
         
                        ${(row.rballocated_to == row.user_id && row.rbstatus == 1 && row.rb_assetname != "" && row.rb_assetlink != "") ? `<span class="bg-danger text-light px-1 rounded small">RB Done</span>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 && row.rb_assetname == undefined && row.rb_assetlink == undefined ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0  && row.rb_assetname != "" && row.rb_assetlink != "" ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="${row.tact}" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 


                        ${(row.allocated_to == row.user_id  && dt2 > dt1 && row.mgasset_name!="" && row.mgasset_link!="" && row.mg_status == 0  ) ? `<input type="checkbox" class="btn btn-link btn-sm mg_check" id ="" data-bs-toggle="tooltip" data-bs-placement="top" title="${row.tact}" data-rowid='${meta.row}' data-id="${data}"></button> `:  (row.allocated_to == row.user_id && row.status == 1 && dt2 > dt1 && row.mgasset_name!="" && row.mgasset_link!="" && mg_status == 1 )?`<span class="bg-primary text-light px-1 rounded small mkg_show">MG Done</span></i>`: ``}
                        
                        ${(row.allocated_to == row.user_id &&  dt3 > dt1 && row.rb_mg_status == 0 &&  row.rb_mgasset_name != "" && row.rb_mgasset_link != ""  ) ? `<input type="checkbox" class="btn btn-link btn-sm rb_checkbox" id ="" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>` : (row.allocated_to == row.user_id && row.rb_mg_status == 1 && dt3 > dt1 && row.rb_mgasset_name != "" && row.rb_mgasset_link != ""  )?`<span class="bg-success text-light px-1 rounded small mkg_show">RMG Done</span></i>` : (row.allocated_to == row.user_id && dt3 < dt1 &&  row.rb_mg_status == 0 && row.rb_mgasset_name == undefined && row.rb_mgasset_link == undefined ) ? `<span class="bg-danger text-light px-1 rounded small">MGNA</span>`: `  `}
                       
                        <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view Data"  data-id =" ` + row.id + ' ' + row.user_id + ' ' + tact + ` "><span class="bi bi-eye" style = "font-size:18px"></span></button>
                        
                        <button type="button" style = "display:none;" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" "  data-bs-target="#${tact+""+row.id}" data-id="` + row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `" >

                        <button type="button"  id = "editimage"     class="btn btn-link btn-sm editimage" data-id="` + row.id + ' ' + tact + `"><i class="fa fa-upload"></i></button>

                              <!-- Button trigger modal -->
                              <i class="fa fa-commenting" style="font-size:16px" aria-hidden="true" class="bg-primary" data-bs-toggle="modal" data-bs-target="#${tact}"></i>
                        
                           
                              <!-- Modal -->
                              <div class="modal fade" id="${tact}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                 <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel" style ="color:red;">${tact} Comment Modal</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form id = "sendForm" name = "sendForm" >
                                    <div class="modal-body">
                                 
                                    <textarea class="form-control"  class = "sendComment" name = "sendComment" placeholder = 'Write Comment here...'  data-id="${row.id}" style = "border-radius:0%;"></textarea>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick = "singlecomment(this)" data-tact='${tact}' data-id ='${row.id}'>Send Comment</button>
                                    </div>
                                    </form>
                                 </div>
                              </div>
                              </div>
                           
                              `;
                  
                   


                        
                     }


                  }
               }


            ]
         });




        //else {

           // return `
            // console.log("else")
         
            // ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><span class="bg-success text-light px-1 rounded small">EB Done</span></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 


            // ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<span class="bg-danger text-light px-1 rounded small">RB Done </span>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
      

           
            // ${(row.allocated_to == row.user_id && row.status == 1 && dt2 > dt1 && row.mg_link !==  "" && row.mg_image !==  "" && row.mg_status == 0  ) ? `<input type="checkbox" class="btn btn-link btn-sm mg_check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button> `:  (row.allocated_to == row.user_id && row.status == 1 && dt2 > dt1 && row.mg_link !==  "" && row.mg_image !==  "" && mg_status == 1 )?`<span class="bg-success text-light px-1 rounded small mkg_show">MG Done</span></i>`: $(row.allocated_to == row.user_id  && row.mg_status == 0 && row.status == 1 && row.mg_link ==  "undefine" && row.mg_image == "undefine" ) ? `<span class="bg-danger text-light px-1 rounded small">MGNA</span>`:``}
                  

            // ${(row.allocated_to == row.user_id &&  dt3 > dt1 && row.rb_mg_status == 0 && row.rbstatus == 1 && row.rb_mg_link !==  "" && row.rb_mg_image !==  "" ) ? `<input type="checkbox" class="btn btn-link btn-sm rb_checkbox" id ="" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>` : (row.allocated_to == row.user_id && row.rbstatus == 1 && dt3 > dt1 && row.rb_mg_link !==  "" && row.rb_mg_image !==  "" && row.rb_mg_status == 1 )?`<span class="bg-success text-light px-1 rounded small mkg_show">RMG Done</span></i>` : (row.allocated_to == row.user_id && dt3 < dt1 && row.rbstatus  == 1  && row.rb_mg_status == 0 && row.rb_mg_link ==  "undefine" && row.rb_mg_image == "undefine"  ) ? `<span class="bg-danger text-light px-1 rounded small">MGNA</span>`: `  `}

            // <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="View Data"  data-id =" ` + row.id + ' ' + row.user_id + ' ' + tact + ` "><span class="bi bi-eye" style = "font-size:18px"></span></button>

            // <button type="button" style = "display:none;" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" "  data-bs-target="#${tact+""+row.id}"    data-id="` + row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `" >

            // <button type="button"  id = "editimage"  data-bs-toggle="tooltip" title = "File Upload"    class="btn btn-link btn-sm editimage" data-id="` + row.id + ' ' + tact + `"><i class="fa fa-upload"></i></button>

           
            
            // <!-- Button trigger modal -->
            // <i class="fa fa-commenting" style="font-size:16px" aria-hidden="true" data-bs-toggle="tooltip" title = "Send Commment" class="bg-primary" data-bs-toggle="modal" data-bs-target="#${tact}"></i>
      
         
            // <!-- Modal -->
            // <div class="modal fade" id="${tact}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            // <div class="modal-dialog">
            //    <div class="modal-content">
            //       <div class="modal-header">
            //       <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            //       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            //       </div>
            //       <form id = "sendForm" name = "sendForm" >
            //       <div class="modal-body">
            //       <textarea class="form-control"  class = "sendComment" name = "sendComment" placeholder = 'Write text here...'  data-id="${row.id}"></textarea>
            //       </div>
            //       <div class="modal-footer">
            //       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            //       <button type="button" class="btn btn-primary" onclick = "singlecomment(this)" data-tact='${tact}' data-id ='${row.id}'>Send Comment</button>
            //       </div>
            //       </form>
            //    </div>
            // </div>
            // </div>-->


    $('#add_data').click(function() { // for insert the Data //

        $('#dynamic_modal_title').text('Add Data');
        ``
        $('#sample_form')[0].reset();

        $('#action').val('Add');

        $('#action_button').text('Add');

        $('#action_modal').modal('show');

    });

    //  var isVal = true;
    $('#sample_form').on('submit', function(event) {


        event.preventDefault();


    });



    $(document).on('click', '.view', function() {
        //alert("Edit data");
        //var idtype = $(this).data('id');


        $("#hide_modal").show();
        var idtype = $(this).data('id');


        var btn = document.getElementsByClassName('btnColor').innertext = 'Close';
        if (btn == 'Close') {
            this.style.color = "black";
        } else {
            this.style.color = "blue";
        }



        const myArray = idtype.split(" ");
        var id = myArray[1];
        var user_id = myArray[2];
        var tact = myArray[3];


        $('.readAl').prop('readonly', true);

        if(tact=="RB-Make-Good"){
            // $("#makeGood11").show();
            // $("#makeGood12").show();
            $("#ebmgview").hide();
            $('#__rb_mg_asset_view').show()
            $('#__eb_mg_asset_view').show()
           
            $("#rbmakeGood11").show();
            $("#makeGood12").hide();
        }


        if (tact == "Email-Blast") {
            $('#__rb_mg_asset_view').hide()
            $('#__eb_mg_asset_view').hide()
            $("#ebmgview").hide();
            $("#rbmgview").hide();
          
            $('#__eb_mg_asset_view').hide()
            $("#makeGood11").hide();
            $("#makeGood12").hide();
            $("#rbmakeGood11").hide();
            $("#makeGood12").hide();
         
            $("#MakeGoodView").hide();
            $("#rbFlex").hide()
            $("#eBc").show()
            $("#cf").show()
            $("#sendmail").show()
            $("#sendname").show()
            $("#campname").show()
            $("#user_ebcomment").show()

            $("#fileviewbox").hide()
            $("#webinarFlex").hide()
            $("#ebBlastview").show()
            $('#webinar_files').hide();
            $('#ebasset').show();
            $('#rbasset').hide();
            $('#comment').show();
            $('#comment').show();

        } else if (tact == "Make_Good") {
            
            $("#ebmgview").show();
            $("#rbmgview").hide();
            $("#makeGood11").show();
         $("#MakeGoodView").show();
         $("#rbFlex").hide()
         $("#eBc").show()
         $("#cf").show()
         $("#sendmail").show()
         $("#sendname").show()
         $("#campname").show()
         $("#user_ebcomment").show()

         $("#fileviewbox").hide();
         $("#webinarFlex").hide()
         $("#ebBlastview").show()
         $('#webinar_files').hide();
         $('#ebasset').hide();
         $('#rbasset').hide();
         $('#comment').show();
         $('#comment').show();

        }else if (tact == "RB-Make-Good") {
           
            $('#__rb_mg_asset_view').show()
           
         $("#rbmakeGood11").show();
         $("#makeGood12").hide();
      
         $("#MakeGoodView").hide();
         $("#rbFlex").hide()
         $("#eBc").show()
         $("#cf").show()
         $("#sendmail").show()
         $("#sendname").show()
         $("#campname").show()
         $("#user_ebcomment").hide()

         $("#fileviewbox").hide();
         $("#webinarFlex").hide()
         $("#ebBlastview").hide()
         $('#webinar_files').hide();
         $('#ebasset').hide();
         $('#rbasset').hide();
         $('#comment').show();
         $('#comment').show();


        } else if (tact == "Email-Reminder-Blast") {

            $("#rbmgview").hide();
            $("#ebmgview").hide();

            $("#makeGood11").hide();
            $("#makeGood12").hide();
            $('#__rb_mg_asset_view').hide()
            $('#__eb_mg_asset_view').hide()
           
            $("#rbmakeGood11").show();
            $("#makeGood12").hide();
         
            $("#eBc").show()
            $("#cf").show()
            $("#sendmail").show()
            $("#sendname").show()
            $("#campname").show()
            $('#user_rbcomment').show();
            $("#webinarFlex").hide()
            $("#fileviewbox").hide()
            $('#ebasset').show();
            $('#rbasset').show();

        } else if (tact == "Webinar") {

            $("#rbmgview").hide();
             $("#makeGood11").hide();
             $("#makeGood12").hide();
            $("#ebmgview").hide();
            $('#__rb_mg_asset_view').hide()
            $('#__eb_mg_asset_view').hide()
           
            $("#rbmakeGood11").show();
            $("#makeGood12").hide();            
            
            $("#webinarFlex").show();
            $("#user_ebcomment").show();
            $("#rbFlex").hide();
            $("#eBc").show()
            $("#cf").show()
            $("#sendmail").show()
            $("#sendname").show()
            $("#campname").show()

            $("#ebBlastview").hide();
            $('#ebasset').hide();
            $('#rbasset').hide();
            $('#ebasset').show();
            $('#fileviewbox').hide();



        }




        $('#dynamic_modal_title').text('View Data');

        $('#action').val('view');

        $('#action_button').text('').hide();

        $('#action_modal').modal('show');


        $.ajax({
            url: "https://staging.webtechstar.com:7777/customEmp/action",
            method: "POST",
            data: {
                id: id,
                action: 'fetch_single'
            },

            dataType: "JSON",
            success: function(data) {


                $('#cnameview').val(data.client_name);
                $('#sender_nameview').val(data.sender_name);
                $('#sender_emailview').val(data.sender_email);
                $('#blast_countview').val(data.blast_count);
                $('#camp_name').val(data.camp_name);
                $('#camp_from').val(data.camp_from);
                $('#asset_name').val(data.asset_name);
                $('#asset_link').val(data.asset_link);
                $('#blast_date').val(data.blast_date);
                $('#blast_time').val(data.blast_time);

                $('#mgasset_name').val(data.mgasset_name)
                $('#mgasset_link').val(data.mgasset_link)

               
                $('#rb_mgasset_link').val(data.rb_mgasset_link)
                $('#rb_mgasset_name').val(data.rb_mgasset_name)

         

                //$('#rb_comment').val(data.rb_comment);

                $('#user_rbcomment').val(data.user_rbcomment);
                $('#user_ebcomment').val(data.user_ebcomment);
                $('#rb_comment').val(data.rb_comment);

                $('#comment').val(data.comment);
                $('#webinar_admin_comment').val(data.comment)
                $('#webinar_comment').val(data.webinar_comment)

                $('#blast_type').val(data.blast_type);

                $('#rb_assetnameview').val(data.rb_assetname);
                $('#rb_asset_linkview').val(data.rb_assetlink);
                $('#rb_dateview').val(data.rb_date);
                $('#rb_timeview').val(data.rb_time);

                $('#status').val(data.status);
                $('#id').val(data.id);

                var now = new Date();
                var day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
                var hours = now.getHours();
                var minutes = now.getMinutes()

                var admin_image = data.admin_files;
                var tactValue = data.tact;

                var user_rbfiles = data.user_rbfiles;

                var user_rbfiles = user_rbfiles.split(',');
                var user_rbfiles_length = user_rbfiles.length;
                var admin_rb_image = data.admin_rb_file;
                var admin_rb_image = admin_rb_image.split(',');
                var admin_rb_length = admin_rb_image.length;
                var admin_image = data.admin_files;
                var admin_image = admin_image.split(',');
                var admin_length = admin_image.length;
                var htmlContent = '';




                if (tactValue == "webinar") {

                   
                    $("#webinarFlex").show();
                    //  alert(webinar.html())
                    $("#ebComment").hide();
                    var rb = $("#rbFlex").hide();
                    // alert(rb.html())
                    $("#ebasset").hide();
                    $("#user_ebcomment").hide();

                    $("#ebBlastview").hide();
                    $('#webinar_comment').show();
                    $('#webinar_admin_comment').show();
                    var user_image1 = data.webinar_files;


                    var user_image1 = user_image1.split(',');
                    var length = user_image1.length;



                    for (var i = 0; i <= 1; i++) {

                        if (user_image1[i] != undefined && user_image1[i].trim().length != 0) {
                            htmlContent += '<p> <tr ><td style = "background-color: aliceblue;"> <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px;"> &nbsp; ' + user_image1[i] + '</i></span> &nbsp; &nbsp;   <a  href = "#"<i class="fa fa-download" style = "font-size:15px; color:black;"  name="webinar_files" id="images"  onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + user_image1[i] + ',' + i + ',' + tact + '\'><a></i></td></tr>', '</p>';
                        }
                    }
                    document.getElementById('wbinar11').innerHTML = htmlContent;
                   
                    $(".rbmgview").hide();
                    
                    $('#webinar_comment').show();
                    $('#wbinar11').show();
                    $('#webinarcomment').show()

                    $("#webinarFlex").show();

                    $('#ebBlastview').hide();
                    $('#rbFlex').hide();
                    $('#user_ebcomment').hide()
                    $('#ebBlastview').hide()

                    var admin_image = data.admin_files;
                    var admin_image = admin_image.split(',');
                    var admin_length = admin_image.length;
                    var adminHtml = '';
                    for (var i = 0; i <= 1; i++) {
                        if (admin_image[i] != undefined && admin_image[i].trim().length != 0) {

                            adminHtml += '<p> <tr><td style = "background-color: aliceblue;" ><img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px;"> &nbsp; ' + admin_image[i] + '</i></span> &nbsp; &nbsp;   <a  href = "#"<i class="fa fa-download" style = "font-size:15px; color:black;"  name="webinar_files" id="images"  onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + admin_image[i] + ',' + i + ',' + tact + '\'><a></i></td></tr>', '</p>';
                        }

                    }
                    document.getElementById('wbinar12').innerHTML = adminHtml;
                  
                   
                    $('#webinarFlex').show();

                    $('#wbinar12').show();

                    $('#ebBlastview').hide();
                    $('#rbFlex').hide();
                    $('#user_ebcomment').hide();
                    $('#ebBlastview').hide()
                    $('#webinar_comment_show').show();

                           // MAKE GOOD   START //
                  
                   
                     


                } else if (tactValue == 'e_blast') {


                    $("#rbFlex").hide();
                    $("#webinarFlex").hide()
                    $("#ebBlastview").show()
               

                    var user_image = data.user_ebfiles;

                    var user_image = user_image.split(',');
                    var length = user_image.length;

                    var htmlebContent = '';

                    for (var i = 0; i < length; i++) {

                        if (user_image[i] != undefined && user_image[i].trim().length != 0) {

                            htmlebContent += '<p> <tr><td style = "background-color: aliceblue;" > <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;' + user_image[i] + '&nbsp;&nbsp;</span> <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;"  name="user_ebfiles" style = "font-size: 12px;" id="user_ebfiles" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + user_image[i] + ',' + i + ',' + tact + '\'> </a></i></td></tr>', '</p>';
                        }

                    }
                    document.getElementById('viewfiles112').innerHTML = htmlebContent;
                    $("#viewfiles112").show();
                    $("#rbFlex").hide();

                    $("#user_ebcomment").show();


                    var admin_image = data.admin_files;

                    var admin_image = admin_image.split(',');
                    var admin_length = admin_image.length;
                    var amdinebContent = '';

                    for (var i = 0; i < admin_length; i++) {



                        if (admin_image[i] != undefined && admin_image[i].trim().length != 0) {
                            amdinebContent += '<p> <tr ><td style = "background-color: aliceblue;" > <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;' + admin_image[i] + '&nbsp;&nbsp;</span> <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + admin_image[i] + ',' + i + ',' + tact + '\'></a></i></td></tr>', '</p>';

                        }
                     }
                    
                    document.getElementById('viewfiles113').innerHTML = amdinebContent;
                    $(".ebmgview").hide();
                    $(".rbmgview").hide();
                    
                 
                    $("#MakeGoodView").hide();
                    $("#viewfiles113").show();
                    $("#rbFlex").hide();
                    $("#webinarFlex").hide();
                    $("#user_ebcomment").show();

                       

                    if (tact == "Make_Good" ) {
                       

                            var htmlContent1 = "";
                            var eb_mg_files = data.eb_mg_files;
                            var eb_mg_files = eb_mg_files.split(',');
                            var eb_mg_files_length = eb_mg_files.length;
                            for (var i = 0; i < eb_mg_files_length; i++) {
                            if (eb_mg_files[i] != undefined && eb_mg_files[i].trim().length != 0) {
   
                                htmlContent1 += '<p> <tr ><td style = "background-color: aliceblue;" > <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;' + eb_mg_files[i] + '&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black" name="eb_mg_files" style = "font-size: 12px;" id="eb_mg_files" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + eb_mg_files[i] + ',' + i + ',' + tact + '\'></a></i></td>', '';
                            }
                  
                    }
   
                        document.getElementById('makeGood11').innerHTML =  htmlContent1;
                        ;
   
                        $('#__eb_mg_asset_view').show();
                        
                        $("#makeGood11").show();
                        $("#rbmgview").hide();
                        $("#ebmgview").show();
                        $("#MakeGoodView").show();
                        $(".rbmgview").hide();
                       
                        $('#viewfiles11').show();
                        $('#viewfiles12').show();
                        $('#viewReminderBlastView11').hide()
                        $('#webinarflex').hide();
                        $('#fileviewdownload').hide();
                        $('#rbFlex').hide();
                        $("#user_ebcomment").hide();

                        var admin_image = data.admin_files;

                        var admin_image = admin_image.split(',');
                        var admin_length = admin_image.length;
                        var amdinebContent = '';

                    for (var i = 0; i < admin_length; i++) {



                        if (admin_image[i] != undefined && admin_image[i].trim().length != 0) {
                            amdinebContent += '<p> <tr ><td style = "background-color: aliceblue;" > <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;' + admin_image[i] + '&nbsp;&nbsp;</span> <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + admin_image[i] + ',' + i + ',' + tact + '\'></a></i></td></tr>', '</p>';

                        }





                    }
                    document.getElementById('makeGood12').innerHTML =  amdinebContent;
                    $('#__eb_mg_asset_view').show();
                        
                    $("#makeGood12").show();
                    $("#rbmgview").hide();
                    $("#ebmgview").show();
                    $("#MakeGoodView").show();
                    $(".rbmgview").hide();
                   
                    $('#viewfiles11').show();
                    $('#viewfiles12').show();
                    $('#viewReminderBlastView11').hide()
                    $('#webinarflex').hide();
                    $('#fileviewdownload').hide();
                    $('#rbFlex').hide();
                    $("#user_ebcomment").hide();


                }

                    if (tact == "RB-Make-Good" ) {
                       
                       
                        var rb_mg_files = data.rb_mg_files;
                        var rb_mg_files = rb_mg_files.split(',');
                        var rb_mg_files_length = rb_mg_files.length;
                        for (var i = 0; i < rb_mg_files_length; i++) {
                           if (rb_mg_files[i] != undefined && rb_mg_files[i].trim().length != 0) {
                     
                              htmlContent1 += '<td style = "background-color: aliceblue;"  ><img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;' + rb_mg_files[i] + '&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black" name="eb_mg_files" style = "font-size: 12px;" id="eb_mg_files" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + rb_mg_files[i] + ',' + i + ',' + tact + '\'></a></i></td>', '';
   
                           }
                  
                        }
   
                        document.getElementById('rbmakeGood11').innerHTML =  htmlContent1;
                        ;
   
                        $("#RBMakeGoodView").show();
                        $("#rbmakeGood11").show();
                        $("#rbmakeGood12").hide();
                        $('#viewfiles11').hide();
                        $('#viewfiles12').hide();
                        $('#viewReminderBlastView11').hide()
                        $('#webinarflex').hide();
                        $('#fileviewdownload').hide();
                        $('#rbFlex').hide();
                        $("#user_ebcomment").hide();

                        var admin_image = data.admin_files;

                        var admin_image = admin_image.split(',');
                        var admin_length = admin_image.length;
                        var amdinebContent = '';

                    for (var i = 0; i < admin_length; i++) {



                        if (admin_image[i] != undefined && admin_image[i].trim().length != 0) {
                            amdinebContent += '<p> <tr ><td style = "background-color: aliceblue;" > <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;' + admin_image[i] + '&nbsp;&nbsp;</span> <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + admin_image[i] + ',' + i + ',' + tact + '\'></a></i></td></tr>', '</p>';

                        }




                    }

                    document.getElementById('rbmakeGood12').innerHTML =  amdinebContent;
                    ;
                    
                    $("#rbmakeGood12").show();
                    $("#RBMakeGoodView").show();
                    $("#rbmakeGood11").show();
                    $("#rbmakeGood12").hide();
                    $('#viewfiles11').hide();
                    $('#viewfiles12').hide();
                    $('#viewReminderBlastView11').hide()
                    $('#webinarflex').hide();
                    $('#fileviewdownload').hide();
                    $('#rbFlex').hide();
                    $("#user_ebcomment").hide();

                }    
                        var user_rbfiles = data.user_rbfiles;
                        var user_rbfiles = user_rbfiles.split(',');
                        var user_rbfiles_length = user_rbfiles.length;
                        for (var i = 0; i < user_rbfiles_length; i++) {


                        if (user_rbfiles[i] != undefined && user_rbfiles[i].trim().length != 0) {
                            htmlContent += '<p ><tr><td style = "background-color: aliceblue;"  >  <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;' + user_rbfiles[i] + '&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black" name="user_rbfiles" style = "font-size: 12px;" id="user_file" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + user_rbfiles[i] + ',' + i + ',' + tact + '\'></a></i></td></tr>', '</p>';

                        }

                    }

                    document.getElementById('viewReminderBlastView11').innerHTML = htmlContent;


                    $('#viewfiles11').hide();
                    $('#viewReminderBlastView11').show()
                    $('#webinarflex').hide();
                    $('#fileviewdownload').hide();
                    $('#rbFlex').show();
                    $("#user_ebcomment").show();
                    var adminRbHtml = '';
                    for (var i = 0; i < admin_rb_length; i++) {

                        if (admin_rb_image[i] != undefined && admin_rb_image[i].trim().length != 0) {
                            adminRbHtml += '<p  ><tr><td style = "background-color: aliceblue;" ><img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:10px; color:black;">&nbsp; &nbsp;' + admin_rb_image[i] + ' <span style = "font-size:16px; color:black;">&nbsp; &nbsp; <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;" name="user_rbfiles" id="user_file" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + admin_rb_image[i] + ',' + i + ',' + tact + '\'></a></i></a><br></td></tr>', '</p>';
                        }
                    }
                    document.getElementById('viewReminderBlastView12').innerHTML = adminRbHtml;
                    $('#viewReminderBlastView12').show();
                    $('#webinarFlex').hide();
                    $('#fileviewdownload').hide();
                    $('#viewfiles11').hide();
                    $('#webinar_comment_show').hide();

                    $("#user_ebcomment").show();

                    if (tact == "Email-Reminder-Blast") {
                        $('#rbFlex').show();
                    } else {
                        $('#rbFlex').hide();
                    }


                }




            }
        });



    });
    //End of  on('click', '.view',




    $(document).on('click', '#editimage', function() {




        // var id = $(this).data('id');
        var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var camp_id = myArray[0];



        var tactValue = myArray[1];


        $('#dynamic_modal_title').text('View Files');

        $('#action').val('editimage');

        $('#action_button').text('Upadte Image').hide();
        //$("#action_button").text("display","none");
        $('#action_modal').modal('show');

        //  alert("hello")

        var action = $("#action").val();

        // alert("editimage action hii");
        //console.log(action);

        if (action === "editimage") {

            // var imageleng = document.getElementById('image').files.length;
            // if(imageleng === 2){
            //    alert("hello"+imageleng)
            //    $('#tr_id').hide();
            //  }else{
            //    $('#tr_id').show();
            //  }

            $("#eBc").hide();
            $("#cf").hide();

            $("#campname").hide();
            $("#cf").hide();

            $("#sendmail").hide();
            $("#sendname").hide();


            $("#sendname").hide();

            $("#cname1").hide();

            $("#fileviewdownload").hide();


            $("#ebBlastview").hide();
            $("#cnameview").hide();
            $("#viewdata11").hide();
            $("#editdataa").hide();
            $("#webinarblast").hide();
            $("#tactics").hide();
            $("#hide_modal").hide();
            $("#fileviewbox").show();

            $('#sample_form').trigger('reset');
        }



        $.ajax({
            url: "https://staging.webtechstar.com:7777/customEmp/action",
            method: "POST",
            data: {
                camp_id: camp_id,
                action: 'fetch_files'
            },

            dataType: "JSON",
            success: function(data) {




                var user_rb_files = data.user_rbfiles;



                if (tactValue === "Email-Blast") {
                    var user_imagename = data.user_ebfiles;
                    var user_imagename = user_imagename.split(',');
                    var length = user_imagename.length;
                    cate_id = data.camp_id;

                    var htmlContent = '';
                    var htmlContent1 = '';
                    var htmlContent2 = htmlContent + '' + htmlContent1;

                    for (var i = 0; i <= length; i++) {

                        if (user_imagename[i] == undefined) {

                            // htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ cate_id + ',' + user_imagename[i] + ',' + i + ',' +tactValue+ '\' value = "Insert File"></tr></td>' ,'</p> </form>';

                        } else if (user_imagename[i] != '') {



                            htmlContent += '<tr><td width="60%"> <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:10px; color:black;"> &nbsp; &nbsp;' + user_imagename[i] + '&nbsp;&nbsp; </span> </i><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black"" name="image" id="image" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + user_imagename[i] + ',' + i + ',' + tactValue + '\'></i></td> &nbsp;<td  width="40%"><input type="text" value=' + user_imagename[i] + ' name="filenum" style="display:none;"> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-danger btn-sm  " onclick = "fileReplace1(this)"  data-id=\'' + data.camp_id + ',' + user_imagename[i] + ',' + i + ',' + tactValue + '\' value = "Delete Files"> &nbsp; &nbsp;</span></td></tr>', '';
                        } else {
                            //  alert("tact is not:" +tact);
                        }
                    }

                    if (2 - length > 0) {

                        htmlContent += '<tr><td><form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td style = "background-color: aliceblue;"><input type = "file" class="form-control" name = "image" id = "hello"    data-id="' + data.camp_id + '" data-for="single" ></td><td><button type="button" class="imageform btn btn-primary" onclick="myFunction(this)" data-id=' + data.camp_id + ',' + tactValue + '>Upload</button></td></tr>', '</p>  </form></td></tr>';

                    }
                    document.getElementById('container11').innerHTML = htmlContent;

                    $('#image').val(data.user_ebfiles);

                    // Make good edit code startt //

                } else if (tactValue === "RB-Make-Good") {
                   
                   
                     var rb_mg_files = data.rb_mg_files;
                     var rb_mgfiles = rb_mg_files.split(',');
                  
                     var length = rb_mgfiles.length;
                     var cate_id = data.camp_id;
 
                     var htmlContent = '';
                     var htmlContent1 = '';
                     var htmlContent2 = htmlContent + '' + htmlContent1;
                   
                     for (var i = 0; i <= length; i++) {
 
                         if (rb_mgfiles[i] == undefined) {
 
                             // htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ cate_id + ',' + user_imagename[i] + ',' + i + ',' +tactValue+ '\' value = "Insert File"></tr></td>' ,'</p> </form>';
 
                         } else if (rb_mgfiles[i] != '') {
 
 
 
                             htmlContent += '<tr><td width="60%"> <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:10px; color:black;"> &nbsp; &nbsp;' + rb_mgfiles[i] + '&nbsp;&nbsp; </span> </i><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black"" name="image" id="image" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + rb_mgfiles[i] + ',' + i + ',' + tactValue + '\'></i></td> &nbsp;<td  width="40%"><input type="text" value=' + rb_mgfiles[i] + ' name="filenum" style="display:none;"> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-danger btn-sm  " onclick = "fileReplace1(this)"  data-id=\'' + data.camp_id + ',' + rb_mgfiles[i] + ',' + i + ',' + tactValue + '\' value = "Delete Files"> &nbsp; &nbsp;</span></td></tr>', '';
                         } else {
                             //  alert("tact is not:" +tact);
                         }
                     }
 
                     if (2 - length > 0) {
 
                         htmlContent += '<tr><td><form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td style = "background-color: aliceblue;"><input type = "file" class="form-control" name = "image" id = "hello"    data-id="' + data.camp_id + '" data-for="single" ></td><td><button type="button" class="imageform btn btn-primary" onclick="myFunction(this)" data-id=' + data.camp_id + ',' + tactValue + '>Upload</button></td></tr>', '</p>  </form></td></tr>';
 
                     }
                     document.getElementById('container11').innerHTML = htmlContent;
 
                     $('#image').val(data.rb_mgfiles);
 
                }else if (tactValue === "Make_Good") {
                
                    var eb_mgfiles = data.eb_mg_files;
                    var eb_mgfiles = eb_mgfiles.split(',');
                    var length = eb_mgfiles.length;
                    cate_id = data.camp_id;

                    var htmlContent = '';
                    var htmlContent1 = '';
                    var htmlContent2 = htmlContent + '' + htmlContent1;

                    for (var i = 0; i <= length; i++) {

                        if (eb_mgfiles[i] == undefined) {

                            // htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ cate_id + ',' + user_imagename[i] + ',' + i + ',' +tactValue+ '\' value = "Insert File"></tr></td>' ,'</p> </form>';

                        } else if (eb_mgfiles[i] != '') {



                            htmlContent += '<tr><td width="60%"> <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:10px; color:black;"> &nbsp; &nbsp;' + eb_mgfiles[i] + '&nbsp;&nbsp; </span> </i><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black"" name="image" id="image" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + eb_mgfiles[i] + ',' + i + ',' + tactValue + '\'></i></td> &nbsp;<td  width="40%"><input type="text" value=' + eb_mgfiles[i] + ' name="filenum" style="display:none;"> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-danger btn-sm  " onclick = "fileReplace1(this)"  data-id=\'' + data.camp_id + ',' + eb_mgfiles[i] + ',' + i + ',' + tactValue + '\' value = "Delete Files"> &nbsp; &nbsp;</span></td></tr>', '';
                        } else {
                            //  alert("tact is not:" +tact);
                        }
                    }

                    if (2 - length > 0) {

                        htmlContent += '<tr><td><form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td style = "background-color: aliceblue;"><input type = "file" class="form-control" name = "image" id = "hello"    data-id="' + data.camp_id + '" data-for="single" ></td><td><button type="button" class="imageform btn btn-primary" onclick="myFunction(this)" data-id=' + data.camp_id + ',' + tactValue + '>Upload</button></td></tr>', '</p>  </form></td></tr>';

                    }
                    document.getElementById('container11').innerHTML = htmlContent;

                    $('#image').val(data.eb_mgfiles);

                    //Make good edit code end //



                } else if (tactValue === "Email-Reminder-Blast") { // reminder blast code //



                    // alert("tactValue"+tactValue)
                    var user_rb_files = data.user_rbfiles;

                    var cate_id = data.camp_id;

                    var user_rb_files = user_rb_files.split(',');
                    var rblength = user_rb_files.length;
                    var htmlContent = '';
                    var htmlContent1 = '';
                    var htmlContent2 = htmlContent + '' + htmlContent1;


                    $(document).ready(function() {

                        // if(rblength <= 1){

                        // alert(rblength)

                        //       $("#tr_id").hide();


                        // }else{

                        //       $("#tr_id").show();
                        // }

                    });

                    for (var i = 0; i <= 1; i++) {

                        if (user_rb_files[i] == undefined) {



                            // htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_rb_files[i]+ ' name="filenum" style="display:none;"><input type="file" name="user_rbfiles" class = " bg- form-control btn-dark imageInput custom-file-input" data-id = '+i+'  > <input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ data.camp_id + ',' +user_rb_files[i]+ ',' + i + ',' +tactValue+ '\' value = "Insert Files" ></tr></td>' ,'</p> </form>';


                        } else if (user_rb_files[i] != '') {
                            // console.log("tact is:" +tact);

                            htmlContent += '<p class="main"> <tr><td width="60%" style = "background-color: aliceblue;">  <img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:10px; color:black;">  &nbsp; &nbsp;' + user_rb_files[i] + '&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + user_rb_files[i] + ',' + i + ',' + tactValue + '\'> </a></i></td> &nbsp;</td><td width="40%"> <input type="submit" class="btn btn-danger btn-sm bg-danger" onclick = "fileReplace1(this)" data-id=\'' + data.camp_id + ',' + user_rb_files[i] + ',' + i + ',' + tactValue + '\' value = "Delete file" id = "btn_id"></td> </tr>', '</p>';

                        }
                    }

                    if (2 - rblength > 0) {
                        htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td style = "background-color: aliceblue;"><input type = "file" class="form-control" name = "image" id = "hello"    data-id="' + data.camp_id + '"  data-for="single"></td><td><button type="button" class="imageform btn btn-primary btn-sm" onclick="myFunction(this)" data-id=' + data.camp_id + ',' + tactValue + '>Upload File</button></td></tr>', '</p>  </form>';
                    }
                    htmlContent2 += htmlContent + '' + htmlContent1;


                    document.getElementById('container11').innerHTML = htmlContent;

                    $("#container11").show();
                    $('#image').val(data.user_rbfiles);
                    $('#id').val(data.camp_id);

                    $('#sample_form').trigger('reset');
                }

               else if (tactValue === "Webinar") {




                    var user_imagename = data.webinar_files;

                    //  alert("webinarFiles"+data.webinar_files)

                    var user_imagename = user_imagename.split(',');

                    var length = user_imagename.length;

                    //   alert("webinarFiles length" +length)

                }

                // $( document ).ready(function() {

                //       if(length >= 2){

                //       alert(length)

                //             $("#tr_id").hide();


                //       }else{

                //             $("#tr_id").show();
                //       }

                //         });




                var htmlContent = '';
                var htmlContent1 = '';
                var htmlContent2 = htmlContent + '' + htmlContent1;

                for (var i = 0; i <= 1; i++) {




                    if (user_imagename[i] == undefined) {




                        //  htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="file" name="webinar_files" class = " bg- form-control btn-dark imageInput custom-file-input" data-id = '+i+'  > <input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ data.camp_id + ',' +user_imagename[i]+ ',' + i + ',' +tactValue+ '\' value = "Insert Files" ></tr></td>' ,'</p> </form>';



                    } else if (user_imagename[i] != '') {


                        // console.log("tact is:" +tact);

                        htmlContent += '<p> <tr><td width="60%" style = "background-color: aliceblue;"><img src="../../assets/img/files-folder1.png" class="fileimg"><span style = "font-size:10px; color:black;"> &nbsp; &nbsp;' + user_imagename[i] + '&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\'' + data.camp_id + ',' + user_imagename[i] + ',' + i + ',' + tactValue + '\'></a> </i></td > &nbsp;<td  width="40%" style = "background-color: aliceblue;"><input type="text" value=' + user_imagename[i] + ' name="filenum" style="display:none;"> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-danger btn-sm  " onclick = "fileReplace1(this)"  data-id=\'' + data.camp_id + ',' + user_imagename[i] + ',' + i + ',' + tactValue + '\' value = "Delete Files"> &nbsp; &nbsp;</span></tr></td></tr>', '</p>';

                    } else {
                        // $('.msgedit').show().html('<p class="alert alert-danger">Please Upload Files..</p>').fadeOut(4000);
                    }



                }



                if (2 - length > 0) {

                    htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td><input type = "file" class="form-control" name = "image"   id = "hello"  data-id="' + data.camp_id + '" data-for="single" ></td><td><button type="button" class="imageform btn btn-primary btn-sm" onclick="myFunction(this)" data-id=' + data.camp_id + ',' + tactValue + '>Upload File</button></td></tr>', '</p>  </form>';

                }

                document.getElementById('container11').innerHTML = htmlContent;

                $('#image').val(data.webinar_files);
                var camp_id = $('#id').val(data.camp_id);
                setTimeout(function() {
                    $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
                    $('#message').html('');
                }, 5000);

            },



            error: function(data) {

                alert("Within error function");


            }




        })

    })




    $(document).on('click', '.check', function(e) {

        var user_id = $(this).data('id');


        var checkBox = document.getElementsByClassName("check");

        if (confirm("Are you sure you want to update the data?")) {
            $.ajax({
                url: "https://staging.webtechstar.com:7777/customEmp/action",
                method: "POST",
                data: {
                    action: 'check',
                    p_id: user_id
                },
                dataType: "JSON",
                success: function(data) {
                    $('.message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

                    console.log("data" + data);

                    if (data.success) {
                        $('.msgshow').show();
                        $('.remider_blst').show();
                        $('.check').hide();



                        dataTable.row($(this).attr('data-rowid')).invalidate().draw();



                    } else {
                        $('.check').show();
                        $('.remider_blst').hide();
                        $('.msgshow').hide();
                    }

                    $('#tdata').DataTable().ajax.reload();
                    setTimeout(function() {
                        $('.message').html('');
                    }, 1000);

                }
            });
        } else {

            e.target.className == 'check';
            $(".check").prop('checked', false);


            //alert(e.target.className);

        }

    });


});



$(document).on('click', '.remider_blstcheckbox', function(e) {


    var id = $(this).data('id');
    console.log("Click rb checkbox" + id);




    if (confirm("Are you sure you want to update the data?")) {
        $.ajax({
            url: "https://staging.webtechstar.com:7777/customEmp/action",
            method: "POST",
            data: {
                action: 'remider_blstcheckbox',
                id: id
            },
            dataType: "JSON",
            success: function(data) {
                $('#message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

                console.log("data" + data);

                if (data.success) {
                    $('.msgshow').show();
                    $(e.target).hide();


                    // dataTable.row($(this).attr('data-rowid')).clear().invalidate().draw();



                } else {
                    $('.remider_blstcheckbox').show();
                }

                $('#tdata').DataTable().ajax.reload();
                setTimeout(function() {
                    $('#message').html('');
                }, 1000);

            }
        });
    } else {

        e.target.className == 'remider_blstcheckbox';
        $(".remider_blstcheckbox").prop('checked', false);


        //alert(e.target.className);

    }

});

// function myFunction() { //=> funtion for uploading images into data base //
//    $('#exampleModal').modal('hide');
//    var sendComment = $('#emailBlastComment').val();
//    var camp_id = $("#user_id").attr("data-id")
//    var status = $("#status").attr("data-id");
//    var rb_status = $("#rbstatus").attr("data-id");
//    var image = $('#image').val();

//    //   var camp_id = $('id')
//    if (confirm("Are you sure you want to update the data?")) {
//        $.ajax({
//            url: "https://staging.webtechstar.com:7777/customEmp/comment",
//            method: "POST",
//            data: {
//                comment: 'sendComment',
//                sendComment: sendComment,
//                camp_id: camp_id,
//                status: status,
//                rb_status: rb_status,
//                image: image
//            },
//            dataType: "JSON",
//            success: function(data) {
//                if (data) {
//                    $('.comment').html('<div class="alert alert-success">' + data.message + '</div>').fadeOut(4000);
//                    // $('#exampleModal').hide();
//                    $('#sample_form')[0].reset();
//                } else {
//                   $('.comment').html('<div class="alert alert-success">' + data.message + '</div>').fadeOut(4000);
//                }

//            }

//        })
//    }
// }




function fileUpload(e) {


    const formData1 = new FormData($(e).closest("form")[0]);
    const camp_id = $(e).data("id");
    const tact = $(e).data("tact")
    var imageleng = $(`input.main-list-image-input[type='file'][data-id='${camp_id}']`)[0].files.length;
    if (imageleng == 0) {
        $('.msgee').show().html('<p class="alert alert-primary">Please upload only two Images or upload least one image..</p>').fadeOut(4000);
        //$(`#${tact}`).modal("hide");
        return;
    }

    if (imageleng > 2) {
        $('.msgee').show().html('<p class="alert alert-primary">Please upload only two Images or upload least one image..</p>').fadeOut(4000);
        //$(`#${tact}`).modal("hide");
        return;
    }


    const images_input = $(`input[name='image[]'][data-id='${camp_id}']`)

    const comment = $(e).closest("form").find("#emailBlastComment").val();


    formData1.set("camp_id", camp_id);
    formData1.append('sendComment', comment);

    formData1.set('image[]', images_input[0].files[0]);
    formData1.append('image[]', images_input[0].files[1]);


    formData1.set("tact", tact);

    // console.log("image"+formData1.append('image[]', image))




    if (confirm("Are you sure you want to update the data?")) {
        $.ajax({
            url: "https://staging.webtechstar.com:7777/customEmp/comment",
            method: "POST",
            data: formData1,
            // dataType: "JSON",
            contentType: false,
            processData: false,
            success: function(data) {
                if (data) {
                    $('.comment').html('<p class="alert alert-success">' + data.message + '</p>').fadeOut(4000);

                    $(`#${tact+""+camp_id}`).modal("hide"); // hide module
                    $(e).closest("form").trigger('reset');
                    //  $(`#${tact}`)[0].reset();
                    // $(`#${tact+""+camp_id}`).DataTable().ajax.reload();


                } else {
                    $('.comment').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);
                    $(`#${tact+""+camp_id}`).modal("hide");
                }
            }
        })
    } else {
        $('.comment').html('<p class="alert alert-primary">Please upload only two Images..</p>').fadeOut(4000);
        $(`#${tact+""+camp_id}`).modal("hide");
    }


} //fileUpload() end




function myFunction(e) { //=> funtion for uploading images into data base //   

    $("#exampleModal").modal("hide");
    $("#fileviewbox").show();
    $("#fileviewdownload").hide()

    var imageleng = document.getElementById('hello').files.length;

    if (imageleng == 0) {
        $('.msgedit').show().html('<p class="alert alert-danger">Please least one Files Uploaded..</p>').fadeOut(4000);

        return;
    }

    if (imageleng > 2) {


        return;
    }

    //$(e).closest("form")[0]
    var formData1 = new FormData();

    var idtype = $(e).data("id");

    const myArray = idtype.split(",");
    var camp_id = myArray[0];
    var tact = myArray[1];
    //  alert(camp_id)
    //  alert(tact)
    //  const tact=$(e).data("tact") 
    formData1.set("camp_id", camp_id);
    formData1.set("tact", tact);
    var file_data = $(`input[type="file"][name="image"][data-id="${camp_id}"][data-for='single']`)[0].files;

   

    // for multiple files
    for (var i = 0; i < file_data.length; i++) {
        formData1.append("image", file_data[i]);
    }




    //   var camp_id = $('id')



    $.ajax({
        url: "https://staging.webtechstar.com:7777/customEmp/comment",
        method: "POST",
        data: formData1,
        //   dataType: "JSON",
        contentType: false,
        processData: false,
        success: function(data) {
            if (data) {
                $('.comment').html('<p class="alert alert-success">' + data.message + '</p>').fadeOut(4000);
                $('#action_modal').modal("hide");
                $('#sample_form').trigger('reset');

                //  $(`#${tact+""+camp_id}`)[0].reset();
                //  $(`#${tact+""+camp_id}`).DataTable().ajax.reload();


            } else {

                $('.comment').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);

            }
        }


    })




}
// }



function fileviewFunction(name) { //=> funtion for uploading images into data base //
    $('#exampleModal').modal('hide');
    var idtype = $(name).data('id');
    const myArray = idtype.split(",");
    var camp_id = myArray[0];
    var oldfname = myArray[1];
    var tact = myArray[3];
    var image = name;
    //  console.log("tachvalue is ->😍❤❤🤣😂😊😊✔"+tact)
    if (tact == "Email-Blast") {
        var tactfolder = "Email-Blast";
    } else if (tact == "Email-Reminder-Blast") {
        var tactfolder = "Email-Reminder-Blast";
    } else if (tact == "Webinar") {
        var tactfolder = "Webinar";
    }



    var url = "./files/" + camp_id + "/user/" + tactfolder + "/" + oldfname; //Set the File URL.
    //  console.log("URL_FILE:" +url);
    //Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function() {

        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], {
            type: "application/octetstream"
        });

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {


            window.navigator.msSaveBlob(blob, oldfname);
        } else {


            var url = window.URL || window.webkitURL;

            console.log("url" + url);
            link = url.createObjectURL(blob);

            var a = document.createElement("a");

            a.setAttribute("download", oldfname);

            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();


}

// En

function fileReplace1(e) {


    var id = $(e).parent().children('.imageInput').first().data("id");


    var idtype = $(e).data('id');

    const myArray = idtype.split(",");
    var camp_id = myArray[0];

    var oldfname = myArray[1];
    var loop_index = myArray[2]
    // alert("loop_index"+loop_index)
    //  alert("myfile"+ oldfname)
    var filenum = myArray[2];

    var tact = myArray[3];


    var formData = new FormData();

    formData.append('tact', tact); // Append the file to FormData
    formData.append('camp_id', camp_id); // Append the file to FormData
    formData.append('filenum', filenum); // Append the file to FormData
    formData.append('oldfname', oldfname); // Append the file to FormData

    if (confirm("Are you sure you want to update the data?")) {
        // Make an Ajax POST request

        $.ajax({
            type: 'POST',
            url: 'https://staging.webtechstar.com:7777/customEmp/image_replace', // Replace with your server-side script URL
            data: formData,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Set content type to false, as we are using FormData
            success: function(response) {
                // Handle the server's response here




                $('#message').html('<div class="alert alert-success"> File Successfully deleted..</div>');
                $('#leftnav').DataTable().ajax.reload();
                $('#apptask').DataTable().ajax.reload();
                $('#task_priorities').DataTable().ajax.reload();
                $('#todaysstask').DataTable().ajax.reload();
                $('#weeklytasks').DataTable().ajax.reload();
                setTimeout(function() {
                    $('#message').html('');
                }, 5000);
                $('#action_modal').modal('hide'); // for hide root modal
                $('#form_id')[0].reset();

            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error(xhr.responseText);
            }
        });
    }

}




function handleImageUpload(i) {

    var imageInput = document.getElementById('image_id');
    var imageleng = document.getElementById('image_id').files.length;
    //    for(i=0; i>=imageleng; i++){

    //       if(imageleng[i] == imageleng){

    //     alert(imageleng[i])

    //          //document.getElementById('btn_id').disabled = true;
    //       }else{
    //          // document.getElementById('btn_id').disabled = false;
    //       }
    //    }

    //   }
}



function resetForm() {
    // Get the form element
    var form = document.getElementById("sample_id");

    // Reset the form
    form.reset();
}

function removeFile(e) {
    var idtype = $(e).data('id');
    console.log("idtype:" + idtype);
    const myArray = idtype.split(",");

    var camp_id = myArray[0];
    var oldfname = myArray[1];



    var filenum = myArray[2];
    var tact = myArray[3];

    // alert(myArray[3])
    if (filenum.length !== 0) {
        // alert("tact in filereplace function" +tact);
        //   var rb_files =  document.getElementsByClassName('.custom-file-input')
        // var user_files  =  $('.imageInput')[0].files[0];
        // alert(user_files)

        // console.log("iamge",user_files)

        var formData = new FormData();
        // var user_rbfiles  =  $('.imageInput')[0].files[0]

        // var user_files = $('.imageInput')[id].files[0]; // Get the selected file

        formData.append('tact', tact); // Append the file to FormData
        formData.append('camp_id', camp_id); // Append the file to FormData
        formData.append('filenum', filenum); // Append the file to FormData
        formData.append('oldfname', oldfname); // Append the file to FormData
        // formData.append('user_rbfiles', user_rbfiles); // Append the file to FormData

        $.ajax({
            type: 'POST',
            url: 'https://staging.webtechstar.com:7777/customEmp/image_remove', // Replace with your server-side script URL
            data: formData,
            camp_id: camp_id,
            tact: tact,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Set content type to false, as we are using FormData
            success: function(response) {
                // Handle the server's response here
                //  $('.wrap_new').html('<p class="alert alert-success">Image Upload successfully..</p>').fadeOut(3000)
                // $("#container11").hide();
                //   $("#fileviewbox").hide();
                //   alert(response)

                $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
                $('#leftnav').DataTable().ajax.reload();
                $('#apptask').DataTable().ajax.reload();
                $('#task_priorities').DataTable().ajax.reload();
                $('#todaysstask').DataTable().ajax.reload();
                $('#weeklytasks').DataTable().ajax.reload();
                setTimeout(function() {
                    $('#message').html('');
                }, 5000);
                $('#action_modal').modal('hide'); // for hide root modal
                $('#form_id')[0].reset();

            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error(xhr.responseText);
            }
        });
    } else {
        $('.comment').html('<p class="alert alert-primary">Please upload only two Images..</p>').fadeOut(4000);

    }
}



function profileView(e) { //  start code for view profile data //

    // var date = $('#date').val();
    var user_id = $(e).data('id');



    $.ajax({
        url: "https://staging.webtechstar.com:7777/customEmp/action",
        method: "POST",
        data: {
            user_id: user_id,
            action: 'fetch_single_Profile'
        },

        dataType: "JSON",
        success: function(data) {

            $('#first_namep').val(data.first_name);
            $('#last_namep').val(data.last_name);
            $('#emailp').val(data.email);
            $('#phonep').val(data.phone);
            $('#user_namep').val(data.user_name);

            // $('#date').val(data.date);
            // $('#user_id').val(data.user_id);
            $('#table_data').DataTable().ajax.reload();

        }
    });
};



function singlecomment(e) {


    var id = $(e).data('id');
    var tact = $(e).data('tact');

    var sendComment = $(".modal-body").find(`[name = "sendComment"][data-id='${id}']`).val();


    // var sendComment = $('[name = "sendComment"]').val();



    $.ajax({
        url: "https://staging.webtechstar.com:7777/customEmp/singleComment",
        method: "POST",
        data: {
            id: id,
            sendComment: sendComment,
            tact: tact,

        },


        success: function(data) {
            if (data) {
                $('.comment').html('<p class="alert alert-success">' + data.message + '</p>').fadeOut(4000);
                $('#sendForm').trigger('reset')
                $(`#${tact}`).modal("hide");
                $('#leftnav').DataTable().ajax.reload();
                $('#apptask').DataTable().ajax.reload();

                // $('#sendForm').modal("hide");
                //  $('#sendForm').trigger('reset');
                // alert("data   inserted");
            } else {
                alert("data  not inserted");
            }

        }

    })
}