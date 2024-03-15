
$(document).ready(function () {
  



  // code end for fetch sender details after selecting client name


  // Code start for All Task
  var dataTable = $('#apptask').DataTable({
    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'order': [[0, 'desc']],
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_data',

    },

    'aaSorting': [],
    'columns': [
      { data: 'balst_dt' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
         
     
          console.log("tact before if  is" +row.tact);


          if (row.tact == "Email Blast / Reminder Blast") {
            var tact = "Email-Reminder-Blast";
            var showtact="Reminder Blast";
            var showcmt=row.rb_comment;

          
          }

          if (row.tact == "Email Blast") {
          
            var tact = "Email-Blast";
            var showtact="Email Blast";
            var showcmt=row.comment;
          }

           if (row.tact == "Make Good") {
          
            var tact = "Make-Good";
            var showtact="Make Good";
            var showcmt=row.admin_ebmgcmt;
          }
           if (row.tact == "RB Make Good") {
          
            var tact = "RB-Make-Good";
            var showtact="RB Make Good";
            var showcmt=row.admin_rbmgcmt;


          }


          if (row.tact == "Webinar") {
           
            var tact = "Webinar";
            var showtact="Webinar";
            var showcmt=row.webinar_comment;
          }

console.log("tact is" +tact);

console.log("admin_ebmgfiles File" +row.admin_ebmgfiles);

const htmlbutton=`<button type="button" style="display:none" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
           
           
<button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + " ---- " + row.status + " ---- " + row.allocated_to + " ---- " + row.blast_date + " ---- " + row.rb_type + " ---- " + row.rb_date + " ---- " + row.blast_time + " ---- " + tact + " ---- "  + row.mg_date + " ---- " + row.mg_time + " ---- " + row.mg_status + " ---- " + row.rb_mg_date + " ---- " + row.rb_mg_time + " ---- " + row.rb_mg_status + " ---- " + row.rbstatus + " ---- " + row.mgasset_name + " ---- " + row.mgasset_link + " ---- " + row.rb_assetname + " ---- " + row.rb_assetlink + " ---- " + row.rb_time +`" ><i class="fa fa-pencil"></i></button>

<button type="button" class="btn btn-link btn-sm view1" data-id ="`+ row.id + " " + row.status + " " + row.allocated_to + " " + row.blast_date + `"><i class="fa fa-eye"></i></button>

  <button type="button" class="open-homeEvents btn btn-link btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ row.id + "---" + row.status + "---" + row.allocated_to + "---" + row.blast_date + "---" + row.rb_type + "---" + row.rb_date + "---" + row.blast_time + "---" + tact + "---" + showtact + "---" + showcmt +`"><i class="fa fa-comment"></i></button></button>


  <form id = "sample_form"  enctype="multipart/form-data">
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="form-floating">
      <p id="insertfilemsg"></p>
       
      <input type="hidden" name="camp_id" id="camp_id"/ >
      <input type = "hidden" id ="blast_type" id="blast_type"/  >
      <input type = "hidden" id ="tact" name="tact"/  >
      <input type = "text" id ="showtactics" name="showtactics" style="border: none; font-size: 18px; font-weight: bold; color: red;"/  >
      <input type = "hidden" id ="status"   >

   
      <input type = "hidden" id ="comment_id"  data-id = " ` + row.comment_id + `" >
      <input type = "hidden" id ="rbstatus"  data-id = " ` + row.rbstatus + `" >
     
      
 
   
      <textarea class="form-control"  id = "comment" name = "comment"  id="floatingTextarea">`+showcmt+`</textarea>
      <span>Add Comment...</span>
      <br><br>
      
  
     
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="myFunction()" data-id="`+ row.id + "" + tact + ` ">Send Comment</button>
      </div>
    </div>
  </div>
</div>

</form>




`



          if (row.camp_id === null || (row.tact == "Email Blast / Reminder Blast" && row.admin_rb_file == "" ||  (row.admin_rb_file === "undefined"  || row.admin_rb_file == null ))|| (row.tact == "Email Blast" && (row.admin_files == "" ||  (row.admin_files === "undefined" || row.admin_files == null) ))|| (row.tact == "Make Good" && (row.admin_ebmgfiles == "" ||  (row.admin_ebmgfiles === "undefined" || row.admin_ebmgfiles == null) ))|| (row.tact == "RB Make Good" && (row.admin_rbmgfiles == "" ||  (row.admin_rbmgfiles === "undefined" || row.admin_rbmgfiles == null) ))  || (row.tact == "Webinar" && (row.admin_files == "" ||  (row.admin_files === "undefined"  || row.admin_files == null ) ))  ) 

          {



            return `
           
            ${htmlbutton} <button type="button" style="display:none"   class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `"><i class="fa fa-upload"></i></button>   <button type="button" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#fileinsertModal" data-id="`+ row.id + "---" + row.status + "---" + row.allocated_to + "---" + row.blast_date + "---" + row.rb_type + "---" + row.rb_date + "---" + row.blast_time + "---" + tact + "---" + showtact + "---" + showcmt +`"><i class="fa fa-upload"></i></button>

                
<form id = "imginsert_form"  enctype="multipart/form-data">
<div class="modal fade" id="fileinsertModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="form-floating">
      <p id="insertfilemsg"></p>
      <p ><h5 style="color:red">`+ showtact +`</h5></p>
      <input type="hidden" name="camp_id" id="camp_id"/ >
      <input type = "hidden" id ="blast_type" id="blast_type"/  >
      <input type = "hidden" id ="tact" name="tact"/  >
      <input type = "hidden" id ="status"   >

      <input type = "hidden" id ="comment_id"  data-id = " ` + row.comment_id + `" >
      <input type = "hidden" id ="rbstatus"  data-id = " ` + row.rbstatus + `" >
      
      
      <input type = "text" id ="showtactics" name="showtactics" style="border: none; font-size: 18px; font-weight: bold; color: red;"/  >
    
      
      <br>
    
      
    <input type = "file" class="form-control" name = "admin_files[]" id = "admin_files"  multiple>
      <span >(upload max 5 files)</span>
     
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="imginsert1()" data-id="`+ row.id + " " + tact + ` ">Send Comment</button>
      </div>
    </div>
  </div>
</div>

</form>                            
              `;
        
          }

          else{

           
            return `
            
            ${htmlbutton} <button type="button"    class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `"><i class="fa fa-upload"></i></button>

                          
              `;
          }

          

         

        }
      }


    ]


  });


  /* End code for All Task */


  /* Start code for priority Task */

  var dataTable = $('#task_priorities').DataTable({



    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_prioritydata',

    },

    'aaSorting': [],
    'columns': [

      // { "mData": 0 , //or address field
      // "mRender" : function ( data, type, full ) { 
      // //data = mData
      // //full is the full array address= [0] city = [1] state=[2] zip=[3] 
      //    return data+', '+blast_date+', '+blast_time;}
      //  },
      { data: 'blast_date1' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
          
          if (row.tact == "Email Blast / Reminder Blast") {
            var tact = "Email-Reminder-Blast";

          
          }

          if (row.tact == "Email Blast") {
          
            var tact = "Email-Blast";
          }

           if (row.tact == "Make Good") {
          
            var tact = "Make-Good";
          }
           if (row.tact == "RB Make Good") {
          
            var tact = "RB-Make-Good";
          }


          if (row.tact == "Webinar") {
           
            var tact = "Webinar";
          }


          return `
                    
          <button type="button" style="display:none" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
                   
                   
          <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + " ---- " + row.status + " ---- " + row.allocated_to + " ---- " + row.blast_date + " ---- " + row.rb_type + " ---- " + row.rb_date + " ---- " + row.blast_time + " ---- " + tact + " ---- "  + row.mg_date + " ---- " + row.mg_time + " ---- " + row.mg_status + " ---- " + row.rb_mg_date + " ---- " + row.rb_mg_time + " ---- " + row.rb_mg_status + " ---- " + row.rbstatus + " ---- " + row.mgasset_name + " ---- " + row.mgasset_link + " ---- " + row.rb_assetname + " ---- " + row.rb_assetlink + " ---- " + row.rb_time +`"><i class="fa fa-pencil"></i></button>

          <button type="button" class="btn btn-link btn-sm view1" data-id ="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                      
                      `;
        }
      }


    ]


  });

  /* End code for priority Task */






  /* Start code for Today's Task */

  var dataTable = $('#todaysstask').DataTable({
    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_todaytaskdata',

    },

    'aaSorting': [],
    'columns': [

      { data: 'blast_date1' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {

          if (row.tact == "Email Blast / Reminder Blast") {
            var tact = "Email-Reminder-Blast";

          
          }

          if (row.tact == "Email Blast") {
          
            var tact = "Email-Blast";
          }

           if (row.tact == "Make Good") {
          
            var tact = "Make-Good";
          }
           if (row.tact == "RB Make Good") {
          
            var tact = "RB-Make-Good";
          }


          if (row.tact == "Webinar") {
           
            var tact = "Webinar";
          }

          
          return `
                    
          <button type="button" style="display:none" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
                   
                   
          <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + " ---- " + row.status + " ---- " + row.allocated_to + " ---- " + row.blast_date + " ---- " + row.rb_type + " ---- " + row.rb_date + " ---- " + row.blast_time + " ---- " + tact + " ---- "  + row.mg_date + " ---- " + row.mg_time + " ---- " + row.mg_status + " ---- " + row.rb_mg_date + " ---- " + row.rb_mg_time + " ---- " + row.rb_mg_status + " ---- " + row.rbstatus + " ---- " + row.mgasset_name + " ---- " + row.mgasset_link + " ---- " + row.rb_assetname + " ---- " + row.rb_assetlink + " ---- " + row.rb_time +`"><i class="fa fa-pencil"></i></button>

          <button type="button" class="btn btn-link btn-sm view1" data-id ="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                      `;
        }
      }


    ]


  });

  /* End code for Today's Task */






  /* Start code for Weekly Task */

  var dataTable = $('#weeklytasks').DataTable({
    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_weeklytaskdata',

    },

    'aaSorting': [],
    'columns': [

      { data: 'blast_date1' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {

          
          if (row.tact == "Email Blast / Reminder Blast") {
            var tact = "Email-Reminder-Blast";

          
          }

          if (row.tact == "Email Blast") {
          
            var tact = "Email-Blast";
          }

           if (row.tact == "Make Good") {
          
            var tact = "Make-Good";
          }
           if (row.tact == "RB Make Good") {
          
            var tact = "RB-Make-Good";
          }


          if (row.tact == "Webinar") {
           
            var tact = "Webinar";
          }

console.log("tact is" +tact);


          return `
                    
          <button type="button" style="display:none" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
                   
                   
          <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + " ---- " + row.status + " ---- " + row.allocated_to + " ---- " + row.blast_date + " ---- " + row.rb_type + " ---- " + row.rb_date + " ---- " + row.blast_time + " ---- " + tact + " ---- "  + row.mg_date + " ---- " + row.mg_time + " ---- " + row.mg_status + " ---- " + row.rb_mg_date + " ---- " + row.rb_mg_time + " ---- " + row.rb_mg_status + " ---- " + row.rbstatus + " ---- " + row.mgasset_name + " ---- " + row.mgasset_link + " ---- " + row.rb_assetname + " ---- " + row.rb_assetlink + " ---- " + row.rb_time +`"><i class="fa fa-pencil"></i></button>

          <button type="button" class="btn btn-link btn-sm view1" data-id ="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                      
                      `;
        }
      }


    ]


  });



  /* End code for This week Task */



  $('#add_data').click(function () {

    

    $('#dynamic_modal_title').text('Add Data');

    $('#task_form')[0].reset();
    
    var btn = $('#action_button').text('Add');

    console.log("add_data clicked btn:"+btn.text());

    
    $('#action').val('Add');

    $('#action_button').text('Add');

    $('#action_modal').modal('show');

    $("#addcname").show();
    $("#tactebweb option").prop('disabled', false);

    $('#action_button').text('Add').show();


    

    $("#fileviewbox").hide();
    $("#webinarblast").hide();
    $("#editdataa").hide();
    // code start for select tact
    if (btn.text() == 'Add') {

      console.log("within id add btn")
      $('#error_Tact').show();
      $('#cname_error').show();
      $('#camp_error').show();
      $('#camp_from_error').show();
      $('#blast_error').show();
      $('#error_priority').show();
      $('#error_allocated').show();

      $('#error_blast_type').show();
      $('#error_blast_type').show();
      $('#error_blast_type').show();


      $("#tactics").show();
      $("#viewdata11").hide();
      $("#webinarassets12").hide();

      $("#tactebweb").change(function () {
       

        if (this.value == 'e_blast') {
          $("#webinarblast").hide();
          $("#editdataa").show();
          $("#fileviewbox").hide();



         

          $('#cname').on('change', function () {
            // var id = request.body.id;

            $("#addcname").show();
            $("#eblst_type").show();
            $("#reblst_type").hide();
            $("#reblst").hide();

            var cname = $("#cname").val();
            var cname = $(this).val();
           
            if ($(this).val()) {
            
              $("#senerdtl").show();
            
              $.ajax({
                url: "http://localhost:3000/alltask/action",
                method: "POST",
                data: { cname: cname, action: 'fetch_senderdtladd' },

                dataType: "JSON",
                success: function (data) {
                  $('#cname').val(data.cid);
                  $('#sender_name').val(data.sender_name);
                  $('#sender_email').val(data.sender_email);

                  // $('#id').val(data.id);

                  setTimeout(function () {
                    $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
                    $('#message').html('');
                  }, 5000);

                }
              });



              // $("#reblastassets").hide();

            }
            else {
              // $("#asset_name").show();
              $("#senerdtl").hide();


            }
          });

          var action = $("#action").val();
         
          if (action === "Add") {


           


            $("#tactebweb option").prop('disabled', false);


            $('#blast_type11').on('change', function () {
              // var id = request.body.id;
            


              var blast_type = $("#blast_type11").val();
              var blast_type = $(this).val();

           

              //if(action=="Add") 



              if (blast_type == "E-blast") {
               
                $("#assets").show();
                $("#reblastassets").hide();
                $("#ebassets").hide();
                $("#mkgoodassets").hide();
                $('#asset_name')[0].disabled = false;
                $('#asset_link')[0].disabled = false;
                $('#blast_date')[0].disabled = false;
                $('#blast_time')[0].disabled = false;

              }

              else if (blast_type == 'Reminder-Blast') {
           
                $("#reblastassets").hide();
                $("#assets").hide();
                $("#ebassets").hide();
              }


              else {
                // $("#asset_name").show();
                $("#reblastassets").hide();
                $("#assets").hide();
                $("#ebassets").hide();
              }



            });


          
            $("#addcname").show();
            $("#ebassets").hide();
            $("#reblastassets").hide();
            $("#viewdata11").hide();
            $("#editdataa").show();
            $("#fileviewbox").hide();

            $("#eblst_type").show();
            $("#reblst_type").hide();
            $("#reblst").hide();
            $("#eblst1").show();
            $("#assets").hide();
            var today = new Date();
           


            function addMinutes(date, minutes) {
              date.setMinutes(date.getMinutes() + minutes);

              return date;
            }

            const currentDate = new Date();

            //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

            const result1 = addMinutes(currentDate, 30);
       
            //  var dd = String(today.getDate()).padStart(2, '0');
            //   var mm = String(today.getMonth() + 1).padStart(2, '0');
            //   var yyyy = today.getFullYear();

            //   today = yyyy + '-' + mm + '-' + dd;


            var ddcurrent = String(result1.getDate()).padStart(2, '0');
            var mmcurrent = String(result1.getMonth() + 1).padStart(2, '0');
            var yyyycurrent = result1.getFullYear();

            var updatedcurrentdate = yyyycurrent + '-' + mmcurrent + '-' + ddcurrent;






            var dd1 = String(result1.getDate()).padStart(2, '0');
            var mm1 = String(result1.getMonth() + 1).padStart(2, '0');
            var yyyy1 = result1.getFullYear();

            var updateddate = yyyy1 + '-' + mm1 + '-' + dd1;


            var hours = result1.getHours();
            var minutes = result1.getMinutes();
            var seconds = result1.getSeconds();

            var updatedtime = hours + ":" + minutes + ":" + seconds;
          

            $('#blast_date').attr('min', updateddate);

            $(function () {
              $('#blast_time').timepicker({
                'timeFormat': 'h:i A',
                step: 1
              });
            });

            $("#blast_date").change(function () {
             
              var today = updatedcurrentdate;
           

              $("#blast_time").val('');
              if (this.value === today) {
                var thisHour = getCurrentTime(new Date());
              
                var updatedtime = hours + ":" + minutes;
                $('#blast_time').timepicker('option', 'minTime', updatedtime);
                $('#blast_time').timepicker('option', 'maxTime', '11:59 PM');

              }
              else {
                $('#blast_time').timepicker('option', 'minTime', '12:00 AM');
                $('#blast_time').timepicker('option', 'maxTime', '11:30 PM');
              }

            });

            function getCurrentTime(date) {
              var hours = date.getHours(),
                minutes = date.getMinutes(),
                ampm = hours >= 12 ? 'PM' : 'AM';

              if (minutes > 30) {
                minutes = "00";
                hours++;
              }
              else {
                minutes = "00";
              }
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'


              return hours + ':' + minutes + ' ' + ampm;




            }

           

            if (updateddate == updatedcurrentdate) {
              // {
              //   $("#blast_time").ejTimePicker({
              //     minTime: updatedtime, // Start time as minimumTime.

              // });


            }



          }




        }

        else if (this.value == 'webinar') {

          $("#webinarblast").show();
          $("#editdataa").hide();
      



          var today1 = new Date();
       


          function addMinutes(date, minutes) {
            date.setMinutes(date.getMinutes() + minutes);

            return date;
          }

          const currentDate1 = new Date();

          //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

          const result11 = addMinutes(currentDate1, 30);
       


          var ddcurrent1 = String(result11.getDate()).padStart(2, '0');
          var mmcurrent1 = String(result11.getMonth() + 1).padStart(2, '0');
          var yyyycurrent1 = result11.getFullYear();

          var updatedcurrentdate1 = yyyycurrent1 + '-' + mmcurrent1 + '-' + ddcurrent1;

       

          var dd11 = String(result11.getDate()).padStart(2, '0');
          var mm11 = String(result11.getMonth() + 1).padStart(2, '0');
          var yyyy11 = result11.getFullYear();

          var updateddate11 = yyyy11 + '-' + mm11 + '-' + dd11;

       

          var hours1 = result11.getHours();
          var minutes1 = result11.getMinutes();
          var seconds1 = result11.getSeconds();

          var updatedtime111 = hours1 + ":" + minutes1 + ":" + seconds1;
       

          $('#registration_date').attr('min', updateddate11);

          $(function () {
            $('#registration_time').timepicker({
              'timeFormat': 'h:i A',
              step: 1
            });
          });

          $("#registration_date").change(function () {
          
            var today11 = updateddate11;
           

            $("#registration_time").val('');
            if (this.value === today11) {
              var thisHour = getCurrentTime(new Date());
             
              var updatedtime = hours1 + ":" + minutes1;
            
              $('#registration_time').timepicker('option', 'minTime', updatedtime);
              $('#registration_time').timepicker('option', 'maxTime', '11:59 PM');

            }
            else {
              $('#registration_time').timepicker('option', 'minTime', '12:00 AM');
              $('#registration_time').timepicker('option', 'maxTime', '11:30 PM');
            }

          });

          function getCurrentTime(date) {
            var hours = date.getHours(),
              minutes = date.getMinutes(),
              ampm = hours >= 12 ? 'PM' : 'AM';

            if (minutes > 30) {
              minutes = "00";
              hours++;
            }
            else {
              minutes = "00";
            }
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'


            return hours + ':' + minutes + ' ' + ampm;




          }

        
        }

        else {
          $("#webinarblast").hide();
          $("#editdataa").hide();
      
        }

      });

     
    }

    //code end for select tact


    else {

      // $("#viewdata11").show();
    }







  });


// start code for geo



$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name]) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};
//end code geo


  $('#task_form').on('submit', function (event) {

    event.preventDefault();


    $.ajax({

      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: $('#task_form').serialize(),
      dataType: "json",
      beforeSend: function () {
        //$('#action_button').attr('disabled', 'disabled');
      },

      success: function (data) {
        $('#message').html('<div class="alert alert-success">' + data.message + '</div>');

        $('#action_button').attr('disabled', false);
        $('#leftnav').DataTable().ajax.reload();
        $('#apptask').DataTable().ajax.reload();
        $('#task_priorities').DataTable().ajax.reload();
        $('#todaysstask').DataTable().ajax.reload();
        $('#weeklytasks').DataTable().ajax.reload();

        
        // $('#task_priorities').DataTable().ajax.reload();


        $('#action_modal').modal('hide');



        setTimeout(function () {
          $('#message').html('');
        }, 5000);



      }

    });

  });



  // Code End For View Data





  //Code start for Edit Data
  $('#edit_data').click(function () {


    $('#dynamic_modal_title').text('Edit Data');

    $('#action').val('Edit');

    $('#action_button').text('Edit');

    $('#action_modal').modal('show');
    console.log("edit modal opened")

  });


  $(document).on('click', '.edit', function () {

console.log("clicked on edit btn");




    //  var id = $(this).data('id');

    $('#dynamic_modal_title').text('Edit Data');

    $('#action').val('Edit');

    $('#action_button').text('Edit');

    $('#action_modal').modal('show');
    $("#tactics").show();

    var btn = $('#action_button').text('Edit');

    var checktect = btn.text();
  

    if (btn.text() === "Edit") {
      $("#mkgoodassets").hide();
      $('#cname_error').hide();
      $('#camp_error').hide();
      $('#camp_from_error').hide();
      $('#blast_error').hide();
      $('#error_priority').hide();
      $('#error_allocated').hide();
      $('#error_Tact').hide();
      $('#error_blast_type').hide();
      $('#action_button').text('Edit').show();
  
    }

    else {

      $('#cname_error').show();
      $('#camp_error').show();
      $('#camp_from_error').show();
      $('#blast_error').show();
      $('#error_priority').show();
      $('#error_allocated').show();
      $('#error_Tact').show();
      $('#error_blast_type').show();
      


      //  $('#action_button').text('view').hide();
    }


    $("#reblastassets").hide();
    $("#ebassets").hide();
    $("#assets").hide();
    $("#reblastassets").hide();

    $("#remblastassetsread").hide();

    $('#blast_typerr').prop('selectedIndex', 1);

    // var action = $("#action").val();

    var action = $("#action").val();
    if (action === "Edit") {
    
      $("#tactebweb option").prop('disabled', true);

      $("#rballocated_to option").prop('disabled', false);
      $("#editcname").show();
      $("#reblst").show();
      $("#viewdata").hide();
      $("#editdataa").show();
      $("#fileviewbox").hide();
      $("#eblst_type").hide();
      $("#reblst_type").show();

      $('#asset_name')[0].disabled = false;
      $('#asset_link')[0].disabled = false;
      $('#blast_date')[0].disabled = false;
      $('#blast_time')[0].disabled = false;

      //Code start for Reminder Blast Date and Time for Edit

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

      var todaycheck = new Date();
      var datecheck = todaycheck.getFullYear() + '-' + (todaycheck.getMonth() + 1) + '-' + todaycheck.getDate();
      var timecheck = todaycheck.getHours() + ":" + todaycheck.getMinutes() + ":" + todaycheck.getSeconds();
      var dateTimecheck = datecheck + ' ' + timecheck;

      //$('#blast_date').attr('min',today);
      $('#rb_date').attr('min', today);


      //code start for add 300min on current time
      function addMinutesrb(date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);

        return date;
      }

      const currentDate = new Date();


      const resultrbdt = addMinutesrb(currentDate, 30);
     
      var dd2 = String(resultrbdt.getDate()).padStart(2, '0');
      var mm2 = String(resultrbdt.getMonth() + 1).padStart(2, '0');
      var yyyy2 = resultrbdt.getFullYear();

      var updatedrbdate = yyyy2 + '-' + mm2 + '-' + dd2;
      $('#rb_date').attr('min', updatedrbdate);

      //Code End for Blast Date and Time for Edit


      //Code start for Blast Date and Time for Edit

      var today = new Date();
    


      function addMinutes(date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);

        return date;
      }

      const currentDaterb = new Date();

      //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

      const resulteb = addMinutes(currentDaterb, 30);
    

      var ddcurrenteb = String(resulteb.getDate()).padStart(2, '0');
      var mmcurrenteb = String(resulteb.getMonth() + 1).padStart(2, '0');
      var yyyycurrenteb = resulteb.getFullYear();

      var updatedcurrentdateeb = yyyycurrenteb + '-' + mmcurrenteb + '-' + ddcurrenteb;






      var ddeb = String(resulteb.getDate()).padStart(2, '0');
      var mmeb = String(resulteb.getMonth() + 1).padStart(2, '0');
      var yyyyeb = resulteb.getFullYear();

      var updateddateeb = yyyyeb + '-' + mmeb + '-' + ddeb;


      var hourseb = resulteb.getHours();
      var minuteseb = resulteb.getMinutes();
      var secondseb = resulteb.getSeconds();

      var updatedtimeeb = hourseb + ":" + minuteseb + ":" + secondseb;
     

      $('#blast_date').attr('min', updateddateeb);

      $(function () {
        $('#blast_time').timepicker({
          'timeFormat': 'h:i A',
          step: 1
        });
      });





      $("#blast_date").change(function () {
       
        var today = updateddateeb;
    

        $("#blast_time").val('');
        if (this.value === today) {
          var thisHour = getCurrentTime(new Date());
        
          var updatedtimeeb = hourseb + ":" + minuteseb;
        
          $('#blast_time').timepicker('option', 'minTime', updatedtimeeb);
          $('#blast_time').timepicker('option', 'maxTime', '11:59 PM');

        }
        else {
          $('#blast_time').timepicker('option', 'minTime', '12:00 AM');
          $('#blast_time').timepicker('option', 'maxTime', '11:30 PM');
        }

      });

      function getCurrentTime(date) {
        var hours = date.getHours(),
          minutes = date.getMinutes(),
          ampm = hours >= 12 ? 'PM' : 'AM';

        if (minutes > 30) {
          minutes = "00";
          hours++;
        }
        else {
          minutes = "00";
        }
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'


        return hours + ':' + minutes + ' ' + ampm;


      }


      //Code End for E-Blast Date and Time for Edit
      var chektmeb= $("#blast_time").val('');
      console.log("chektmeb:" +chektmeb)

      //  code start for add 30 min on Reminder blast time
      function addMinutes(date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);

        return date;
      }

      const currentDate1 = new Date();

      //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

      const result1 = addMinutes(currentDate1, 30);
   


      var ddcurrent = String(result1.getDate()).padStart(2, '0');
      var mmcurrent = String(result1.getMonth() + 1).padStart(2, '0');
      var yyyycurrent = result1.getFullYear();

      var updatedcurrentdaterb = yyyycurrent + '-' + mmcurrent + '-' + ddcurrent;


      var hours = result1.getHours();
      var minutes = result1.getMinutes();
      var seconds = result1.getSeconds();

      var updatedtime = hours + ":" + minutes + ":" + seconds;
    

      $(function () {
        $('#rb_time').timepicker({
          'timeFormat': 'h:i A',
          step: 1
        });
      });

      $("#rb_date").change(function () {
       
        var today1 = updatedcurrentdaterb;
      

        $("#rb_time").val('');
        if (this.value === today1) {
          var thisHour = getCurrentTime(new Date());
      
          var updatedtime = hours + ":" + minutes;

          console.log("RB Updated time:" +updatedtime)
          $('#rb_time').timepicker('option', 'minTime', updatedtime);
          $('#rb_time').timepicker('option', 'maxTime', '11:59 PM');

        }
        else {
          $('#rb_time').timepicker('option', 'minTime', '12:00 AM');
          $('#rb_time').timepicker('option', 'maxTime', '11:30 PM');
        }

      });

      function getCurrentTime(date) {
        var hours = date.getHours(),
          minutes = date.getMinutes(),
          ampm = hours >= 12 ? 'PM' : 'AM';

        if (minutes > 30) {
          minutes = "00";
          hours++;
        }
        else {
          minutes = "00";
        }
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'


        return hours + ':' + minutes + ' ' + ampm;




      }

      // code end for add 30 min on Reminder blast time






   //  code start for add 30 min on make good time

   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0');
   var yyyy = today.getFullYear();

   today = yyyy + '-' + mm + '-' + dd;

   var todaycheck = new Date();
   var datecheck = todaycheck.getFullYear() + '-' + (todaycheck.getMonth() + 1) + '-' + todaycheck.getDate();
   var timecheck = todaycheck.getHours() + ":" + todaycheck.getMinutes() + ":" + todaycheck.getSeconds();
   var dateTimecheck = datecheck + ' ' + timecheck;

   //$('#blast_date').attr('min',today);
   $('#mg_date').attr('min', today);


   //code start for add 300min on current time
   function addMinutesmg(date, minutes) {
     date.setMinutes(date.getMinutes() + minutes);

     return date;
   }

   const currentmgdate = new Date();


   const resultmgdt = addMinutesmg(currentmgdate, 30);
  
   var dd2 = String(resultrbdt.getDate()).padStart(2, '0');
   var mm2 = String(resultrbdt.getMonth() + 1).padStart(2, '0');
   var yyyy2 = resultrbdt.getFullYear();

   var updatedmgdate = yyyy2 + '-' + mm2 + '-' + dd2;
   $('#mg_date').attr('min', updatedmgdate);


   function addMinutesmg(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);

    return date;
  }

  const currentDatemkgood = new Date();

  //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

  const resultmkgood = addMinutes(currentDatemkgood, 30);



  var ddcurrent1 = String(resultmkgood.getDate()).padStart(2, '0');
  var mmcurrent1 = String(resultmkgood.getMonth() + 1).padStart(2, '0');
  var yyyycurrent1= resultmkgood.getFullYear();

  var updatedcurrentmkgood = yyyycurrent1 + '-' + mmcurrent1 + '-' + ddcurrent1;


  var hours1 = resultmkgood.getHours();
  var minutes1 = resultmkgood.getMinutes();
  var seconds1 = resultmkgood.getSeconds();

  var updatedtime = hours1 + ":" + minutes1 + ":" + seconds1;


  $(function () {
    $('#mg_time').timepicker({
      'timeFormat': 'h:i A',
      step: 1
    });
  });

  $("#mg_date").change(function () {
   
    var todaymkgood = updatedcurrentmkgood;
  

    $("#mg_time").val('');
    if (this.value === todaymkgood) {
      var thisHourmkgood = getCurrentTime(new Date());
  
      var updatedtimemkgood = hours1 + ":" + minutes1;
      $('#mg_time').timepicker('option', 'minTime', updatedtimemkgood);
      $('#mg_time').timepicker('option', 'maxTime', '11:59 PM');

    }
    else {
      $('#mg_time').timepicker('option', 'minTime', '12:00 AM');
      $('#mg_time').timepicker('option', 'maxTime', '11:30 PM');
    }

  });
var chektm= $("#mg_time").val('');
  console.log("chektm:" +chektm)

  function getCurrentTime(date) {
    var hours = date.getHours(),
      minutes = date.getMinutes(),
      ampm = hours >= 12 ? 'PM' : 'AM';

    if (minutes > 30) {
      minutes = "00";
      hours++;
    }
    else {
      minutes = "00";
    }
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'


    return hours + ':' + minutes + ' ' + ampm;




  }

  // code end for add 30 min on make good time
      

      







   //  code start for add 30 min on RB make good time

   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0');
   var yyyy = today.getFullYear();

   today = yyyy + '-' + mm + '-' + dd;

   var todaycheck = new Date();
   var datecheck = todaycheck.getFullYear() + '-' + (todaycheck.getMonth() + 1) + '-' + todaycheck.getDate();
   var timecheck = todaycheck.getHours() + ":" + todaycheck.getMinutes() + ":" + todaycheck.getSeconds();
   var dateTimecheck = datecheck + ' ' + timecheck;

   //$('#blast_date').attr('min',today);
   $('#rb_mg_date').attr('min', today);


   //code start for add 300min on current time
   function addMinutesrbmg(date, minutes) {
     date.setMinutes(date.getMinutes() + minutes);

     return date;
   }

   const currentrbmgdate = new Date();


   const resultrbmgdt = addMinutesrbmg(currentrbmgdate, 30);
  
   var dd3 = String(resultrbmgdt.getDate()).padStart(2, '0');
   var mm3 = String(resultrbmgdt.getMonth() + 1).padStart(2, '0');
   var yyyy3 = resultrbmgdt.getFullYear();

   var updatedrbmgdate = yyyy3 + '-' + mm3 + '-' + dd3;
   $('#rb_mg_date').attr('min', updatedrbmgdate);



  var hours11 = resultrbmgdt.getHours();
  var minutes11 = resultrbmgdt.getMinutes();
  var seconds11 = resultrbmgdt.getSeconds();

  var updatedrbmgtime = hours11 + ":" + minutes11 + ":" + seconds11;


  $(function () {
    $('#rb_mg_time').timepicker({
      'timeFormat': 'h:i A',
      step: 1
    });
  });

  $("#rb_mg_date").change(function () {
   
    var todayrbmkgood = updatedrbmgdate;
  

    $("#rb_mg_time").val('');
    if (this.value === todayrbmkgood) {
      var thisHourmkgood = getCurrentTime(new Date());
  
      var updatedtimemkgood = hours11 + ":" + minutes11;
      $('#rb_mg_time').timepicker('option', 'minTime', updatedrbmgtime);
      $('#rb_mg_time').timepicker('option', 'maxTime', '11:59 PM');

    }
    else {
      $('#rb_mg_time').timepicker('option', 'minTime', '12:00 AM');
      $('#rb_mg_time').timepicker('option', 'maxTime', '11:30 PM');
    }

  });

  function getCurrentTime(date) {
    var hours = date.getHours(),
      minutes = date.getMinutes(),
      ampm = hours >= 12 ? 'PM' : 'AM';

    if (minutes > 30) {
      minutes = "00";
      hours++;
    }
    else {
      minutes = "00";
    }
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'


    return hours + ':' + minutes + ' ' + ampm;




  }

  // code end for add 30 min on make good time
      


  

      var idtype = $(this).data('id');
      const myArray = idtype.split(" ---- ");

      var id = myArray[0];
      var ebstatus = myArray[1];
      var eballocatedto = myArray[2];
      var blast_date = myArray[3];
      var rb_type = myArray[4];
      var rb_date = myArray[5];
      var blast_time = myArray[6];
      var tact = myArray[7];
      var mg_date = myArray[8];
      var mg_time = myArray[9];
      var mg_status = myArray[10];
      var rb_mg_date = myArray[11];
      var rb_mg_time = myArray[12];
      var rb_mg_status = myArray[13];
      var rbstatus = myArray[14];
      var mgasset_name = myArray[15];
      var mgasset_link = myArray[16];
      var rb_assetname = myArray[17];
      var rb_assetlink = myArray[18];
      var rb_time = myArray[19];


      var eblastdttime = blast_date + ' ' + blast_time;



      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;




    }

    else {
      $("#tactebweb option").prop('disabled', false);

    }



    $('#cname').on('change', function () {


      var cname = $("#cname").val();
      var cname = $(this).val();

      if ($(this).val()) {
       
        $("#senerdtl").show();
     
        $.ajax({
          url: "http://localhost:3000/alltask/action",
          method: "POST",
          data: { id: id, cname: cname, action: 'fetch_senderdtl' },

          dataType: "JSON",
          success: function (data) {
          

            // $('#cname').val(data.cname);
            $('#sender_name').val(data.sender_name);
            $('#sender_email').val(data.sender_email);

            // $('#id').val(data.id);

            setTimeout(function () {
              $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
              $('#message').html('');
            }, 5000);

          }
        });





      }
      else {
        // $("#asset_name").show();
        $("#senerdtl").hide();


      }
    });


console.log("check tact:" +tact);


    if (tact === "Webinar") {

      $("#editdataa").hide();
      $("#webinarblast").show();

      if (today > blast_date && blast_date != "") {
       
        $('input').attr('readonly', true);
        $('select').attr('readonly', true);
        $('textarea').attr('readonly', true);
        $("#rb_date").removeAttr("min");
        $("#blast_date").removeAttr("min");
        $('#action_button').text('Edit').hide();

      }
      else {
   
        $('input').attr('readonly', false);
        $('select').attr('readonly', false);
        $('textarea').attr('readonly', false);

        $('#action_button').text('Edit').show();
      }


      $('#registration_date').attr('min', today);

      //  code start for add 30 min on webinar time
      function addMinutes2(date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);

        return date;
      }

      const currentDate11 = new Date();

      //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

      const result12 = addMinutes2(currentDate11, 30);
   


      var ddcurrent12 = String(result12.getDate()).padStart(2, '0');
      var mmcurrent12 = String(result12.getMonth() + 1).padStart(2, '0');
      var yyyycurrent12 = result12.getFullYear();

      var updatedcurrentdatewebinar = yyyycurrent12 + '-' + mmcurrent12 + '-' + ddcurrent12;


      var hours12 = result12.getHours();
      var minutes12 = result12.getMinutes();
      var seconds12 = result12.getSeconds();

      var updatedtime12 = hours12 + ":" + minutes12 + ":" + seconds12;
   

      $(function () {
        $('#registration_time').timepicker({
          'timeFormat': 'h:i A',
          step: 1
        });
      });

      $("#registration_date").change(function () {
     
        var today12 = updatedcurrentdatewebinar;
     

        $("#registration_time").val('');
        if (this.value === today12) {
          var thisHour12 = getCurrentTime(new Date());
        
          var updatedtime12 = hours12 + ":" + minutes12;
          $('#registration_time').timepicker('option', 'minTime', updatedtime12);
          $('#registration_time').timepicker('option', 'maxTime', '11:59 PM');

        }
        else {
          $('#registration_time').timepicker('option', 'minTime', '12:00 AM');
          $('#registration_time').timepicker('option', 'maxTime', '11:30 PM');
        }

      });

      function getCurrentTime(date) {
        var hours12 = date.getHours()
        var minutes12 = date.getMinutes(),
          ampm = hours12 >= 12 ? 'PM' : 'AM';

        if (minutes12 > 30) {
          minutes12 = "00";
          hours12++;
        }
        else {
          minutes12 = "00";
        }
        hours12 = hours12 % 12;
        hours12 = hours12 ? hours12 : 12; // the hour '0' should be '12'


        return hours12 + ':' + minutes12 + ' ' + ampm;




      }

      // code end for add 30 min on Webinar time

      $("#editdataa").hide();
      $("#webinarblast").show();
    }


    else  {
console.log("within else11111111")
      $("#editdataa").show();
      $("#fileviewbox").hide();
      $("#webinarblast").hide();



      if (today > blast_date && today > rb_date && blast_date != "" && rb_date != "") {

// if(today > rb_mg_date && rb_mg_date != "" && rb_mgasset_name!="")

// {
//   $('input').attr('readonly', true);
//   $('select').attr('readonly', true);
//   $('textarea').attr('readonly', true);
//   $("#rb_date").removeAttr("min");
//   $("#blast_date").removeAttr("min");
//   $('#action_button').text('Edit').hide();
// }
     
        // $('input').attr('readonly', true);
        // $('select').attr('readonly', true);
        // $('textarea').attr('readonly', true);
        // $("#rb_date").removeAttr("min");
        // $("#blast_date").removeAttr("min");
        // $('#action_button').text('Edit').hide();

      }
      else {
        $('#action_button').text('Edit').show();
        $('input').attr('readonly', false);
        $('select').attr('readonly', false);
        $('textarea').attr('readonly', false);

      }

      $("#editdataa").show();
      $("#fileviewbox").hide();
      $("#webinarblast").hide();
    }

    // else{
    //   $("#editdataa").hide();
    //   $("#webinarblast").hide();
    // }

   



        

    if (action === "Edit") {

     
      console.log("rb rb_date:" +rb_date);

      var rb_mg_date=rb_mg_date;
      var mg_date=mg_date;

      console.log("mg_date" +mg_date);

      $("#rbmkgoodassets").hide();
      $("#viewdata11").hide();
      $("#eblst1").hide();
      $("#senerdtl").show();
      $('#asset_name')[0].disabled = false;
      $('#asset_link')[0].disabled = false;
      $('#blast_date')[0].disabled = false;
      $('#blast_time')[0].disabled = false;
      //$('#geo')[0].disabled = false;
      //$("#reblastassets").hide();

      $("#assets").show();

      var todaycheck = new Date();
      var datecheck = todaycheck.getFullYear() + '-' + (todaycheck.getMonth() + 1) + '-' + todaycheck.getDate();
      var timecheck = todaycheck.getHours() + ":" + todaycheck.getMinutes() + ":" + todaycheck.getSeconds();
      var dateTimecheck = datecheck + ' ' + timecheck;

      var eblastdttime = blast_date + ' ' + blast_time;
      var d1 = new Date(eblastdttime);
      var d2 = new Date(dateTimecheck);


      var seconds = (d1 - d2) / 1000;

    
      console.log("check seconds11:" +seconds);


      if (seconds > 0 && ebstatus == 0) {
        console.log("check seconds:" +seconds);

     
     console.log("check ebstatus:" +ebstatus);

        document.querySelectorAll("#blast_typerr option").forEach(opt => {
        //  if (opt.value == "Reminder-Blast") {
         // opt.disabled = true;

         console.log("within if reminder blast");
          var RB = "Reminder-Blast";
          $("#blast_typerr option[value=" + RB + "]").hide();

          var MG = "Make-Good";

          $("#blast_typerr option[value=" + MG + "]").hide();


          var RBMakeGood = "RBMake-Good";

          $("#blast_typerr option[value=" + RBMakeGood + "]").hide();

    $("#assets").show();
     $("#ebassets").hide();


      //  }
 });
      
 }


      else if (ebstatus == 1 || seconds < 0) {
       
        console.log("within else if");
        document.querySelectorAll("#blast_typerr option").forEach(opt => {
         // if (opt.value == "Reminder-Blast") {
           // opt.disabled = false;

            
        //  }

        var RB = "Reminder-Blast";
          $("#blast_typerr option[value=" + RB + "]").show();

          var MG = "Make-Good";

          $("#blast_typerr option[value=" + MG + "]").show();


          var RBMakeGood = "RBMake-Good";

          $("#blast_typerr option[value=" + RBMakeGood + "]").hide();


         $("#assets").hide();
          $("#ebassets").show();

        });
        //$('#blast_typerr').prop('selectedIndex', 1);

      }



      else if (ebstatus == 1 || seconds < 0) {
       
        console.log("within else if");
        document.querySelectorAll("#blast_typerr option").forEach(opt => {
         // if (opt.value == "Reminder-Blast") {
           // opt.disabled = false;

            
        //  }

        var RB = "Reminder-Blast";
          $("#blast_typerr option[value=" + RB + "]").show();

          var MG = "Make-Good";

          $("#blast_typerr option[value=" + MG + "]").show();


          var RBMakeGood = "RBMake-Good";

          $("#blast_typerr option[value=" + RBMakeGood + "]").hide();


         $("#assets").hide();
         $("#ebassets").show();

        });
        //$('#blast_typerr').prop('selectedIndex', 1);

      }



      
      else  {
       
        console.log("within else if");
        document.querySelectorAll("#blast_typerr option").forEach(opt => {
         // if (opt.value == "Reminder-Blast") {
           // opt.disabled = false;

            
        //  }

        var RB = "Reminder-Blast";
          $("#blast_typerr option[value=" + RB + "]").hide();

          var MG = "Make-Good";

          $("#blast_typerr option[value=" + MG + "]").hide();


          var RBMakeGood = "RBMake-Good";

          $("#blast_typerr option[value=" + RBMakeGood + "]").hide();


          // $("#assets").hide();
          // $("#ebassets").show();

        });
        //$('#blast_typerr').prop('selectedIndex', 1);

      }


      //end code for hide Mg/RB if Eblast not done
      
      

//start code for hide/show RB/MG RB if EB MG not done 


// var todaycheck = new Date();
// var datecheck = todaycheck.getFullYear() + '-' + (todaycheck.getMonth() + 1) + '-' + todaycheck.getDate();
// var timecheck = todaycheck.getHours() + ":" + todaycheck.getMinutes() + ":" + todaycheck.getSeconds();
// var dateTimecheck = datecheck + ' ' + timecheck;
var ebmg_date=mg_date;
var ebmg_time=mg_time;
var ebmgdttime = ebmg_date + ' ' + ebmg_time;
var d1 = new Date(ebmgdttime);
var d2 = new Date(dateTimecheck);
var mg_status=mg_status;

var secondsebmg = (d1 - d2) / 1000;

if(mg_date!="")
{
if (secondsebmg > 0 && mg_status == 0 && mgasset_name !="" && mgasset_link !="") {

  console.log("hide reminder blast if EB MG not done");
  var RB = "Reminder-Blast";
  $("#blast_typerr option[value=" + RB + "]").hide();

  var RBMakeGood = "RBMake-Good";

  $("#blast_typerr option[value=" + RBMakeGood + "]").hide();



}





else if (mg_status == 1 || seconds < 0) {
       

  document.querySelectorAll("#blast_typerr option").forEach(opt => {
   // if (opt.value == "Reminder-Blast") {
     // opt.disabled = false;

      
  //  }

  var RB = "Reminder-Blast";
    $("#blast_typerr option[value=" + RB + "]").show();

    var MG = "Make-Good";

    $("#blast_typerr option[value=" + MG + "]").show();


    var RBMakeGood = "RBMake-Good";

    $("#blast_typerr option[value=" + RBMakeGood + "]").hide();


    // $("#assets").hide();
    // $("#ebassets").show();

  });
  //$('#blast_typerr').prop('selectedIndex', 1);

}


else if (mg_status == 0 || seconds < 0) {
       

  document.querySelectorAll("#blast_typerr option").forEach(opt => {
   // if (opt.value == "Reminder-Blast") {
     // opt.disabled = false;

      
  //  }

  console.log("mg_status == 0 || seconds < 0")

  var RB = "Reminder-Blast";
    $("#blast_typerr option[value=" + RB + "]").show();

    var MG = "Make-Good";

    $("#blast_typerr option[value=" + MG + "]").show();


    var RBMakeGood = "RBMake-Good";

    $("#blast_typerr option[value=" + RBMakeGood + "]").hide();


    // $("#assets").hide();
    // $("#ebassets").show();

  });
  //$('#blast_typerr').prop('selectedIndex', 1);

}
}

if((mgasset_name =="" && mgasset_link =="") && (rb_assetname !="" && rb_assetlink !="" ))
{
 var MG = "Make-Good";
 $("#blast_typerr option[value=" + MG + "]").hide();

}

// else{
//   console.log('(mgasset_name =="" && mgasset_link =="") && (rb_assetname !="" && rb_assetlink !=""');
//  var MG = "Make-Good";
//  $("#blast_typerr option[value=" + MG + "]").show();

// }



//start code for reminder blast

var rb_date=rb_date;
var rb_time=rb_time;
var rbdttime = rb_date + ' ' + rb_time;
var d1 = new Date(rbdttime);
var d2 = new Date(dateTimecheck);
var rbstatus=rbstatus;

var secondsrb = (d1 - d2) / 1000;
console.log('rb_date is'+rb_date)
console.log('rb_time is'+rb_time)
console.log('rb_assetname is'+rb_assetname)
console.log('rb_assetlink is'+rb_assetlink)
if(rb_assetname !="" && rb_assetlink !="" )
{
  console.log("rb_assetname not empty");
if (secondsrb > 0 && rbstatus == 0) {
 console.log("secondsrb > 0 && rbstatus == 0");

  document.querySelectorAll("#blast_typerr option").forEach(opt => {
  //  if (opt.value == "Reminder-Blast") {
   // opt.disabled = true;

   console.log("within if reminder blast");
    var RB = "Reminder-Blast";
    $("#blast_typerr option[value=" + RB + "]").show();

   
    var RBMakeGood = "RBMake-Good";

    $("#blast_typerr option[value=" + RBMakeGood + "]").hide();



//  }
});

}


else if (rbstatus == 1 || secondsrb < 0) {
 

  document.querySelectorAll("#blast_typerr option").forEach(opt => {
   // if (opt.value == "Reminder-Blast") {
     // opt.disabled = false;

      
  //  }

  var RB = "Reminder-Blast";
    $("#blast_typerr option[value=" + RB + "]").show();

    

    var RBMakeGood = "RBMake-Good";

    $("#blast_typerr option[value=" + RBMakeGood + "]").show();


    // $("#assets").hide();
    // $("#ebassets").show();

  });
  //$('#blast_typerr').prop('selectedIndex', 1);

}




else if (rbstatus == 0 || secondsrb < 0 && (rb_assetname !="" && rb_assetlink !="" )) {
 

  document.querySelectorAll("#blast_typerr option").forEach(opt => {
   // if (opt.value == "Reminder-Blast") {
     // opt.disabled = false;

      
  //  }

  var RB = "Reminder-Blast";
    $("#blast_typerr option[value=" + RB + "]").show();

    

    var RBMakeGood = "RBMake-Good";

    $("#blast_typerr option[value=" + RBMakeGood + "]").show();


    // $("#assets").hide();
    // $("#ebassets").show();

  });
  //$('#blast_typerr').prop('selectedIndex', 1);

}





    }


    // else{
    //   document.querySelectorAll("#blast_typerr option").forEach(opt => {
               
    //       var RB = "Reminder-Blast";
    //       $("#blast_typerr option[value=" + RB + "]").show();
      
         
    //       var RBMakeGood = "RBMake-Good";
      
    //       $("#blast_typerr option[value=" + RBMakeGood + "]").hide();
      
      
      
     
    //   });

    // }


//end code for hide/show RB/MG RB if EB MG not done 


      var rbdttime = rb_date + ' ' + rb_time;
      var rbd1 = new Date(rbdttime);
      var rbd2 = new Date(dateTimecheck);




      if (today > rb_date && rb_date != "") {
        $("#rb_date").removeAttr("min");

      }

      if (today > blast_date && blast_date != "") {
        $("#blast_date").removeAttr("min");
        $("#webinarassets11").hide();
        $("#assets").hide();
        $("#ebassets").show();
      }



      if (today > mg_date && mg_date != "") {
        $("#mg_date").removeAttr("min");
        // $("#webinarassets11").hide();
        // $("#assets").hide();
        // $("#ebassets").show();
      }




      if (today > blast_date && today > rb_date && blast_date != "" && rb_date != "") {
       
        $("#rb_date").removeAttr("min");
        $("#blast_date").removeAttr("min");
      //  $('#action_button').text('Edit').hide();

      }


      if (today > mg_date && mg_date != "") {
        $("#mg_date").removeAttr("min");

      }



    }




 



    $('#blast_typerr').on('change', function () {
      // var id = request.body.id;

      var action = $("#action").val();


      var blast_type = $("#blast_type").val();
      var blast_type = $(this).val();

    
console.log("blast_date:" +blast_date);
console.log("rb_date:" +rb_date);
console.log("mg_date:" +mg_date);
console.log("rb_mg_date:" +rb_mg_date);
      if (blast_type == "Reminder-Blast") {
        if (ebstatus == "0" && blast_date < today) {
          
          $("#rballocated_to option[value=" + eballocatedto + "]").attr("disabled", "disabled");
        }
        else {
        
          $("#rballocated_to ").removeAttr("disabled", "disabled");

        }

      }



 

      $("#ebassets").hide();
      $("#assets").hide();
      $("#reblastassets").hide();
      $("#mkgoodassets").hide();

console.log("RB Status:" +rbstatus);

console.log("check blast_type" +blast_type);

      if (blast_type == 'E-blast' && today <= blast_date && blast_date != "" && ebstatus=="1") {
        console.log('blast_type == E-blast && today <= blast_date && blast_date != "" && ebstatus=="1"')
       
        $("#ebassets").show();
        $("#assets").hide();
        $("#reblastassets").hide();
        $("#remblastassetsread").hide();
        $('#asset_name')[0].disabled = false;
        $('#asset_link')[0].disabled = false;
        $('#blast_date')[0].disabled = false;
        $('#blast_time')[0].disabled = false;

      }


      else if (blast_type == 'E-blast' && today > blast_date && blast_date != "") {
     
        $("#ebassets").show();
        $("#assets").hide();
        $("#reblastassets").hide();
        $("#remblastassetsread").hide();
        $("#mkgoodassets").hide();
        $("#rbmkgoodassets").hide();


        // $("#blast_date").removeAttr("min");


        // $('#asset_name')[0].disabled = true;
        // $('#asset_link')[0].disabled = true;
        // $('#blast_date')[0].disabled = true;
        // $('#blast_time')[0].disabled = true;

      }



      


//start code for make good
     
else if (blast_type == 'Make-Good' && mg_date == "") {

  console.log("within blast_type == 'Make-Good' && mg_date ==  ")
          $("#ebassets").hide();
          $("#reblastassets").hide();
          $("#remblastassetsread").hide();
          $("#assets").hide();
          $("#mkgoodassets").show();
          $("#rbmkgoodassets").hide();
        }
  
  
  
        
        else if (blast_type == 'Make-Good'  && today <= mg_date && mg_status=="1")   {
  
         console.log("blast_type == 'Make-Good'  && today <= mg_date && mg_status== is 1")
         
          $("#ebassets").hide();
          $("#reblastassets").hide();
          $("#assets").hide();
          $("#remblastassetsread").hide();
          $("#mkgoodassets").show();
          $("#rbmkgoodassets").hide();
  
  
   $('#mgallocated_to').attr("readonly", true); 
         $('#mgasset_name').attr("readonly", true); 
        $('#mgasset_link').attr("readonly", true); 
        $('#mg_date').attr("readonly", true); 
         $('#mg_time').attr("readonly", true); 
  
        }
  
  
  
  
        else if (blast_type == 'Make-Good' && today <= mg_date)   {
  
         
         console.log("blast_type == 'Make-Good' && today <= mg_date" +mg_date)
          $("#ebassets").hide();
          $("#reblastassets").hide();
          $("#assets").hide();
          $("#remblastassetsread").hide();
          $("#mkgoodassets").show();
          $("#rbmkgoodassets").hide();
  
  
        
  
        }
  
  
  
  
  
  
        else if (blast_type == 'Make-Good' && today > mg_date && mg_date != "") {
        
          console.log("blast_type == 'Make-Good' && today > mg_date")
          $("#ebassets").hide();
          $("#assets").hide();
          $("#reblastassets").hide();
          $("#remblastassetsread").hide();
          $("#mkgoodassets").show();
          $("#rbmkgoodassets").hide();

          //$("#mgallocated_to option").prop('disabled', true);

  
      document.getElementById("mgallocated_to").readOnly = true;
          document.getElementById("mgasset_name").readOnly = true;
          document.getElementById("mgasset_link").readOnly = true;
          document.getElementById("mg_date").readOnly = true;
          document.getElementById("mg_time").readOnly = true;
         
      //   $('#mgallocated_to').attr("readonly", true); 
         
          // $('#mgasset_name').attr("disabled", true); 
          // $('#mgasset_link').attr("disabled", true); 
          // $('#mg_date').attr("disabled", true); 
          // $('#mg_time').attr("disabled", true); 
  
  
          // $("#rb_date").removeAttr("min");
  
  
  
          // $('#rballocated_to')[0].disabled = true;
          // $('#rb_assetname')[0].disabled = true;
          // $('#rb_asset_link')[0].disabled = true;
          // $('#rb_date')[0].disabled = true;
          // $('#rb_time')[0].disabled = true;
  
        }
  
  
  
   
  
  
  
  
  //end code for make good



      else if (blast_type == 'Reminder-Blast' && rb_date == "") {


        $("#ebassets").hide();
        $("#reblastassets").show();
        $("#remblastassetsread").hide();
        $("#assets").hide();
        $("#mkgoodassets").hide();
        $("#rbmkgoodassets").hide();

      }



      else if (blast_type == 'Reminder-Blast' && (today > rb_date || rbstatus=="1")) {
      

        console.log("blast_type == 'Reminder-Blast' && (today > rb_date || rbstatus==is 1)")
        $("#ebassets").hide();
        $("#assets").hide();
        $("#reblastassets").hide();
        $("#remblastassetsread").show();
        $("#mkgoodassets").hide();
        $("#rbmkgoodassets").hide();

        // $("#rb_date").removeAttr("min");



        // $('#rballocated_to')[0].disabled = true;
        // $('#rb_assetname')[0].disabled = true;
        // $('#rb_asset_link')[0].disabled = true;
        // $('#rb_date')[0].disabled = true;
        // $('#rb_time')[0].disabled = true;

      }




      

      else if (blast_type == 'Reminder-Blast' && today <= rb_date) {

       
       
        $("#ebassets").hide();
        $("#reblastassets").show();
        $("#assets").hide();
        $("#remblastassetsread").hide();
        $("#mkgoodassets").hide();
        $("#rbmkgoodassets").hide();


        // $('#rballocated_to')[0].disabled = false;
        // $('#rb_assetname')[0].disabled = false;
        // $('#rb_asset_link')[0].disabled = false;
        // $('#rb_date')[0].disabled = false;
        // $('#rb_time')[0].disabled = false;

      }

   


//start code for RB make good
     
else if (blast_type == 'RBMake-Good' && rb_mg_date == "") {

  console.log("within blast_type == 'RBMake-Good' && mg_date ==  ")
          $("#ebassets").hide();
          $("#reblastassets").hide();
          $("#remblastassetsread").hide();
          $("#assets").hide();
          $("#mkgoodassets").hide();
          $("#rbmkgoodassets").show();

     


        }
  
  
  
        
        else if (blast_type == 'RBMake-Good'  && today <= rb_mg_date && rb_mg_status=="1")   {
  
         console.log("blast_type == 'RBMake-Good'  && today <= rb_mg_date && rb_mg_status== is 1")
         
          $("#ebassets").hide();
          $("#reblastassets").hide();
          $("#assets").hide();
          $("#remblastassetsread").hide();
          $("#mkgoodassets").hide();
          $("#rbmkgoodassets").show();

  
  
          $('#rb_mgallocated_to').attr("disabled", true); 
          $('#rb_mgasset_name').attr("disabled", true); 
          $('#rb_mgasset_link').attr("disabled", true); 
          $('#rb_mg_date').attr("disabled", true); 
          $('#rb_mg_time').attr("disabled", true); 
  
        }
  
  
  
  
        else if (blast_type == 'RBMake-Good' && today <= rb_mg_date)   {
  
         
         console.log("blast_type == 'RBMake-Good' && today <= rb_mg_date")
          $("#ebassets").hide();
          $("#reblastassets").hide();
          $("#assets").hide();
          $("#remblastassetsread").hide();
          $("#mkgoodassets").hide();
          $("#rbmkgoodassets").show();

  
  
        
  
        }
  
  
  
  
  
  
        else if (blast_type == 'RBMake-Good' && today > rb_mg_date) {
        
          console.log("blast_type == 'RBMake-Good' && today > rb_mg_date");
          $("#ebassets").hide();
          $("#assets").hide();
          $("#reblastassets").hide();
          $("#remblastassetsread").hide();
          $("#mkgoodassets").hide();
          $("#rbmkgoodassets").show();

  
          // document.getElementById("mgallocated_to").readOnly = true;
          // document.getElementById("mgasset_name").readOnly = true;
          // document.getElementById("mgasset_link").readOnly = true;
          // document.getElementById("mg_date").readOnly = true;
          // document.getElementById("mg_time").readOnly = true;
       
  
  
          // $("#rb_date").removeAttr("min");
  
  
  
          // $('#rballocated_to')[0].disabled = true;
          // $('#rb_assetname')[0].disabled = true;
          // $('#rb_asset_link')[0].disabled = true;
          // $('#rb_date')[0].disabled = true;
          // $('#rb_time')[0].disabled = true;
  
        }
  
  
  
        else if (blast_type == 'RBMake-Good' &&(( today > rb_mg_date && rb_mg_date != "" ) )) {
       
  
          console.log("if mg status is 1");
          $("#ebassets").hide();
          $("#assets").hide();
          $("#reblastassets").hide();
          $("#remblastassetsread").hide();
          $("#rbmkgoodassets").show();

  

  
  
      
  
  
        }
  
  
  
  
  //end code for RB make good








      else {
        // $("#asset_name").show();
        // $("#reblastassets").hide();
        // $("#assets").hide();

      }

      console.log("mg mg_time is check1111:" +mg_time);





    });


    $.ajax({
      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: { id: id, action: 'fetch_single' },

      dataType: "JSON",
      success: function (data) {


        $('#mgallocated_to').val(data.mgallocated_to);
        $('#mgasset_name').val(data.mgasset_name);
        $('#mgasset_link').val(data.mgasset_link);
        $('#mg_date').val(data.mg_date);
        $('#mg_time').val(data.mg_time);
       

console.log("mg mg_time is check:" +data.mg_time);
        $('#cname').val(data.cname);
        $('#tact1122').val(data.tact);
        $('#camp_name').val(data.camp_name);
        $('#camp_from').val(data.camp_from);
        $('#blast_count').val(data.blast_count);

        $('#ebstatus').val(data.status);
        $('#eballocated_to').val(data.allocated_to);

        $('#asset_name').val(data.asset_name);
        $('#asset_link').val(data.asset_link);
        $('#rb_assetname').val(data.rb_assetname);
        $('#rb_asset_link').val(data.rb_assetlink);
        $('#rb_date').val(data.rb_date);
        $('#rb_time').val(data.rb_time);
        $('#rballocated_to').val(data.rballocated_to);

        $('#rb_assetnameread').val(data.rb_assetname);
        $('#rb_asset_linkread').val(data.rb_assetlink);
        $('#rb_dateread').val(data.rb_date);
        $('#rb_timeread').val(data.rb_time);
        $('#rballocated_toread').val(data.rballocated_to);
        $('#priority').val(data.priority);


        $('#ebasset_name').val(data.asset_name);
        $('#ebasset_link').val(data.asset_link);
        $('#sender_name').val(data.sender_name);
        $('#sender_email').val(data.sender_email);
        $('#tactebweb').val(data.tact);
        $('#blast_type11').val(data.blast_type);
        $('#blast_date').val(data.blast_date);
        $('#blast_time').val(data.blast_time);
        $('#blast_date1').val(data.blast_date);
        $('#blast_time1').val(data.blast_time);




        $('#cnamewebinar').val(data.cname);
        $('#webcamp_name').val(data.camp_name);
        $('#webcamp_from').val(data.camp_from);
        $('#webinar_count').val(data.blast_count);
        $('#webpriority').val(data.priority);
        $('#weballocated_to').val(data.allocated_to);
        $('#webblsttype').val(data.blast_type);
        $('#registration_link').val(data.asset_link);
        $('#registration_date').val(data.blast_date);
        $('#registration_time').val(data.blast_time);



        $('#mgallocated_to').val(data.mgallocated_to);
        $('#mgasset_name').val(data.mgasset_name);
        $('#mgasset_link').val(data.mgasset_link);
        $('#mg_date').val(data.mg_date);
        $('#mg_time').val(data.mg_time);
       

console.log("mg mg_time is check 111:" +data.mg_time);


        $('#rb_mgallocated_to').val(data.rb_mgallocated_to);
        $('#rb_mgasset_name').val(data.rb_mgasset_name);
        $('#rb_mgasset_link').val(data.rb_mgasset_link);
        $('#rb_mg_date').val(data.rb_mg_date);
        $('#rb_mg_time').val(data.rb_mg_time);
        $('#priority').val(data.priority);
        $('#allocated_to').val(data.allocated_to);
        $('#id').val(data.id);

console.log("check geo" +data.geo)
     //  $('#geo_chosen').val(data.geo);

     $("#geo").val(data.geo.split(","));
     $('#geo').trigger("chosen:updated");

     $("#mg_geo").val(data.mg_geo.split(","));
     $('#mg_geo').trigger("chosen:updated");

     $("#rb_geo").val(data.rb_geo.split(","));
     $('#rb_geo').trigger("chosen:updated");

     $("#rb_mg_geo").val(data.rb_mg_geo.split(","));
     $('#rb_mg_geo').trigger("chosen:updated");
   
        
        


        $('#action_button').attr('disabled', false);
          $('#leftnav').DataTable().ajax.reload();
          $('#apptask').DataTable().ajax.reload();
          $('#task_priorities').DataTable().ajax.reload();
          $('#todaysstask').DataTable().ajax.reload();
          $('#weeklytasks').DataTable().ajax.reload();
  
          
          // $('#task_priorities').DataTable().ajax.reload();
  
  
        //  $('#action_modal').modal('hide');
  



        setTimeout(function () {
          $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
          $('#message').html('');
        }, 5000);
       

      }
    });



  });





  $('#view_data').click(function () {


    $('#dynamic_modal_title').text('View Data');

    $('#action').val('view1');

    $('#action_button').text('view1');

    $('#action_modal').modal('show');


  });


  $(document).on('click', '.view1', function () {
    $('#task_form')[0].reset();

    //var id = $(this).data('id');

    var id = $(this).data('id');
    const myArray1 = id.split(" ");


    var id = myArray1[0];

  



    $('#dynamic_modal_title').text('View Data');

    $('#action').val('view1');

    // $('#action_button').text('View');
    $("#action_button").css("display", "none");
    $('#action_modal').modal('show');



    var action = $("#action").val();
   
    if (action === "view1") {

    
      $("#fileviewbox").hide();
      $("#fileviewdownload").show();
      $("#webinarfileviewdownload").show();
      $("#userfileviewdownload").show();
      $("#viewdata11").show();
      $("#editdataa").hide();
      $("#webinarblast").hide();
      $("#tactics").hide();

    }



    $.ajax({
      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: { id: id, action: 'fetch_single_view' },

      dataType: "JSON",
      success: function (data) {
        if (data.rb_assetname == "") {
        
          $("#rbassetss").hide();
        }

       
        else {
        
          $("#rbassetss").show();
        }




        $('#webtactview').val(tactwebview);
        $('#cnameview').val(data.client_name);
        $('#camp_nameview').val(data.camp_name);
        $('#camp_fromview').val(data.camp_from);
        $('#blast_countview').val(data.blast_count);
        $('#commentview').val(data.comment);
        // $('#asset_name').val(data.asset_name);
        // $('#asset_link').val(data.asset_link);
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



        $('#mgallocated_to').val(data.mgallocated_to);
        $('#mgasset_name').val(data.mgasset_name);
        $('#mgasset_link').val(data.mgasset_link);
        $('#mg_date').val(data.mg_date);
        $('#mg_time').val(data.mg_time);
       

console.log("mg mg_time is view2222:" +data.mg_time);
        $('#rb_mgallocated_to').val(data.rb_mgallocated_to);
        $('#rb_mgasset_name').val(data.rb_mgasset_name);
        $('#rb_mgasset_link').val(data.rb_mgasset_link);
        $('#rb_mg_date').val(data.rb_mg_date);
        $('#rb_mg_time').val(data.rb_mg_time);



        $('#webinar_linkview').val(data.asset_link);
        $('#webinar_date1view').val(data.blast_date);
        $('#webinar_time1view').val(data.blast_time);



        $('#priorityview').val(data.priority);
        $('#first_nameview').val(data.first_name);
        $('#id').val(data.id);


        var admin_filesname = data.admin_files;
        var camp_id = data.camp_id;
        var tact = data.tact;
        var user_ebfiles = data.user_ebfiles;
        var user_rbfiles = data.user_rbfiles;
        var webinar_files = data.webinar_files;
        var webinar_comment = data.webinar_comment;

        var adminebcomment = data.comment;
        var adminrbcomment = data.rb_comment;
        if (tact === "e_blast") {
          $("#webinarfileviewdownload").hide();
          var tact = "Email-Blast";



         //////////  Code start for Admin EBlast Files   ////////////////
          if (!admin_filesname) {
            var htmlContent = '';
        


            document.getElementById('viewfiles11').innerHTML = htmlContent;

          }
          else {
           
            var admin_filesname = admin_filesname.split(',');
            var length = admin_filesname.length;
            var htmladminebcmt = '';
           
            htmladminebcmt += '<div style="background: white;"><p > <tr><td width="5%"><b  style="color:red">Admin EB Comment:   </b> ' + adminebcomment + ' </td> </tr>', '</p></div>';
              var htmlContent = '';
            //var htmlData =admin_filesname;
            for (var i = 0; i < length; i++) {




          //    htmlContent += '<p style="background: white; text-align: center;"> <tr><td width="5%"><button type="button" style="border: none; background-color: #fff; display: flex;  justify-content: center; gap: 10px; align-items: center; padding: 10px; border-radius: 25px;"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" style="width:8%;" ><p style="margin:0;">' + admin_filesname[i] + '</p></button></td> </tr>', '</p>';

              htmlContent += '<p class="filenamep" > <tr><td width="5%"><button type="button" class="filebtn" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" class="fileimg"  ><p style="margin:0;">' + admin_filesname[i] + '</p><i class="fa fa-download"></i></button></td> </tr>', '</p>';

            }
           

            document.getElementById('adminebcomment').innerHTML = htmladminebcmt;
           document.getElementById('viewfiles11').innerHTML = htmlContent;
          }
          
      //////////  Code end for Admin EBlast Files   ////////////////




         //////code start for display Admin EB MG files/////////////////
         var admin_ebmgfiles = data.admin_ebmgfiles;

         console.log("admin_ebmgfiles" +admin_ebmgfiles)
         
         if (!admin_ebmgfiles) {
  
  
  
            }
            else {
              var htmlContentebmgfiles = '';
             
              if (admin_ebmgfiles == "") {
  
              }
              else {
  
                document.getElementById('viewfilesebmg').innerHTML = htmlContentebmgfiles;

                console.log("admin_ebmgfiles:" +admin_ebmgfiles);
  
                var admin_ebmgfiles = admin_ebmgfiles.split(',');
            
                var lengthebmgfiles = admin_ebmgfiles.length;
               
  
                var htmlContentebmgfiles = '';
  
                var tact = "Make-Good";
                //var htmlData =admin_filesname;
                for (var i = 0; i < lengthebmgfiles; i++) {
  
                  htmlContentebmgfiles += '<p  class="filenamep"> <tr><td width="5%"><button type="button" class="filebtn" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_ebmgfiles[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" class="fileimg" ><p  style="margin:0;">' + admin_ebmgfiles[i] + '</p><i class="fa fa-download"></i></button></td></tr>', '</p>';
  
                }

                console.log("htmlContentebmgfiles" +htmlContentebmgfiles)
  
           document.getElementById('viewfilesebmg').innerHTML = htmlContentebmgfiles;
  
                
              }
           
            }

               var adminebmgcomment = data.admin_ebmgcmt;
           
            var htmladminebmgcmt = '';
            htmladminebmgcmt += '<div style="background: white;"><p> <tr><td width="5%"><b style="color:red">Admin EB MG Comment:   </b> ' + adminebmgcomment + ' </td> </tr>', '</p></div>';
            document.getElementById('adminebmgcomment').innerHTML = htmladminebmgcmt;
  
  
           /////////   code end for admin EB MG files   //////////////////////








             //////code start for display Admin RB MG files/////////////////
         var admin_rbmgfiles = data.admin_rbmgfiles;
         
         if (!admin_rbmgfiles) {
  
  
  
            }
            else {
              var htmlContentrbmgfiles = '';
             
              if (admin_rbmgfiles == "") {
  
              }
              else {
  
                document.getElementById('viewfilesrbmg').innerHTML = htmlContentrbmgfiles;

                console.log("admin_rbmgfiles:" +admin_rbmgfiles);
  
                var admin_rbmgfiles = admin_rbmgfiles.split(',');
            
                var lengthrbmgfiles = admin_rbmgfiles.length;
               
  
                var htmlContentrbmgfiles = '';
  
                var tact = "Make-Good";
                //var htmlData =admin_filesname;
                for (var i = 0; i < lengthrbmgfiles; i++) {
  
                  htmlContentrbmgfiles += '<p  class="filenamep"> <tr><td width="5%"><button type="button" class="filebtn" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_rbmgfiles[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" class="fileimg" ><p  style="margin:0;">' + admin_rbmgfiles[i] + '</p><i class="fa fa-download"></i></button></td></tr>', '</p>';
  
                }

                console.log("htmlContentrbmgfiles" +htmlContentrbmgfiles)
  
           document.getElementById('viewfilesrbmg').innerHTML = htmlContentrbmgfiles;
  
                
              }
              var admin_rbmgcmt = data.admin_rbmgcmt;
           
            var htmladminrbmgcmt = '';
            htmladminrbmgcmt += '<div style="background: white;"><p> <tr><td width="5%"><b style="color:red">Admin RB MG Comment:   </b> ' + admin_rbmgcmt + ' </td> </tr>', '</p></div>';
            document.getElementById('adminrbmgcomment').innerHTML = htmladminrbmgcmt;
            }
  
  
           /////////   code end for admin RB MG files   //////////////////////



          //////code start for display Admin Reminder files/////////////////
          var admin_reminderfiles = data.admin_rb_file;
         
       if (!admin_reminderfiles) {



          }
          else {
            var htmlContentrb = '';
           
            if (admin_reminderfiles == "") {

            }
            else {

              document.getElementById('viewreminderfiles11').innerHTML = htmlContentrb;

              var admin_reminderfiles = admin_reminderfiles.split(',');
          
              var lengthrbfile = admin_reminderfiles.length;
             

              var htmlContentrb = '';

              var tact = "Email-Reminder-Blast";
              //var htmlData =admin_filesname;
              for (var i = 0; i < lengthrbfile; i++) {

                htmlContentrb += '<p  class="filenamep"> <tr><td width="5%"><button type="button" class="filebtn" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_reminderfiles[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" class="fileimg" ><p  style="margin:0;">' + admin_reminderfiles[i] + '</p><i class="fa fa-download"></i></button></td></tr>', '</p>';

              }

         document.getElementById('viewreminderfiles11').innerHTML = htmlContentrb;

              
            }
            var adminrbcomment = data.rb_comment;
         
          var htmladminrbcmt = '';
          htmladminrbcmt += '<div style="background: white;"><p> <tr><td width="5%"><b style="color:red">Admin RB Comment:   </b> ' + adminrbcomment + ' </td> </tr>', '</p></div>';
          document.getElementById('adminrbcomment').innerHTML = htmladminrbcmt;
          }


         /////////   code end for admin Reminder files   //////////////////////



          ////////////////////   code start for user Eblast files     ////////////////////

var user_ebfiles=data.user_ebfiles;
          if (!user_ebfiles) {
            var htmlContentusereb = '';
            
            document.getElementById('userviewfiles11').innerHTML = htmlContentusereb;

          }
          else {
           
            var user_ebfiles = user_ebfiles.split(',');

            var length = user_ebfiles.length;

            var htmlContentusereb = '';
            //var htmlData =admin_filesname;
            for (var i = 0; i < length; i++) {



              htmlContentusereb += '<p class="filenamep"> <tr><td width="5%"><button type="button" class="filebtn" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + user_ebfiles[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" class="fileimg"><p  style="margin:0;">' + user_ebfiles[i] + '</p><i class="fa fa-download"></i></button></td> </tr>', '</p>';

            }
             document.getElementById('userviewfiles11').innerHTML = htmlContentusereb;
             var userebcomment = data.user_ebcomment;
           
            var htmluserebcmt = '';
            htmluserebcmt += '<div style="background: white;"><p> <tr><td width="5%"><b style="color:red">User EB Comment:   </b> ' + userebcomment + ' </td> </tr>', '</p></div>';
            document.getElementById('userebcomment').innerHTML = htmluserebcmt;



          }
/////////// Code End for user EB Files   //////////////




///////////code start for user RB files ///////////////
          var user_rbfiles = data.user_rbfiles;
          if (!user_rbfiles) {



          }
          else {
            var userhtmlContentrb = '';
        
            if (user_rbfiles == "") {

            }
            else {

              document.getElementById('userviewreminderfiles11').innerHTML = userhtmlContentrb;

              var user_rbfiles = user_rbfiles.split(',');
              var lengthrbfile = user_rbfiles.length;
              
              var userhtmlContentrb = '';

              var tact = "Email-Reminder-Blast";
              //var htmlData =admin_filesname;
              for (var i = 0; i < lengthrbfile; i++) {

                userhtmlContentrb += '<p class="filenamep"> <tr><td width="5%"><button type="button" class="filebtn"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + user_rbfiles[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png"  class="fileimg"><p style="margin:0;">' + user_rbfiles[i] + '</p><i class="fa fa-download"></i></button></td></tr>', '</p>';

              }
             document.getElementById('userviewreminderfiles11').innerHTML = userhtmlContentrb;
             var userrbcomment = data.user_rbcomment;
             
              var htmluserrbcmt = '';
              htmluserrbcmt += '<div style="background: white;"><p> <tr><td width="5%"><b style="color:red">User RB Comment:   </b> ' + userrbcomment + ' </td> </tr>', '</p></div>';
              document.getElementById('userrbcomment').innerHTML = htmluserrbcmt;



            }
          }


          ///////////code end for user RB files///////////////

        }




///display files for webinar
        else if (tact == "webinar") {


          $("#fileviewdownload").hide();
          $("#userfileviewdownload").hide();


          var adminwebinarcomment1 = '';

        //  var adminwebinarcomment1 ="<p style='font-size:12px;'><b style='color:red'>Admin Comment:   </b>" +data.comment+"</p>";


          adminwebinarcomment1 += '<div style="background: white;"><p> <tr><td width="5%"><b  style="color:red">Admin Comment:   </b> ' + data.comment + ' </td> </tr>', '</p></div>';



          var tact = "Webinar";

        

          if (!admin_filesname) {
           
           
            var htmlContentweb11 = '';
             document.getElementById('webinarviewfiles12').innerHTML = htmlContentweb11;

          }
          else {
           
            var admin_filesname = admin_filesname.split(',');

            var length = admin_filesname.length;

          var htmlContentweb11 = '';
            //var htmlData =admin_filesname;
            for (var i = 0; i < length; i++) {

             
              htmlContentweb11 +='<p  class="filenamep"><tr><td width="5%"><button type="button"  class="filebtn"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" class="fileimg"><p style="margin:0;">' + admin_filesname[i] + '</p><i class="fa fa-download"></i></button></td> </tr></p>';


            }

            document.getElementById('webinarviewfiles12').innerHTML = htmlContentweb11;
            document.getElementById('adminwebinarcomment').innerHTML = adminwebinarcomment1;
          }

         
         
///////code end for admin webinar files////////////////

        ///////////code start for user webinar files    //////////////////


        
var user_webfiles=data.webinar_files;
var user_webcomment=data.webinar_comment;

var user_webcomment ="";


user_webcomment += '<div style="background: white;"><p> <tr><td width="5%"><b  style="color:red">User Comment:   </b> ' + data.webinar_comment + ' </td> </tr>', '</p></div>';



    if (!user_webfiles) {
            var htmlContentuserweb = '';
         


            document.getElementById('webinarviewfiles11').innerHTML = htmlContentuserweb;

          }
          else {
         

            var user_webfiles = user_webfiles.split(',');

            var length = user_webfiles.length;


         

            var htmlContentuserweb = '';
            //var htmlData =admin_filesname;
            for (var i = 0; i < length; i++) {



              htmlContentuserweb += '<p  class="filenamep"> <tr><td width="5%"><button type="button"  class="filebtn" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + user_webfiles[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" class="fileimg"><p style="margin:0;">' + user_webfiles[i] + '</p><i class="fa fa-download"></i></button></td> </tr>', '</p>';

            }
       


            document.getElementById('webinarviewuserfiles11').innerHTML = htmlContentuserweb;
            document.getElementById('uerwebinarcomment').innerHTML = user_webcomment;
          }
          //End code for show webinar files for user




        }





    
        if (data.tact === "webinar") {
          var tactwebview = "Webinar";
        
          $("#webinarassets12").show();
          $("#ebbassetss").hide();
          $("#ebassets").hide();
          $("#rbassetss").hide();
          $("#tactics").hide();

        }
       
        else if (data.tact === "e_blast") {
          var tactwebview = "Email Blast";
          if (data.rb_type != "" && data.rb_assetname != "" && data.rb_assetlink != "") {
            $("#webinarassets12").hide();
            $("#ebassets").show();
            $("#rbassetss").show();
            $("#tactics").hide();
            $("#ebbassetss").show();
          }
          else {



          
            $("#webinarassets12").hide();
            $("#ebassets").show();
            $("#rbassetss").hide();
            $("#tactics").hide();
            $("#ebbassetss").show();

          }

         
        }

       

        setTimeout(function () {
          $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
          $('#message').html('');
        }, 5000);

        $('#action_button').attr('disabled', false);
        $('#leftnav').DataTable().ajax.reload();
        $('#apptask').DataTable().ajax.reload();
        $('#task_priorities').DataTable().ajax.reload();
        $('#todaysstask').DataTable().ajax.reload();
        $('#weeklytasks').DataTable().ajax.reload();


        // $('.viewreminderfiles11').ajax.reload();


      }







    });


  });




  // start code for edit image


  $(document).on('click', '.editimage', function () {



    var idtype = $(this).data('id');

    const myArray = idtype.split(" ");

    var id = myArray[0];
    var ebstatus = myArray[1];
    var eballocatedto = myArray[2];
    var blast_date = myArray[3];
    var rb_type = myArray[4];
    var rb_date = myArray[5];
    var blast_time = myArray[6];
    var tact = myArray[7];
    var blast_type = myArray[8];

    var showtact=myArray[9];

   




    $("#fileviewbox").show();

    $('#dynamic_modal_title').text('View Files');

    $('#action').val('editimage');

    $('#action_button').text('Upadte Image');
    $("#action_button").css("display", "none");
    $('#action_modal').modal('show');



    var action = $("#action").val();
   
    if (action === "editimage") {
     
      $("#viewdata11").hide();
      $("#editdataa").hide();
      $("#webinarblast").hide();
      $("#tactics").hide();
      $("#fileviewbox").show();

    }



    $.ajax({
      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: { id: id, action: 'fetch_files' },

      dataType: "JSON",
      success: function (data) {


        var camp_id = data.camp_id;

        var tactshowfiles="";



        if (tact === "Email-Blast") {
        
          // var admin_files=data.admin_files;

          var admin_filesname = data.admin_files;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          var tactshowfiles="Email Blast";
        

        }

        else if (tact === "Make-Good") {
        

          var admin_filesname = data.admin_ebmgfiles;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          var tactshowfiles="Make Good";
         

        }


        else if (tact === "Email-Reminder-Blast") {
        

          var admin_filesname = data.admin_rb_file;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          var tactshowfiles="Reminder-Blast";
         

        }

        else if (tact === "RB-Make-Good") {
        

          var admin_filesname = data.admin_rbmgfiles;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          var tactshowfiles="RB Make Good";
         

        }

        else if (tact === "Webinar") {
        


          var admin_filesname = data.admin_files;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          var tactshowfiles="Webinar";
         

        }


        var htmlContent = '';
        var htmlContent1 = '';
        var htmlContent2 = htmlContent + '' + htmlContent1;
        //var htmlData =admin_filesname;







        for (var i = 0; i < length; i++) {

        
        //  htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:100%"></td><td><p>' + admin_filesname[i] + '</p><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\' ></tr></td>', '</p>';




          if (admin_filesname[i] === undefined) {
          
         
          htmlContent += ' <tr id='+ admin_filesname[i]+'><td width="5%"><img src="../../assets/img/files-folder1.png" style="width:100%"></td><td><p>' + admin_filesname[i] + '</p><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="submit"  value="Delete" class="btn btn-danger" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\' ></tr></td>', '';


          }

          else if (admin_filesname[i] != '') {
           
         //   htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:100%"></td><td><p>' + admin_filesname[i] + '</p><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = ' + i + '   id = "image_id"  onchange="handleImageUpload(' + i + ')" > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'></tr></td>', '</p>';


            htmlContent += '<tr id="'+ admin_filesname[i] +'" style="background-color: #f3f3f3;"><td colspan="3"><button type="button"  style="border:none;background-color: #e8e8e8;"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'><img src="../../assets/img/files-folder1.png" style="width:10%;float: inline-start;"><p style="display:inline-block;float: inline-start;">' + admin_filesname[i] + '</p></button></td><td ><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;float: inline-start;"><input type="submit" value="Delete" class="btn btn-danger btn-sm bg-danger" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\' ></tr>', '';

          }




        }
       

        if (5 - length > 0) {

         
          htmlContent += ' <form enctype="multipart/form-data" id = "form_id"><p> <tr><td colspan="3">Upload File...<input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files[]"  class = "imageInput custom-file-input" data-id = "' + i + '" id = "image_id"  onchange="handleImageUpload(' + i + ')"  multiple></td><td> <input type="submit" class="btn btn-primary" onclick = "fileinsert1(this)" id = "btn' + i + '" data-id=\'' + camp_id + ','  + i + ',' + tact + '\'></tr></td>', '</p> </form>';

        }



      
        var htmltactshow="";
        htmltactshow += '<h5 style="color:red"> <b> '+tactshowfiles+' </b><h5>';
        document.getElementById('showtactsfiles').innerHTML = htmltactshow;

        console.log("htmltactshow" +htmltactshow)
        htmlContent2 += htmlContent + '' + htmlContent1;
        document.getElementById('container11').innerHTML = htmlContent2;



      


        $('#admin_files').val(data.admin_files);
        $('#id').val(data.id);



        setTimeout(function () {
          $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
          $('#message').html('');
        }, 5000);

      },

      error: function (data) {



        //  var camp_id=data.camp_id;

      
        var admin_files = data.admin_files;

        var admin_filesname = data.admin_files;

        var admin_filesname = admin_filesname.split(',');

        var length = admin_filesname.length;
       

      




        var htmlContent = '';
        var htmlContent1 = '';
        var htmlContent2 = htmlContent + '' + htmlContent1;
        //var htmlData =admin_filesname;
        for (var i = 0; i < 5; i++) {
          if (admin_filesname[i] === undefined) {
           
            htmlContent += '<p> <tr><td></td><td>Upload File...</td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = ' + i + '   id = "image_id"  onchange="handleImageUpload(' + i + ')" > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'></tr></td>', '</p>';


          }

          else if (admin_filesname[i] != '') {
            
            htmlContent += ' <tr id='+ admin_filesname[i]+'><td width="5%"><img src="../../assets/img/files-folder1.png" style="width:100%"></td><td><p>' + admin_filesname[i] + '</p><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = ' + i + '   id = "image_id"  onchange="handleImageUpload(' + i + ')" > <input type="submit"  value="Delete" class="btn btn-danger btn-sm bg-danger" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'></tr></td>';

          }




        }


        htmlContent2 += htmlContent + '' + htmlContent1;
        
        document.getElementById('container11').innerHTML = htmlContent2;

        $("#container11 .btn-primary").attr("disabled", true)


        $('#admin_files').val(data.admin_files);
        $('#id').val(data.id);



        setTimeout(function () {
          $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
          $('#message').html('');
        }, 5000);

      }


    });


  });

  // End code for edit image
  $(document).on('click', '.delete', function () {

    var id = $(this).data('id');

    if (confirm("Are you sure you want to delete this data?")) {
      $.ajax({
        url: "http://localhost:3000/alltask/action",
        method: "POST",
        data: { action: 'delete', id: id },
        dataType: "JSON",
        success: function (data) {

          $('#message').html('<div class="alert alert-success">' + data.message + '</div>');
          $('#leftnav').DataTable().ajax.reload();
          $('#apptask').DataTable().ajax.reload();
          $('#task_priorities').DataTable().ajax.reload();
          $('#todaysstask').DataTable().ajax.reload();
          $('#weeklytasks').DataTable().ajax.reload();
          setTimeout(function () {
            $('#message').html('');
          }, 5000);
        }
      });
    }

  });
});






$(document).on("click", ".open-homeEvents", function () {

  var idtype = $(this).data('id');

  console.log("idtype" +idtype);

  const myArray = idtype.split("---");

  var id = myArray[0];
  var ebstatus = myArray[1];
  var eballocatedto = myArray[2];
  var blast_date = myArray[3];
  var rb_type = myArray[4];
  var rb_date = myArray[5];
  var blast_time = myArray[6];
  var tact = myArray[7];
  var showtact = myArray[8];
  var showcmt = myArray[9];
 

 
  console.log("show cmt is:" +showcmt);
  console.log("showtact is" +showtact);
  $('#camp_id').val(id);

  $('#blast_type').val(blast_type);

  $('#tact').val(tact);
  $('#status').val(ebstatus);
  $('#comment').val(showcmt);
  $('#showtactics').val(showtact);
  

 

});





function myFunction() {


console.log("within myfunction");


  
  {




    $("#fileviewbox").show();
    $("#fileviewdownload").hide();

  var formData1 = new FormData(document.getElementById("sample_form"));
    console.log("formData1 is:" +formData1);
  var comment = $("#comment").val();
console.log("commet is:" +comment);
   

    var tact = $("#tact").val();
    var camp_id = $("#camp_id").val();

    console.log("tact within myfunction:" +tact);
    console.log("camp_id:" +camp_id);
   

    var comment_id = $("#comment_id");
    var comment_id = $("#comment_id").attr("data_id");
    var rb_status = $("#rbstatus").attr("data-id");

    //formData1.append("comment", comment);
    formData1.append("tact ", tact);
    formData1.append("camp_id ", camp_id);
    formData1.append("comment ", comment);
   // formData1.append("comment_id ", comment_id);

   
   // formData1.append("rb_status", rb_status);

    console.log({ formData1 });
    //   var camp_id = $('id')
    // if (confirm("Are you sure you want to update the data?")) {
    $.ajax({

      url: "http://localhost:3000/alltask/admin_comment",
      method: "POST",
      data: { tact:tact, camp_id:camp_id, comment:comment },
      dataType: "JSON",
    // contentType: false,
    //   processData: false,
      success: function (data) {
        if (data) {
        
         // $(".comment")
          // .html('<div class="alert alert-success">' + data.message + "</div>")
          // .fadeOut(4000);

          $('#message').html('<div class="alert alert-success">' + data.message + '</div>');
          $('#leftnav').DataTable().ajax.reload();
          $('#apptask').DataTable().ajax.reload();
          $('#task_priorities').DataTable().ajax.reload();
          $('#todaysstask').DataTable().ajax.reload();
          $('#weeklytasks').DataTable().ajax.reload();
          setTimeout(function () {
            $('#message').html('');
          }, 5000);
       //   $("#exampleModal").modal("show");
          $('#exampleModal').modal('hide');
          $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
          // $('#exampleModal').hide();
          $("#sample_form")[0].reset();
        } else {
        
          $(".comment")
            .html('<div class="alert alert-success">' + data.message + "</div>")
            .fadeOut(4000);

            $('#exampleModal').modal('hide');
            $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
          $("#sample_form")[0].reset();
       
        }
      },
    });
  }


 // else
  
  {
  //  $('#message').html('<p class="alert alert-primary">Please upload only five files...</p>').fadeOut(6000);

  
  // $('#exampleModal').modal('show');
  //   $('#insertfilemsg').html('<p class="alert alert-primary">Please upload only five files...</p>').fadeOut(6000);

  }

}



// start function for fileview




///function for upload image if no data avalilable





function imginsert1() {


  $("#fileinsertModal").modal("hide");

  var imageleng = document.getElementById('admin_files').files.length;

  console.log("imageleng is:" +imageleng)

  if (imageleng <= 5) {




    $("#fileviewbox").show();
    $("#fileviewdownload").hide();

    var formData1 = new FormData(document.getElementById("imginsert_form"));

  
var blast_type=$("#blast_type").val();
    var tact = $("#tact").val();
    var camp_id = $("#camp_id").val();
console.log("blast_type is:"+blast_type);
console.log("tact is:"+tact);

console.log("camp_id is:"+camp_id);


   
    formData1.set("camp_id", camp_id)
    formData1.set("tact", tact)
    //formData1.getAll("admin_files[]", admin_files)
   // formData1.getAll("admin_files[]", admin_files)
    formData1.getAll("admin_files[]", admin_files)
    console.log("check which files are selected" +admin_files);
    console.log(formData1.getAll("admin_files[]", admin_files));


    console.log({ formData1 });
    //   var camp_id = $('id')
    // if (confirm("Are you sure you want to update the data?")) {
    $.ajax({

      url: "http://localhost:3000/alltask/admin_imginsert",
      method: "POST",
      data: formData1,
      //   dataType: "JSON",
      contentType: false,
      processData: false,
      success: function (data) {
        if (data) {
          console.log("data in if:" + data);
          $(".comment")
          // .html('<div class="alert alert-success">' + data.message + "</div>")
          // .fadeOut(4000);

          $('#message').html('<div class="alert alert-success">' + data.message + '</div>');
          $('#leftnav').DataTable().ajax.reload();
          $('#apptask').DataTable().ajax.reload();
          $('#task_priorities').DataTable().ajax.reload();
          $('#todaysstask').DataTable().ajax.reload();
          $('#weeklytasks').DataTable().ajax.reload();
          setTimeout(function () {
            $('#message').html('');
          }, 5000);

        $('#fileinsertModal').hide();
          $("#imginsert_form")[0].reset();
          $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
          // $('#exampleModal').hide();
          //$("#sample_form")[0].reset();
        } else {
        
          $(".comment")
            .html('<div class="alert alert-success">' + data.message + "</div>")
            .fadeOut(4000);

            $('#exampleModal').modal('hide');
            $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
       
        }
      },
    });
  }


  else {
    $('#message').html('<p class="alert alert-primary">Please upload only five files...</p>').fadeOut(6000);
  }

}

//end code for function for image upload if no data available

function fileviewFunction(name) { //=> funtion for uploading images into data base //
  $('#exampleModal').modal('hide');


 


  var idtype = $(name).data('id');
 
  const myArray = idtype.split(",");

  var camp_id = myArray[0];

  var oldfname = myArray[1];
  var filenum = myArray[2];
  var tact = myArray[3];
  

  var admin_files = oldfname;
  if (tact === "Email-Blast") {
    var tactfolder = "Email-Blast";
  }

  else if (tact === "Email-Reminder-Blast") {
    var tactfolder = "Email-Reminder-Blast";
  }

  else if (tact === "Webinar") {
    var tactfolder = "Webinar";
  }

  //var dir3=`./files/${campid}/Admin/Email-Blast`;


  var url = "./files/" + camp_id + "/Admin/" + tactfolder + "/" + admin_files;
 
  //Create XMLHTTP Request.
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "blob";
  req.onload = function () {
    //Convert the Byte Data to BLOB object.
    var blob = new Blob([req.response], { type: "application/octetstream" });

    //Check the Browser type and download the File.
    var isIE = false || !!document.documentMode;
    if (isIE) {

  
      window.navigator.msSaveBlob(blob, admin_files);
    } else {


      var url = window.URL || window.webkitURL;

  
      link = url.createObjectURL(blob);
 
      var a = document.createElement("a");
  
      a.setAttribute("download", admin_files);

      a.setAttribute("href", link);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  req.send();


}
// End function for fileview










function fileReplace1(e) {
  // e.preventDefault()


  if (confirm("Are you sure you want to Delete this file?")) {


  $(e).closest("tr").remove();
 // return false;


  var id = $(e).parent().children('.imageInput').first().data("id");

  var idtype = $(e).data('id');

  const myArray = idtype.split(",");

  var camp_id = myArray[0];
  var oldfname = myArray[1];
  var filenum = myArray[2];
  var tact = myArray[3];






  var formData = new FormData();

 //var admin_files = $('.imageInput')[id].files[0]; // Get the selected file





  formData.append('tact', tact); // Append the file to FormData
  formData.append('camp_id', camp_id); // Append the file to FormData
  formData.append('filenum', filenum); // Append the file to FormData
  formData.append('oldfname', oldfname); // Append the file to FormData
 // formData.append('admin_files', admin_files); // Append the file to FormData

  // Make an Ajax POST request
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/alltask/admin_comment2', // Replace with your server-side script URL
    data: formData,
    processData: false, // Prevent jQuery from processing the data
    contentType: false, // Set content type to false, as we are using FormData
    success: function (response) {
      // Handle the server's response here

     
      //$('#task_form')[0].reset();

      //  $('.wrap_new').html('<p class="alert alert-success">Image Upload successfully..</p>').fadeOut(3000)

      // $("#container11").hide();
      //   $("#fileviewbox").hide();

    
$('#action_modal').modal('show'); // for hide root modal
// $("#action_modal").reload();

//location.reload();
      $('#deletemessage').html('<div class="alert alert-success">' + response.message + '</div>');
      $('#leftnav').DataTable().ajax.reload();
      $('#apptask').DataTable().ajax.reload();
      $('#task_priorities').DataTable().ajax.reload();
      $('#todaysstask').DataTable().ajax.reload();
      $('#weeklytasks').DataTable().ajax.reload();
      //  $('#task_form')[0].reset();
      setTimeout(function () {
        $('#deletemessage').html('');
      }, 5000);


    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error(xhr.responseText);
    }
  });

}
}


//end function for file update





//insert new file




function fileinsert1(e) {
  // e.preventDefault()


  var imageleng = document.getElementById('image_id').files.length;

  if(imageleng==0){
    $('#fupload1').show().html('<p class="alert alert-danger">Please upload atleast one file..</p>').fadeOut(4000);
 
    return;
 }


  var id = $(e).parent().children('.imageInput').first().data("id");


  var idtype = $(e).data('id');
 
  const myArray = idtype.split(",");
  var camp_id = myArray[0];
  var filenum = myArray[1];
  var tact = myArray[2];

  var filecountneeded=5-filenum;


  if (filecountneeded >= imageleng) {


  var imageleng = document.getElementById('admin_files');


 
  
 
  

  var admin_files = document.getElementById("image_id").files;
 
  var formData2 = new FormData();

 
  
 
  //formData2.append('admin_files', admin_files); // Append the file to FormData
  formData2.append('tact', tact); // Append the file to FormData
  formData2.append('camp_id', camp_id); // Append the file to FormData
  formData2.append('filenum', filenum); // Append the file to FormData

  for (let index = 0; index < admin_files.length; index++) {
    formData2.append('admin_files1', admin_files[index]);
    
  }

  //formData2.append('admin_files', admin_files);



  //var imageleng = document.getElementById('admin_files').files.length;

  //if (imageleng <= 5) {




    $("#fileviewbox").show();
    $("#fileviewdownload").hide();

    
    //   var camp_id = $('id')
    // if (confirm("Are you sure you want to update the data?")) {
    $.ajax({

      url: "http://localhost:3000/alltask/fileinsert",
      method: "POST",
      data: formData2,
    processData: false, // Prevent jQuery from processing the data
    contentType: false, // Set content type to false, as we are using FormData
    success: function (response) {

     
        if (response) {

          $('#action_button').attr('disabled', false);
          $('#action_modal').modal('hide');
          // .html('<div class="alert alert-success">' + data.message + "</div>")
          // .fadeOut(4000);

       //   $('#message').html('<div class="alert alert-success">' + data.message + '</div>');
       $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
          $('#leftnav').DataTable().ajax.reload();
          $('#apptask').DataTable().ajax.reload();
          $('#task_priorities').DataTable().ajax.reload();
          $('#todaysstask').DataTable().ajax.reload();
          $('#weeklytasks').DataTable().ajax.reload();
          setTimeout(function () {
            $('#message').html('');
          }, 5000);

          // $('#exampleModal').hide();
          $("#sample_form")[0].reset();
        

       //   $("#task_form")[0].reset();
        } else {
       
          $(".comment")
            .html('<div class="alert alert-success">' + data.message + "</div>")
            .fadeOut(4000);
        }
      },
    });
 

}
  else {
    $('#action_modal').modal('show');
    $('#deletemessage').html('<p class="alert alert-primary">Please upload only ' +filecountneeded+ ' files...</p>').fadeOut(6000);
  }
}



//code end for insert new file

function handleImageUpload(i) {



  $("#container11 .btn-primary").attr("disabled", true)
  $("#btn" + i).attr("disabled", false)

     
}





////code for view profile


function profileView(e) {//  start code for view profile data //

  // var date = $('#date').val();
  var user_id = $(e).data('id');
  

  
  $.ajax({
      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: {
          user_id: user_id,
          action: 'fetch_single_Profile'
      },

      dataType: "JSON",
      success: function(data) {
      
          $('#first_namea').val(data.first_name);
          $('#last_namea').val(data.last_name);
          $('#emaila').val(data.email);
          $('#phonea').val(data.phone);
          $('#user_namea').val(data.user_name);
         
          // $('#date').val(data.date);
          // $('#user_id').val(data.user_id);
          $('#table_data').DataTable().ajax.reload();

      }
     });
  };


//end code for view profile