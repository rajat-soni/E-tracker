
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
          console.log("row camp id:" + row.camp_id);
          console.log("row Tact:" + row.tact);

          if (row.tact == "Email Blast / Reminder Blast") {
            var tact = "Email-Reminder-Blast";

            console.log("set tact is Email-Reminder-Blast");
          }

          if (row.tact == "Email Blast") {
            console.log("Email Blast");
            var tact = "Email-Blast";
          }



          if (row.tact == "Webinar") {
            console.log("Webinar Blast");
            var tact = "Webinar";
          }



          if (row.camp_id === null || (row.tact == "Email Blast / Reminder Blast" && row.admin_rb_file == "")) {

            return `
     
            <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
           
           
            <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `"><i class="fa fa-pencil"></i></button>

            <button type="button" class="btn btn-link btn-sm view1" data-id ="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>


               
            <button type="button" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `">
            <i class="fa fa-upload"></i></button>
           </button>
           
           <!-- Modal -->
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

                 <input type="hidden" name="camp_id" id="camp_id"/ >
                 <input type = "hidden" id ="blast_type" id="blast_type"/  >
                 <input type = "hidden" id ="tact" name="tact"/  >
                 <input type = "hidden" id ="status"   >

                 <input type = "hidden" id ="comment_id"  data-id = " ` + row.comment_id + `" >
                 <input type = "hidden" id ="rbstatus"  data-id = " ` + row.rbstatus + `" >
                 
                 
            
               
                 
                 <br>
                 <textarea class="form-control"  id = "commentebrb" name = "commentebrb" placeholder="Add Comment..." id="floatingTextarea"></textarea>
                 <span>Add Comment...</span>
                 <br><br>
                 
                 <input type = "file" class="form-control" name = "admin_files[]" id = "admin_files"  multiple>
                 <span >(upload max 5 files)</span>
                
               </div>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                   <button type="button" class="btn btn-primary" onclick="myFunction()" data-id="`+ row.id + '' + tact + ` ">Send Comment</button>
                 </div>
               </div>
             </div>
           </div>

           </form>
                                  
              `;
          }

          else {
            return `

                  
           


                   
            <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
           
           
            <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + row.tact + `"><i class="fa fa-pencil"></i></button>

            <button type="button" class="btn btn-link btn-sm view1" data-id ="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>




            <button type="button"    class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `"><i class="fa fa-upload"></i></button>



               
            <button type="button" style="display:none" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `">
            Comment
           </button>
           
         
                                  
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
          return `
                    
          <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
                   
                   
          <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + row.tact + `"><i class="fa fa-pencil"></i></button>

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
          return `
                    
          <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
                   
                   
          <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + row.tact + `"><i class="fa fa-pencil"></i></button>

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
          return `
                    
          <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>
                   
                   
          <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + row.tact + `"><i class="fa fa-pencil"></i></button>

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
    

    $('#action').val('Add');

    $('#action_button').text('Add');

    $('#action_modal').modal('show');

    $("#addcname").show();
    $("#tactebweb option").prop('disabled', false);

    $('#action_button').text('Add').show();


    var btn = $('#action_button').text('Add');

  

    $("#fileviewbox").hide();
    $("#webinarblast").hide();
    $("#editdataa").hide();
    // code start for select tact
    if (btn.text() == 'Add') {

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
              console.log(this.value);
              var today = updatedcurrentdate;
              console.log(today);

              $("#blast_time").val('');
              if (this.value === today) {
                var thisHour = getCurrentTime(new Date());
                console.log("check updated time" + thisHour);
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

            console.log("updateddate" + updateddate);
            console.log("Updated currentDate" + updatedcurrentdate);

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
          console.log(this.value);



          var today1 = new Date();
          console.log("Today date" + today1);


          function addMinutes(date, minutes) {
            date.setMinutes(date.getMinutes() + minutes);

            return date;
          }

          const currentDate1 = new Date();

          //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

          const result11 = addMinutes(currentDate1, 30);
          console.log("Updated Date:  " + result11); // 👉️ 2023-07-27T17:24:52.897Z
          //  var dd = String(today.getDate()).padStart(2, '0');
          //   var mm = String(today.getMonth() + 1).padStart(2, '0');
          //   var yyyy = today.getFullYear();

          //   today = yyyy + '-' + mm + '-' + dd;


          var ddcurrent1 = String(result11.getDate()).padStart(2, '0');
          var mmcurrent1 = String(result11.getMonth() + 1).padStart(2, '0');
          var yyyycurrent1 = result11.getFullYear();

          var updatedcurrentdate1 = yyyycurrent1 + '-' + mmcurrent1 + '-' + ddcurrent1;

          console.log("updatedcurrentdate1:" + updatedcurrentdate1);




          var dd11 = String(result11.getDate()).padStart(2, '0');
          var mm11 = String(result11.getMonth() + 1).padStart(2, '0');
          var yyyy11 = result11.getFullYear();

          var updateddate11 = yyyy11 + '-' + mm11 + '-' + dd11;

          console.log("updateddate11:" + updateddate11);

          var hours1 = result11.getHours();
          var minutes1 = result11.getMinutes();
          var seconds1 = result11.getSeconds();

          var updatedtime111 = hours1 + ":" + minutes1 + ":" + seconds1;
          console.log("updatedtime" + updatedtime111);

          $('#registration_date').attr('min', updateddate11);

          $(function () {
            $('#registration_time').timepicker({
              'timeFormat': 'h:i A',
              step: 1
            });
          });

          $("#registration_date").change(function () {
            console.log("Print this value");
            console.log(this.value);
            var today11 = updateddate11;
            console.log("Today Date:" + today11);

            $("#registration_time").val('');
            if (this.value === today11) {
              var thisHour = getCurrentTime(new Date());
              console.log(thisHour);
              var updatedtime = hours1 + ":" + minutes1;
              console.log("updated time for webinar:" + updatedtime);
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

          console.log("updateddate" + updateddate11);
          console.log("Updated currentDate in webinar" + updatedcurrentdate1);



        }

        else {
          $("#webinarblast").hide();
          $("#editdataa").hide();
          console.log(this.value);
        }

      });

      console.log("Button text is add");
    }

    //code end for select tact


    else {

      // $("#viewdata11").show();
    }







  });





  $('#task_form').on('submit', function (event) {

    event.preventDefault();


    $.ajax({

      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: $('#task_form').serialize(),
      dataType: "json",
      beforeSend: function () {
        $('#action_button').attr('disabled', 'disabled');
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

  });


  $(document).on('click', '.edit', function () {



    console.log("Edit data js file");


    //  var id = $(this).data('id');

    $('#dynamic_modal_title').text('Edit Data');

    $('#action').val('Edit');

    $('#action_button').text('Edit');

    $('#action_modal').modal('show');
    $("#tactics").show();

    var btn = $('#action_button').text('Edit');

    var checktect = btn.text();
    console.log("Button text:" + checktect);

    if (btn.text() === "Edit") {

      $('#cname_error').hide();
      $('#camp_error').hide();
      $('#camp_from_error').hide();
      $('#blast_error').hide();
      $('#error_priority').hide();
      $('#error_allocated').hide();
      $('#error_Tact').hide();
      $('#error_blast_type').hide();
      $('#action_button').text('Edit').show();
      console.log("Within if button text is edit");
    }

    else {
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
      console.log("within if condition");
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
      console.log("Updated Date:  " + resultrbdt); // 👉️ 2023-07-27T17:24:52.897Z
      var dd2 = String(resultrbdt.getDate()).padStart(2, '0');
      var mm2 = String(resultrbdt.getMonth() + 1).padStart(2, '0');
      var yyyy2 = resultrbdt.getFullYear();

      var updatedrbdate = yyyy2 + '-' + mm2 + '-' + dd2;
      $('#rb_date').attr('min', updatedrbdate);



      //Code start for Blast Date and Time for Edit

      var today = new Date();
      console.log("Today date" + today);


      function addMinutes(date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);

        return date;
      }

      const currentDaterb = new Date();

      //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

      const resulteb = addMinutes(currentDaterb, 30);
      console.log("Updated Date:  " + resulteb); // 👉️ 2023-07-27T17:24:52.897Z
      //  var dd = String(today.getDate()).padStart(2, '0');
      //   var mm = String(today.getMonth() + 1).padStart(2, '0');
      //   var yyyy = today.getFullYear();

      //   today = yyyy + '-' + mm + '-' + dd;


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
      console.log("updatedtimeeb" + updatedtimeeb);

      $('#blast_date').attr('min', updateddateeb);

      $(function () {
        $('#blast_time').timepicker({
          'timeFormat': 'h:i A',
          step: 1
        });
      });

      $("#blast_date").change(function () {
        console.log(this.value);
        var today = updateddateeb;
        console.log(today);

        $("#blast_time").val('');
        if (this.value === today) {
          var thisHour = getCurrentTime(new Date());
          console.log(thisHour);
          var updatedtimeeb = hourseb + ":" + minuteseb;
          console.log("Updated Time edit" + updatedtimeeb);
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


      //  code start for add 30 min on Reminder blast time
      function addMinutes(date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);

        return date;
      }

      const currentDate1 = new Date();

      //      const date = new Date('Wed Aug 16 2023 23:43:55 GMT+0530 (India Standard Time)');

      const result1 = addMinutes(currentDate1, 30);
      console.log("Updated Date:  " + result1); // 👉️ 2023-07-27T17:24:52.897Z


      var ddcurrent = String(result1.getDate()).padStart(2, '0');
      var mmcurrent = String(result1.getMonth() + 1).padStart(2, '0');
      var yyyycurrent = result1.getFullYear();

      var updatedcurrentdaterb = yyyycurrent + '-' + mmcurrent + '-' + ddcurrent;


      var hours = result1.getHours();
      var minutes = result1.getMinutes();
      var seconds = result1.getSeconds();

      var updatedtime = hours + ":" + minutes + ":" + seconds;
      console.log("updatedtime 1" + updatedtime);

      $(function () {
        $('#rb_time').timepicker({
          'timeFormat': 'h:i A',
          step: 1
        });
      });

      $("#rb_date").change(function () {
        //console.log(this.value);
        var today1 = updatedcurrentdaterb;
        console.log("today date:" + today1);

        $("#rb_time").val('');
        if (this.value === today1) {
          var thisHour = getCurrentTime(new Date());
          console.log(thisHour);
          var updatedtime = hours + ":" + minutes;
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
      console.log("Check Tact in edit condition:" + tact);



      var eblastdttime = blast_date + ' ' + blast_time;



      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;




      console.log("id " + id);
      console.log("ebstatus " + ebstatus);
      console.log("eballocatedto " + eballocatedto);
      console.log("blast_date " + blast_date);
      console.log("rb_type " + rb_type);






    }

    else {
      $("#tactebweb option").prop('disabled', false);

    }



    $('#cname').on('change', function () {


      var cname = $("#cname").val();
      var cname = $(this).val();

      if ($(this).val()) {
        console.log("Selected value:" + cname);
        $("#senerdtl").show();
        console.log("Code above ajax");
        $.ajax({
          url: "http://localhost:3000/alltask/action",
          method: "POST",
          data: { id: id, cname: cname, action: 'fetch_senderdtl' },

          dataType: "JSON",
          success: function (data) {
            console.log("Success function");

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


    if (action === "Edit") {
      console.log(" Rajashri Edit Action if condition");
      // $("#viewdata1").hide();


      $("#viewdata11").hide();
      $("#eblst1").hide();
      $("#senerdtl").show();
      $('#asset_name')[0].disabled = false;
      $('#asset_link')[0].disabled = false;
      $('#blast_date')[0].disabled = false;
      $('#blast_time')[0].disabled = false;
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

      console.log("Second:" + seconds);
      if (seconds > 0 && ebstatus == 0) {
        console.log("1st else if Eblast Completed");
        console.log("eblastdttime:  " + eblastdttime);
        console.log("dateTimecheck:  " + dateTimecheck);

        document.querySelectorAll("#blast_typerr option").forEach(opt => {
          if (opt.value == "Reminder-Blast") {
            opt.disabled = true;
          }
        });
        //$('#blast_typerr').prop('selectedIndex', 1);

      }


      else if (ebstatus == 1) {
        console.log("2nd else if Eblast Completed");
        console.log("eblastdttime:  " + eblastdttime);
        console.log("dateTimecheck:  " + dateTimecheck);

        document.querySelectorAll("#blast_typerr option").forEach(opt => {
          if (opt.value == "Reminder-Blast") {
            opt.disabled = false;
          }
        });
        //$('#blast_typerr').prop('selectedIndex', 1);

      }


      else {
        console.log("Eblast Completed");

        document.querySelectorAll("#blast_typerr option").forEach(opt => {
          if (opt.value == "Reminder-Blast") {
            opt.disabled = false;
          }
        });

        //$("#blast_typerr option[value=" + Reminder-Blast + "]").attr("disabled", "disabled");

      }

      if (today > rb_date && rb_date != "") {
        $("#rb_date").removeAttr("min");

      }

      if (today > blast_date && blast_date != "") {
        $("#blast_date").removeAttr("min");
        $("#webinarassets11").hide();
        $("#assets").hide();
        $("#ebassets").show();
      }

      if (today > blast_date && today > rb_date && blast_date != "" && rb_date != "") {
        console.log("today greater than blast and rb date");
        $("#rb_date").removeAttr("min");
        $("#blast_date").removeAttr("min");
        $('#action_button').text('Edit').hide();

      }

    }



    $('#blast_typerr').on('change', function () {
      // var id = request.body.id;

      var action = $("#action").val();


      var blast_type = $("#blast_type").val();
      var blast_type = $(this).val();

      console.log("On Blast type err" + blast_type);

      if (blast_type == "Reminder-Blast") {
        if (ebstatus == "0" && blast_date < today) {
          console.log("Status");
          console.log(ebstatus);
          console.log(" option  disaabled");
          $("#rballocated_to option[value=" + eballocatedto + "]").attr("disabled", "disabled");
        }
        else {
          console.log("Else condition True");
          $("#rballocated_to ").removeAttr("disabled", "disabled");

        }

      }



      console.log("Current date:" + today);

      $("#ebassets").hide();
      $("#assets").hide();
      $("#reblastassets").hide();





      if (blast_type == 'E-blast' && today <= blast_date && blast_date != "") {
        console.log(blast_type);
        $("#ebassets").hide();
        $("#assets").show();
        $("#reblastassets").hide();
        $("#remblastassetsread").hide();
        $('#asset_name')[0].disabled = false;
        $('#asset_link')[0].disabled = false;
        $('#blast_date')[0].disabled = false;
        $('#blast_time')[0].disabled = false;

      }
      else if (blast_type == 'E-blast' && today > blast_date && blast_date != "") {
        console.log("blast type" + blast_type);
        $("#ebassets").show();
        $("#assets").hide();
        $("#reblastassets").hide();
        $("#remblastassetsread").hide();

        // $("#blast_date").removeAttr("min");


        // $('#asset_name')[0].disabled = true;
        // $('#asset_link')[0].disabled = true;
        // $('#blast_date')[0].disabled = true;
        // $('#blast_time')[0].disabled = true;

      }


      else if (blast_type == 'Reminder-Blast' && rb_date == "") {


        $("#ebassets").hide();
        $("#reblastassets").show();
        $("#remblastassetsread").hide();
        $("#assets").hide();
      }

      else if (blast_type == 'Reminder-Blast' && today <= rb_date) {

       
       
        $("#ebassets").hide();
        $("#reblastassets").show();
        $("#assets").hide();
        $("#remblastassetsread").hide();


        $('#rballocated_to')[0].disabled = false;
        $('#rb_assetname')[0].disabled = false;
        $('#rb_asset_link')[0].disabled = false;
        $('#rb_date')[0].disabled = false;
        $('#rb_time')[0].disabled = false;

      }



      else if (blast_type == 'Reminder-Blast' && today > rb_date) {
        console.log("Second If Condition");
        console.log("Today" + today);
        console.log("Rem Date" + rb_date);
        $("#ebassets").hide();
        $("#assets").hide();
        $("#reblastassets").hide();
        $("#remblastassetsread").show();

        // $("#rb_date").removeAttr("min");



        // $('#rballocated_to')[0].disabled = true;
        // $('#rb_assetname')[0].disabled = true;
        // $('#rb_asset_link')[0].disabled = true;
        // $('#rb_date')[0].disabled = true;
        // $('#rb_time')[0].disabled = true;

      }



      else if (blast_type == 'E-blast' && today > blast_date && blast_date != "") {
        console.log("blast type" + blast_type);
        $("#ebassets").show();
        $("#assets").hide();
        $("#reblastassets").hide();
        $("#remblastassetsread").hide();


      }





      else {
        // $("#asset_name").show();
        // $("#reblastassets").hide();
        // $("#assets").hide();

      }






    });




    if (tact === "Webinar") {

      $("#editdataa").hide();
      $("#webinarblast").show();

      if (today > blast_date && blast_date != "") {
        console.log("today greater than Webinar date");
        $('input').attr('readonly', true);
        $('select').attr('readonly', true);
        $('textarea').attr('readonly', true);
        $("#rb_date").removeAttr("min");
        $("#blast_date").removeAttr("min");
        $('#action_button').text('Edit').hide();

      }
      else {
        console.log("Else condition today greater than Webinar date");
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
      console.log("Updated Date:  " + result12); // 👉️ 2023-07-27T17:24:52.897Z


      var ddcurrent12 = String(result12.getDate()).padStart(2, '0');
      var mmcurrent12 = String(result12.getMonth() + 1).padStart(2, '0');
      var yyyycurrent12 = result12.getFullYear();

      var updatedcurrentdatewebinar = yyyycurrent12 + '-' + mmcurrent12 + '-' + ddcurrent12;


      var hours12 = result12.getHours();
      var minutes12 = result12.getMinutes();
      var seconds12 = result12.getSeconds();

      var updatedtime12 = hours12 + ":" + minutes12 + ":" + seconds12;
      console.log("updatedtime 12" + updatedtime12);

      $(function () {
        $('#registration_time').timepicker({
          'timeFormat': 'h:i A',
          step: 1
        });
      });

      $("#registration_date").change(function () {
        console.log("check date after date clicked");
        console.log(this.value);
        var today12 = updatedcurrentdatewebinar;
        console.log("today date:" + today12);

        $("#registration_time").val('');
        if (this.value === today12) {
          var thisHour12 = getCurrentTime(new Date());
          console.log(thisHour12);
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


    else if (tact === "Email") {

      $("#editdataa").show();
      $("#fileviewbox").hide();
      $("#webinarblast").hide();



      if (today > blast_date && today > rb_date && blast_date != "" && rb_date != "") {


        console.log("today greater than blast and rb date");
        $('input').attr('readonly', true);
        $('select').attr('readonly', true);
        $('textarea').attr('readonly', true);
        $("#rb_date").removeAttr("min");
        $("#blast_date").removeAttr("min");
        $('#action_button').text('Edit').hide();

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

    console.log("Rajashri new edit action");
    console.log(id);


    $.ajax({
      url: "http://localhost:3000/alltask/action",
      method: "POST",
      data: { id: id, action: 'fetch_single' },

      dataType: "JSON",
      success: function (data) {


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
        // $('#webcomment').val(data.comment);




        // $('#comment').val(data.comment);
        $('#priority').val(data.priority);
        $('#allocated_to').val(data.allocated_to);
        $('#id').val(data.id);

        setTimeout(function () {
          $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
          $('#message').html('');
        }, 5000);
        //console.log("Rajashri Success new edit action");

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

    //var id = $(this).data('id');

    var id = $(this).data('id');
    const myArray1 = id.split(" ");


    var id = myArray1[0];

    console.log("ID IS:" + id);



    $('#dynamic_modal_title').text('View Data');

    $('#action').val('view1');

    // $('#action_button').text('View');
    $("#action_button").css("display", "none");
    $('#action_modal').modal('show');



    var action = $("#action").val();
    console.log("View1 action Rajashri");
    console.log(action);
    if (action === "view1") {

      console.log("If View condition is true");
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
          console.log("RB Asset Empty rbassetss hide");
          $("#rbassetss").hide();
        }
        else {
          console.log("RB Asset not Empty rbassetss show");
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


        var adminebcomment = data.comment;
        var adminrbcomment = data.rb_comment;



        console.log("Check tact in view condition");

        if (tact === "e_blast") {
          $("#webinarfileviewdownload").hide();
          var tact = "Email-Blast";



          //code for admin files
          if (!admin_filesname) {
            var htmlContent = '';
            console.log(htmlContent);


            document.getElementById('viewfiles11').innerHTML = htmlContent;

          }
          else {
            console.log("else condition admin_filesname not empty:" + admin_filesname);

            var admin_filesname = admin_filesname.split(',');

            var length = admin_filesname.length;


            console.log("length of admin file:" + length);

            var htmladminebcmt = '';
            
            htmladminebcmt += '<p> <tr><td width="5%"><b>Admin EB Comment:   </b> ' + adminebcomment + ' </td> </tr>', '</p>';


       


          


            var htmlContent = '';
            //var htmlData =admin_filesname;
            for (var i = 0; i < length; i++) {




              htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:20%">' + admin_filesname[i] + '<br><br><button type="button" class="btn btn-primary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td> </tr>', '</p>';

            }
            console.log("htmladminebcmt" + htmladminebcmt);

            document.getElementById('adminebcomment').innerHTML = htmladminebcmt;

   
            document.getElementById('viewfiles11').innerHTML = htmlContent;
          }
          

          var admin_reminderfiles = data.admin_rb_file;
          console.log("admin RB file:" + admin_reminderfiles);



          if (!admin_reminderfiles) {



          }
          else {
            var htmlContentrb = '';
            console.log("Empty Admin Reminder Files:" + admin_reminderfiles);
            if (admin_reminderfiles == "") {

            }
            else {

              document.getElementById('viewreminderfiles11').innerHTML = htmlContentrb;



              console.log("within if condition:" + admin_reminderfiles);



              console.log("Reminder file else condition");

              var admin_reminderfiles = admin_reminderfiles.split(',');
              console.log("admin_reminderfiles:" + admin_reminderfiles);
              var lengthrbfile = admin_reminderfiles.length;
              console.log("length of admin RB file:" + lengthrbfile);
              console.log("within else condition:" + admin_reminderfiles);

              var htmlContentrb = '';

              var tact = "Email-Reminder-Blast";
              //var htmlData =admin_filesname;
              for (var i = 0; i < lengthrbfile; i++) {

                htmlContentrb += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:20%">' + admin_reminderfiles[i] + '<br><br><button type="button" class="btn btn-primary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_reminderfiles[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td></tr>', '</p>';

              }


              console.log("htmlContentrb:" +htmlContentrb);


              document.getElementById('viewreminderfiles11').innerHTML = htmlContentrb;

              
            }
            var adminrbcomment = data.rb_comment;
          console.log("adminrbcomment:" +adminrbcomment);
          var htmladminrbcmt = '';
          htmladminrbcmt += '<p> <tr><td width="5%"><b>Admin RB Comment:   </b> ' + adminrbcomment + ' </td> </tr>', '</p>';
          document.getElementById('adminrbcomment').innerHTML = htmladminrbcmt;
          }


          //code for admin files



          //code start for user files


          if (!user_ebfiles) {
            var htmlContentusereb = '';
            console.log("User files are empty");
            console.log(htmlContentusereb);


            document.getElementById('userviewfiles11').innerHTML = htmlContentusereb;

          }
          else {
            console.log("else condition user files are not empty:" + user_ebfiles);

            var user_ebfiles = user_ebfiles.split(',');

            var length = user_ebfiles.length;


            console.log("length of admin file:" + length);

            var htmlContentusereb = '';
            //var htmlData =admin_filesname;
            for (var i = 0; i < length; i++) {



              htmlContentusereb += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:20%">' + user_ebfiles[i] + '<br><br><button type="button" class="btn btn-primary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + user_ebfiles[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td> </tr>', '</p>';

            }
            console.log(htmlContentusereb);


            document.getElementById('userviewfiles11').innerHTML = htmlContentusereb;
          }


          var user_rbfiles = data.user_rbfiles;
          console.log("user RB file:" + user_rbfiles);



          if (!user_rbfiles) {



          }
          else {
            var userhtmlContentrb = '';
            console.log("Empty User Reminder Files:" + user_rbfiles);
            if (user_rbfiles == "") {

            }
            else {

              document.getElementById('userviewreminderfiles11').innerHTML = userhtmlContentrb;



              console.log("within if condition:" + user_rbfiles);



              console.log("Reminder file else condition");

              var user_rbfiles = user_rbfiles.split(',');
              console.log("user_rbfiles:" + user_rbfiles);
              var lengthrbfile = user_rbfiles.length;
              console.log("length of User RB file:" + lengthrbfile);
              console.log("within else condition:" + user_rbfiles);

              var userhtmlContentrb = '';

              var tact = "Email-Reminder-Blast";
              //var htmlData =admin_filesname;
              for (var i = 0; i < lengthrbfile; i++) {

                userhtmlContentrb += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:20%">' + user_rbfiles[i] + '<br><br><button type="button" class="btn btn-primary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + user_rbfiles[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td></tr>', '</p>';

              }


              console.log(userhtmlContentrb);


              document.getElementById('userviewreminderfiles11').innerHTML = userhtmlContentrb;
            }
          }


          //code end for user files

        }





        else if (tact == "webinar") {



          $("#fileviewdownload").hide();
          $("#userfileviewdownload").hide();


          var adminwebinarcomment = data.comment;

          var adminwebinarcomment ="<p style='font-size:12px;'><b>Admin Comment:   </b>" +data.comment+"</p>";

          var tact = "Webinar";



          if (!admin_filesname) {
            var htmlContent = '';
            console.log(htmlContent);


            document.getElementById('webinarviewfiles11').innerHTML = htmlContent;

          }
          else {
            console.log("else condition admin_filesname not empty:" + admin_filesname);

            var admin_filesname = admin_filesname.split(',');

            var length = admin_filesname.length;


            console.log("length of admin file:" + length);

            var htmlContent = '';
            //var htmlData =admin_filesname;
            for (var i = 0; i < length; i++) {



              htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:20%">' + admin_filesname[i] + '<br><br><button type="button" class="btn btn-primary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td> </tr>', '</p>';

            }
            console.log(htmlContent);


            document.getElementById('webinarviewfiles11').innerHTML = htmlContent;
            document.getElementById('adminwebinarcomment').innerHTML = adminwebinarcomment;
          }






        }





        console.log("check tact 11:" + data.tact);
        if (data.tact === "webinar") {
          var tactwebview = "Webinar";
          console.log("tact is webinar");

          console.log("data tact is:" + data.tact);
          $("#webinarassets12").show();
          $("#ebbassetss").hide();
          $("#ebassets").hide();
          $("#rbassetss").hide();
          $("#tactics").hide();

        }
        // else if(data.tact==="Email Blast / Reminder Blast") {
        //   console.log("tact is not webinar");
        //   $("#webinarassets12").hide();
        //   $("#ebassets").show();
        //   $("#rbassetss").show();
        // }
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



            console.log("rb type rb asset name rb asset links are empty fields.....");
            $("#webinarassets12").hide();
            $("#ebassets").show();
            $("#rbassetss").hide();
            $("#tactics").hide();
            $("#ebbassetss").show();

          }

          // console.log("tact is Email Blast");
          // $("#webinarassets12").hide();
          // $("#ebassets").show();
          // $("#rbassetss").hide(); 
        }
        console.log("Check Camp ID:" + camp_id);
        console.log("Check tact :" + tact);


        console.log("admin_filesname is:" + admin_filesname);



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

    console.log("Check id in edit condition:" + id);

    console.log("Check Tact in edit condition:" + tact);




    $("#fileviewbox").show();

    $('#dynamic_modal_title').text('View Files');

    $('#action').val('editimage');

    $('#action_button').text('Upadte Image');
    $("#action_button").css("display", "none");
    $('#action_modal').modal('show');



    var action = $("#action").val();
    console.log("editimage action Rajashri");
    console.log(action);
    if (action === "editimage") {
      console.log("If editimage condition is true");
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

        console.log("camp id checks:" + camp_id);



        if (tact === "Email-Blast") {
          console.log("Tact is Email Blast");
          // var admin_files=data.admin_files;

          var admin_filesname = data.admin_files;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          console.log("check length:" + length);

          console.log("admin_filesname:" + admin_filesname);

        }
        else if (tact === "Email-Reminder-Blast") {
          console.log("Tact is Email-Reminder-Blast");

          var admin_filesname = data.admin_rb_file;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          console.log("check length:" + length);

          console.log(" admin_rb_file:" + admin_filesname);

        }
        else if (tact === "Webinar") {
          console.log("Tact is Webinar");


          var admin_filesname = data.admin_files;

          var admin_filesname = admin_filesname.split(',');

          var length = admin_filesname.length;
          console.log("check length:" + length);

          console.log("admin_filesname:");

        }


        var htmlContent = '';
        var htmlContent1 = '';
        var htmlContent2 = htmlContent + '' + htmlContent1;
        //var htmlData =admin_filesname;







        for (var i = 0; i < length; i++) {

          console.log("tact is:" + tact);
          console.log("Within else condition...");
          console.log(admin_filesname[i]);
          htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:100%"></td><td><p>' + admin_filesname[i] + '</p><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = ' + i + '  id = "image_id"  onchange="handleImageUpload(' + i + ')"  > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\' ></tr></td>', '</p>';


        }

        if (5 - length > 0) {

          console.log("tact is:" + tact);
          console.log("Within if condition...");
          console.log(admin_filesname[i]);
          htmlContent += ' <form enctype="multipart/form-data" id = "form_id"><p> <tr><td></td><td>Upload File...</td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = "' + i + '" id = "image_id"  onchange="handleImageUpload(' + i + ')" > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)" id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'></tr></td>', '</p> </form>';

        }








        // for (var i = 0; i < 5; i++)
        //  { 
        //   if(admin_filesname[i] === undefined)

        //   { console.log("tact is:" +tact);
        //     console.log("Within if condition...");
        //     console.log(admin_filesname[i]);
        //     htmlContent += ' <form enctype="multipart/form-data" id = "form_id"><p> <tr><td></td><td>Upload File...</td><td><input type="text" value='+admin_filesname[i]+ ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = "'+i+'" id = "image_id"  onchange="handleImageUpload('+i+')" > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)" id = "btn'+i+'" data-id=\''+ camp_id + ',' + admin_filesname[i] + ',' + i + ',' +tact+ '\'></tr></td>' ,'</p> </form>' ;


        //   }

        //   else  if(admin_filesname[i] != '')
        //   {
        //     console.log("tact is:" +tact);
        //     console.log("Within else condition...");
        //     console.log(admin_filesname[i]);
        //     htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:100%"></td><td><p>'+admin_filesname[i]+'</p><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\''+ camp_id + ',' + admin_filesname[i] + ',' + i +  ','  + tact +'\'>Download File for view</button></td><td><input type="text" value='+admin_filesname[i]+ ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = '+i+'  > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)" data-id=\''+ camp_id + ',' + admin_filesname[i] + ',' + i + ',' +tact+'\'></tr></td>' ,'</p>' ;

        //   }


        // }





        htmlContent2 += htmlContent + '' + htmlContent1;
        console.log("htmlContent2:" + htmlContent2);


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

        console.log("camp id checks:" + id);
        var admin_files = data.admin_files;

        var admin_filesname = data.admin_files;

        var admin_filesname = admin_filesname.split(',');

        var length = admin_filesname.length;
        console.log("check length:" + length);

        console.log("admin_filesname:")




        var htmlContent = '';
        var htmlContent1 = '';
        var htmlContent2 = htmlContent + '' + htmlContent1;
        //var htmlData =admin_filesname;
        for (var i = 0; i < 5; i++) {
          if (admin_filesname[i] === undefined) {
            console.log("Within if condition...");

            console.log("tact is:" + tact);
            console.log(admin_filesname[i]);
            htmlContent += '<p> <tr><td></td><td>Upload File...</td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = ' + i + '   id = "image_id"  onchange="handleImageUpload(' + i + ')" > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'></tr></td>', '</p>';


          }

          else if (admin_filesname[i] != '') {
            console.log("tact is:" + tact);
            console.log("Within else condition...");
            console.log(admin_filesname[i]);
            htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:100%"></td><td><p>' + admin_filesname[i] + '</p><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'>Download File for view</button></td><td><input type="text" value=' + admin_filesname[i] + ' name="filenum" style="display:none;"><input type="file" name="admin_files" class = "imageInput custom-file-input" data-id = ' + i + '   id = "image_id"  onchange="handleImageUpload(' + i + ')" > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)"  id = "btn' + i + '" data-id=\'' + camp_id + ',' + admin_filesname[i] + ',' + i + ',' + tact + '\'></tr></td>', '</p>';

          }




        }


        htmlContent2 += htmlContent + '' + htmlContent1;
        console.log(htmlContent2);


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
  console.log("idtype:" + idtype);
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

  console.log("ID:" + id);
  console.log("tact is:" + tact);
  console.log("blast_type is:" + blast_type);
  //var eventId = $(this).data('id');
  //$('#eventId').html( id );
  $('#camp_id').val(id);

  $('#blast_type').val(blast_type);

  $('#tact').val(tact);
  $('#status').val(ebstatus);
  console.log("Check after examplemodal clicked:" + idtype);

});





function myFunction() {


  $("#exampleModal").modal("hide");

  var imageleng = document.getElementById('admin_files').files.length;

  if (imageleng <= 5) {




    $("#fileviewbox").show();
    $("#fileviewdownload").hide();

    var formData1 = new FormData(document.getElementById("sample_form"));

    var comment = $("#commentebrb").val();

    console.log("comment check which passed:" + comment);

    var tact = $("#tact").val();
    var camp_id = $("#camp_id").val();

    var comment_id = $("#comment_id");
    var comment_id = $("#comment_id").attr("data_id");
    var rb_status = $("#rbstatus").attr("data-id");

    formData1.append("comment", comment);
    //console.log(formData1.append("comment", comment));
    formData1.append("comment_id ", comment_id);
    formData1.getAll("admin_files[]", admin_files)
    console.log("check which files are selected");
    console.log(formData1.getAll("admin_files[]", admin_files));
    formData1.append("rb_status", rb_status);

    console.log({ formData1 });
    //   var camp_id = $('id')
    // if (confirm("Are you sure you want to update the data?")) {
    $.ajax({

      url: "http://localhost:3000/alltask/admin_comment",
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

          // $('#exampleModal').hide();
          $("#sample_form")[0].reset();
        } else {
          console.log("data in else:" + data);
          $(".comment")
            .html('<div class="alert alert-success">' + data.message + "</div>")
            .fadeOut(4000);
        }
      },
    });
  }


  else {
    $('#message').html('<p class="alert alert-primary">Please upload only five files...</p>').fadeOut(6000);
  }

}



// start function for fileview




function fileviewFunction(name) { //=> funtion for uploading images into data base //
  $('#exampleModal').modal('hide');


  // var admin_files =name;

  // console.log("Check Admin file name:" +name);


  var idtype = $(name).data('id');
  console.log("idtype in fileview function:" + idtype);
  const myArray = idtype.split(",");

  var camp_id = myArray[0];

  var oldfname = myArray[1];
  var filenum = myArray[2];
  var tact = myArray[3];
  console.log("tact check:" + tact);

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
  console.log("URL:" + url);
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

      console.log("Within if");
      window.navigator.msSaveBlob(blob, admin_files);
    } else {

      console.log("Within else");
      var url = window.URL || window.webkitURL;

      console.log("url" + url);
      link = url.createObjectURL(blob);
      console.log("link" + link);
      var a = document.createElement("a");
      console.log("a" + a);
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

  console.log("filereplace function called");
  var id = $(e).parent().children('.imageInput').first().data("id");

  var idtype = $(e).data('id');
  console.log("idtype:" + idtype);
  const myArray = idtype.split(",");

  var camp_id = myArray[0];
  var oldfname = myArray[1];
  var filenum = myArray[2];
  var tact = myArray[3];




  var formData = new FormData();

  var admin_files = $('.imageInput')[id].files[0]; // Get the selected file

  console.log("admin_files:" + admin_files);



  formData.append('tact', tact); // Append the file to FormData
  formData.append('camp_id', camp_id); // Append the file to FormData
  formData.append('filenum', filenum); // Append the file to FormData
  formData.append('oldfname', oldfname); // Append the file to FormData
  formData.append('admin_files', admin_files); // Append the file to FormData

  // Make an Ajax POST request
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/alltask/admin_comment2', // Replace with your server-side script URL
    data: formData,
    processData: false, // Prevent jQuery from processing the data
    contentType: false, // Set content type to false, as we are using FormData
    success: function (response) {
      // Handle the server's response here

      $('#action_modal').modal('hide'); // for hide root modal
      //$('#task_form')[0].reset();

      //  $('.wrap_new').html('<p class="alert alert-success">Image Upload successfully..</p>').fadeOut(3000)

      // $("#container11").hide();
      //   $("#fileviewbox").hide();

      console.log(response);


      $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
      $('#leftnav').DataTable().ajax.reload();
      $('#apptask').DataTable().ajax.reload();
      $('#task_priorities').DataTable().ajax.reload();
      $('#todaysstask').DataTable().ajax.reload();
      $('#weeklytasks').DataTable().ajax.reload();
      //  $('#task_form')[0].reset();
      setTimeout(function () {
        $('#message').html('');
      }, 5000);


    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error(xhr.responseText);
    }
  });
}


//end function for file update




function handleImageUpload(i) {
  console.log("Handle function" + i);


  $("#container11 .btn-primary").attr("disabled", true)
  $("#btn" + i).attr("disabled", false)

  //     var imageInput = document.getElementById("image_id").value;
  //     console.log("imageInput" +imageInput);
  //     var imageleng =  document.getElementById('image_id').files.length;
  //     console.log("image length:" +imageleng);
  //     for(var num=0;num<5;num++)
  //     {
  //     if(document.getElementById("image_id").value != "") {



  //   if(num==i)
  //   {
  //     console.log("num is i");
  //     console.log("num:" +num);
  //     console.log("i is:" +i);
  //     document.getElementById("btn"+i).disabled = false;
  //   }
  //   else{
  //     console.log("num is not i");
  //     console.log("num:" +num);
  //     console.log("i is:" +i);

  //   }




  //  }

  //  else{
  //     alert("Please upload least one image");
  //     document.getElementById("btn"+num).disabled = true;

  //  }

  // }
}


