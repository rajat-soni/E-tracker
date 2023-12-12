
$(document).ready(function () { // for fetch Data //

   //     load_data();

   // function load_data() {

   //  var user_id = $("#user_id").val();
   //  alert("")

   var dataTable = $('#tdata').DataTable({

      'processing': true,
      'serverSide': true,
      'serverMethod': 'get',
      'ajax': {
         'url': 'http://localhost:3000/customEmp/get_data'
      },
      'aaSorting': [],
      'columns': [
         { data: 'camp_name' },
         { data: 'asset_name' },
         { data: 'blast_type' },
      //   { data: 'emailBlastComment' },
         //   { data : 'user_id' },
         { data: 'id' },
      //  { data : 'status' }
        




      ],

      columnDefs: [
         {
            targets: 3,
            orderable: false,
            render: function (data, type, row, meta) {
              
               // var status = row.status;
               console.log("user_id"+ row.user_id);
               console.log("Status"+ row.status);
              
               console.log("RB Status"+ row.rbstatus);
               console.log("Current date"+ row.todaydt);
               console.log("EB Current date time"+ row.eblast_datetime);

               dt1 = new Date(row.todaydt);
               dt2 = new Date(row.eblast_datetime);
               dt3 = new Date(row.reblast_datetime);
               allocated_to = row.allocated_to;
               rballocated_to = row.rballocated_to;
               user_id = row.user_id;
               console.log("user_id"+ user_id);
               console.log("allocated to"+ allocated_to);
               console.log("RB allocated To"+ rballocated_to);

               console.log("Today Date Time:" +dt1);
               console.log("EB Date Time:" +dt2);
               console.log("RB Date Time:" +dt3);
               console.log("tact check:" +row.tact);

               if(row.tact=="Email Blast / Reminder Blast")
               {
                 var tact="Email-Reminder-Blast";
               
                 console.log("set tact is Email-Reminder-Blast");
               }
               
               if (row.tact=="Email Blast")
               {
                 console.log("set tact is Email Blast");
                 var tact="Email-Blast";
               }
               
               
               
               if (row.tact=="Webinar")
               {
                 console.log("set tact is Webinar Blast");
                 var tact="Webinar";
               }

            
               if(row.camp_id === null || (row.tact=="Email Blast / Reminder Blast" && row.admin_rb_file==""))
               {
                  return `
                  

                  ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
   
   
                  ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
                  
                  
   
   
                    <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ row.id + ' ' + row.user_id + ' ' + row.blast_type + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>
   
                    <button type="button" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id ="`+row.id+ ' ' +row.user_id+ ' ' +row.blast_type+ ' ' +row.status+ ' ' +row.blast_date+ ' ' +row.blast_time+ ' ' +tact+` ">
                    <i class="fa fa-upload"></i>
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
                        
                         <input type="text" name="camp_id" id="camp_id"/ >
                         <input type = "text" id ="blast_type" id="blast_type"/  >
                 <input type = "text" id ="tact" name="tact"/  >
                 <input type = "text" id ="status"   >

                         <input type = "hidden" id ="rbstatus"  data-id = " `+row.rbstatus+`" >
                         <input type = "hidden" id ="status"  data-id = " `+row.status+`" >
                         <input type = "hidden" id ="user_id"  data-id = " `+row.id+`" >
                         <input type = "hidden" id ="tact" name="tact" data-id = " `+tact+`"/  >

                         
                         <textarea class="form-control"  id = "emailBlastComment" name = "emailBlastComment" placeholder="" id="floatingTextarea"></textarea>
                         <label for="floatingTextarea"></label>
                         <input type = "file" class="form-control" name = "image" id = "image" >
                       </div>
                         </div>
                         <div class="modal-footer">
                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           <button type="button" class="btn btn-primary" onclick="myFunction()">Send Comment</button>
                         </div>
                       </div>
                     </div>
                   </div>
                   </form>
                        
                        `;
     

            }



              
          else
            {
               return `
               

               ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 


               ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
               
               


                 <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ row.id + ' ' + row.user_id + ' ' + row.blast_type + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>



                 <button type="button"    class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date +' ' + row.blast_time +' ' + tact +`"><i class="fa fa-upload"></i></button>



                 <button type="button" style="display:none;" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id ="`+row.id+ ' ' +row.user_id+ ' ' +row.blast_type+ ' ' +row.status+ ' ' +row.blast_date+ ' ' +row.blast_time+ ' ' +tact+` ">
                 <i class="fa fa-upload"></i>
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
                     
                      <input type="text" name="camp_id" id="camp_id"/ >
                      <input type = "text" id ="blast_type" id="blast_type"/  >
              <input type = "text" id ="tact" name="tact"/  >
              <input type = "text" id ="status"   >

                      <input type = "hidden" id ="rbstatus"  data-id = " `+row.rbstatus+`" >
                      <input type = "hidden" id ="status"  data-id = " `+row.status+`" >
                      <input type = "hidden" id ="user_id"  data-id = " `+row.id+`" >
                      <input type = "hidden" id ="tact" name="tact" data-id = " `+tact+`"/  >

                      
                      <textarea class="form-control"  id = "emailBlastComment" name = "emailBlastComment" placeholder="" id="floatingTextarea"></textarea>
                      <label for="floatingTextarea"></label>
                      <input type = "file" class="form-control" name = "image" id = "image" >
                    </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="myFunction()">Send Comment</button>
                      </div>
                    </div>
                  </div>
                </div>
                </form>
                     
                     `;
  

         }


         
              
            }
         }


      ]


   });

  
   
   $('#add_data').click(function () { // for insert the Data //

      $('#dynamic_modal_title').text('Add Data');
      ``
      $('#sample_form')[0].reset();

      $('#action').val('Add');

      $('#action_button').text('Add');

      $('#action_modal').modal('show');

   });

   //  var isVal = true;
   $('#sample_form').on('submit', function (event) {


      event.preventDefault();


   });

   $(document).on('click', '.view', function () {
      //alert("Edit data");
      //var idtype = $(this).data('id');


      var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var user_id = myArray[2];
        var blast_type = myArray[3];


      console.log("View Data");
      console.log("ID" +id);
      console.log("User ID" +user_id);
      console.log("blast_type" +blast_type);
      $('.readAl').prop('readonly', true);
       

       if(blast_type == "E-blast"){
         $('#ebasset').show();
         $('#rbasset').hide();
         console.log("Only E-Blast")
       }
       else if(blast_type == "E-Blast/Reminder")
       {
         $('#ebasset').show();
         $('#rbasset').show();
         console.log("E-Blast/Reminder");
       }
       else if(blast_type=="Reminder")
      {
         $('#ebasset').hide();
         $('#rbasset').show();
         console.log("Only Reminder");
       }
    

    
      console.log("Click rb checkbox" +id);
  
      $('#dynamic_modal_title').text('View Data');

      $('#action').val('view');

      $('#action_button').text('').hide();

      $('#action_modal').modal('show');


      $.ajax({
         url: "http://localhost:3000/customEmp/action",
         method: "POST",
         data: { id: id, action: 'fetch_single' },

         dataType: "JSON",
         success: function (data) {

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
            $('#tact').val(data.tact);
            $('#blast_type').val(data.blast_type);
            $('#blast_type').val(data.blast_type);
            $('#rb_assetnameview').val(data.rb_assetname);
            $('#rb_asset_linkview').val(data.rb_assetlink);
            $('#rb_dateview').val(data.rb_date);
            $('#rb_timeview').val(data.rb_time);
            
            $('#status').val(data.status);
            $('#id').val(data.id);


            // setTimeout(function () {
            //    $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
            //    $('#message').html('');
            // }, 5000);

         }
      });



   });




     
   
   $(document).on('click', '.check', function (e) {

      var user_id = $(this).data('id');
      console.log("User ID" +user_id);
    
      var checkBox = document.getElementsByClassName("check");

      if (confirm("Are you sure you want to update the data?")) {
         $.ajax({
            url: "http://localhost:3000/customEmp/action",
            method: "POST",
            data: {
               action: 'check',
               p_id: user_id
            },
            dataType: "JSON",
            success: function (data) {
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
               setTimeout(function () {
                  $('.message').html('');
               }, 1000);

            }
         });
      }


      else{
        
         e.target.className == 'check';
         $(".check").prop('checked',false);


         //alert(e.target.className);
        
      }

   });


});

$(document).on('click', '.remider_blstcheckbox', function (e) {
  
  
   var id = $(this).data('id');
   console.log("Click rb checkbox" +id);


  
    
      

      if (confirm("Are you sure you want to update the data?")) {
         $.ajax({
            url: "http://localhost:3000/customEmp/action",
            method: "POST",
            data: {
               action: 'remider_blstcheckbox',
               id: id
            },
            dataType: "JSON",
            success: function (data) {
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
               setTimeout(function () {
                  $('#message').html('');
               }, 1000);

            }
         });
      }


      else{
        
         e.target.className == 'remider_blstcheckbox';
         $(".remider_blstcheckbox").prop('checked',false);


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
   //            url: "http://localhost:3000/customEmp/comment",
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

   $(document).on("click", ".open-homeEvents", function () {

      var idtype = $(this).data('id');
      console.log("idtype:" +idtype);
        const myArray = idtype.split(" ");
    
        var camp_id = myArray[0];
        var user_id = myArray[1];
        var blast_type = myArray[2];
        
        var tact = myArray[6];
    
    console.log("ID:" +camp_id);
  
    console.log("tact is:" +tact);
    console.log("blast_type is:" +blast_type);
      //var eventId = $(this).data('id');
      //$('#eventId').html( id );
      $('#camp_id').val(camp_id);
    
      $('#blast_type').val(blast_type);
     
      $('#tact').val(tact);
        $('#status').val(ebstatus);
      console.log("Check after examplemodal clicked:" +idtype);
    
    });

   function myFunction() { //=> funtion for uploading images into data base //
      $('#exampleModal').modal('hide');
      console.log("my function called");
      var formData1 = new FormData(document.getElementById("sample_form"));

      console.log(formData1);
                                    
      var sendComment = $('#emailBlastComment').val();
         var camp_id = $("#camp_id").val();
         var tact = $("#tact").val();
         var blast_type = $("#blast_type").val();
         console.log("camp_id" +camp_id);
        
         console.log("blast_type" +blast_type);
         var status = $("#status").attr("data-id");
         var rb_status = $("#rbstatus").attr("data-id");

        

         var tact = tact.toString().split(",");
       var tact=tact[0];
       

                                    formData1.append('sendComment', sendComment);
                                   // formData1.append('camp_id', camp_id);
                                
                                    formData1.append('blast_type', blast_type);
                                  
     
      console.log({formData1});

      console.log("tact is " +tact);


      //   var camp_id = $('id')
      // if (confirm("Are you sure you want to update the data?")) {
          $.ajax({
              url: "http://localhost:3000/customEmp/comment",
              method: "POST",
              data: formData1,
             
            //   dataType: "JSON",
            contentType: false,
            processData: false,
            
              success: function(data) {
              
                  if (data) {
                      $('.comment').html('<div class="alert alert-success">' + data.message + '</div>').fadeOut(4000);
                      // $('#exampleModal').hide();
                      $('#sample_form')[0].reset();
                  } else {
                     $('.comment').html('<div class="alert alert-success">' + data.message + '</div>').fadeOut(4000);
                  }
  
              }

              
  
          })
      }
   // }