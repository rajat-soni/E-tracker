
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
              
               
                console.log("tact upper"+ row.tact);
               console.log("muca"+ row.camp_id);
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

               if(row.tact=="Email Blast / Reminder Blast")
{
  var tact="Email-Reminder-Blast";
}

if (row.tact=="Email Blast")
{
  console.log("Email Blast");
  var tact="Email-Blast";
}



if (row.tact=="Webinar")
{
  console.log("Webinar Blast");
  var tact="Webinar";
}


          
          if(row.camp_id === null || (row.tact=="Email Blast / Reminder Blast" && row.user_rb_file==""))
          {



               return `${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 

               ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 

                 <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+row.id+ ' ' +row.user_id+ ' ' +row.blast_type+ ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>
                 <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                 Comment
                </button>
                <i class="fa fa-upload"></i></button>
                
                
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
                      <input type = "text" class ="tact" name = "tact" value = "`+tact+`">
                      <input type = "text" class ="user_id" id = "camp_id" name ="camp_id" value = "`+row.id+`">
                      <input type = "hidden" id ="rbstatus"  data-id = " `+row.rbstatus+`" >
                      <input type = "hidden" id ="rbstatus"  data-id = " `+row.rbstatus+`" >
                      <input type = "hidden" id ="status"  data-id = " `+row.status+`" >
                
                      <textarea class="form-control"  id = "emailBlastComment" name = "emailBlastComment" placeholder="" id="floatingTextarea"></textarea>
                      <label for="floatingTextarea"></label>
                      <input type = "file" class="form-control" name = "image[]" id = "image" multiple >
                    </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary sendimgbtn" onclick="myFunction()">Send Comment</button>
                      </div>
                    </div>
                  </div>
                </div>`;
          }else{
            return`

            ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 


               ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
               
               
               <button type="button"    class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' +tact+`">
               
               
               
               <i class="fa fa-upload"></i></button>


                 <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ row.id + ' ' + row.user_id + ' ' + row.blast_type + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>

                 <button type="button" class=" btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id ="`+row.id+ ' ' +row.user_id+ ' ' +row.blast_type+ ' ' +row.tact+` ">
                 <i class="fa fa-upload"></i></button>
        
                </button></i>
                
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
                      <input type = "text" class ="tact" name = "tact" value = "`+tact+`">
                      <input type = "hidden" class ="user_id" name = "camp_id" id = "camp_id" value = "`+row.id+`">
                      <input type = "hidden" id ="rbstatus"  data-id = " `+row.rbstatus+`" >
                      <input type = "hidden" id ="rbstatus"  data-id = " `+row.rbstatus+`" >
                      <input type = "hidden" id ="status"  data-id = " `+row.status+`" >
                
                      <textarea class="form-control"  id = "emailBlastComment" name = "emailBlastComment" placeholder="" id="floatingTextarea"></textarea>
                      <label for="floatingTextarea"></label>
                      <input type = "file" class="form-control" name = "image[]" id = "image" multiple >
                    </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="myFunction(this)">Send Comment</button>


                      </div>
                    </div>
                  </div>
                </div>`;
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
            $('#comment').val(data.comment);
            $('#eb_comment').val(data.eb_comment);
            $('#blast_type').val(data.blast_type);
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

            var admin_image=data.admin_files;
            console.log("admin_image"+admin_image)
            var admin_image = admin_image.split(',');
            var admin_length = admin_image.length;
            console.log( "admin_image" +admin_length)
            var user_image=data.user_ebfiles;
            console.log(user_image,"user_image")
            var user_image = user_image.split(',');
            var length = user_image.length;
            console.log("length of admin file:" +length);
    
            var htmlContent = '';

            

            if(data.tact  ==  'Email Blast'){
               for (var i = 0; i < length; i++)
                  { 
                     htmlContent += '<p> <tr><td><img src="../../file_img.png" style="width:20%"><button type="button" class="btn btn-secondary"  name="image" id="image" onclick="fileviewFunction(\'' + user_image[i] + '\')" > Download File for view</button><br>'+now+' </td></tr>' ,'</p>' ;
                  }
                    var emailUser = document.getElementById('viewfiles11').innerHTML = htmlContent;
                   $('#viewfiles11').show();
                   $('#viewfiles11').show();
    
                     var adminHtml = '';
               for(var i = 0; i<admin_length; i++ ){
                  adminHtml += '<p> <tr><td><img src="../../file_img.png" style="width:20%"><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(\'' + admin_image[i] + '\')" >Download File for view</button></td></tr>' ,'</p>' ;
               }
               var data =   document.getElementById('viewfiles12').innerHTML = adminHtml;
               $('#viewfiles12').show();
            }else if(data.tact == '') {


                  for (var i = 0; i < length; i++)
                  { 
                     htmlContent += '<p> <tr><td><img src="../../file_img.png" style="width:20%"><button type="button" class="btn btn-secondary"  name="image" id="image" onclick="fileviewFunction(\'' + user_image[i] + '\')" > Download File for view</button><br>'+now+' </td></tr>' ,'</p>' ;
                  }
                     document.getElementById('viewReminderBlastView11').innerHTML = htmlContent;
   
                     var adminHtml = '';
               for(var i = 0; i<admin_length; i++ ){
                  adminHtml += '<p> <tr><td><img src="../../file_img.png" style="width:20%"><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(\'' + admin_image[i] + '\')" >Download File for view</button></td></tr>' ,'</p>' ;
               }
               var data =   document.getElementById('viewReminderBlastView12').innerHTML = adminHtml;

            }else if(data.tact == '') {


                  for (var i = 0; i < length; i++)
                  { 
                     htmlContent += '<p> <tr><td><img src="../../file_img.png" style="width:20%"><button type="button" class="btn btn-secondary"  name="image" id="image" onclick="fileviewFunction(\'' + user_image[i] + '\')" > Download File for view</button><br>'+now+' </td></tr>' ,'</p>' ;
                  }
                     document.getElementById('wbinarVeiw11').innerHTML = htmlContent;
   
                     var adminHtml = '';
               for(var i = 0; i<admin_length; i++ ){
                  adminHtml += '<p> <tr><td><img src="../../file_img.png" style="width:20%"><button type="button" class="btn btn-secondary"  name="admin_files" id="admin_files" onclick="fileviewFunction(\'' + user_image[i] + '\')" >Download File for view</button></td></tr>' ,'</p>' ;
               }
               var data =   document.getElementById('wbinarVeiw12').innerHTML = adminHtml;

            }else{
               alert("Please Check anyone option");
            }
         }
      });



   });



   $(document).on('click', '.editimage', function () {



       

      // var id = $(this).data('id');
      var idtype = $(this).data('id');
      
    
      const myArray = idtype.split(" ");
  
      var id = myArray[0];
   
      // var ebstatus = myArray[1];
      // var eballocatedto = myArray[2];
      // var blast_date = myArray[3];
      // var rb_type = myArray[4];
      // var rb_date = myArray[5];
      // var blast_time = myArray[6];
      var tact = myArray[1];
//  alert("hello"+tact)
      // var blast_type = myArray[2];
   //   var camp_id = myArray[3];
   //   alert("camp_id",camp_id)
   
     
      
   
   
   alert("tact:" +tact);
   alert("id:" +id);
   
   
      $('#dynamic_modal_title').text('View Files');
   
      $('#action').val('editimage');
   
      $('#action_button').text('Upadte Image');
      // $("#action_button").css("display","none");
      $('#action_modal').modal('show');
   
   //  alert("hello")
   
      var action = $("#action").val();
  
      // alert("editimage action hii");
      //console.log(action);
      if (action === "editimage") {

         $("#eBc").hide();
         $("#cf").hide();

             $("#campname").hide();
         $("#cf").hide();

         $("#sendmail").hide();
         $("#sendname").hide();


         $("#sendname").hide();

         $("#cname1").hide();

         $("#fileviewdownload").hide();
        
        
        $("#cnameview").hide();
        $("#viewdata11").hide();
        $("#editdataa").hide();
        $("#webinarblast").hide();
        $("#tactics").hide();
        $("#fileviewbox").show();
   
      }
   
    
   
      $.ajax({
         url: "http://localhost:3000/customEmp/action",
         method: "POST",
         data: { id: id, action: 'fetch_files' },

         dataType: "JSON",
         success: function (data) {
   
 var camp_id = data.camp_id;
            alert("camp_id" +camp_id);
            alert("tact" +tact);
      //   alert(data.user_ebfiles)
      // alert("i am  Rajat "+tact)
       
      
   
   
   if(tact === "Email-Blast")
   {
   
     alert("i am in email baslt");
     alert("tact is:" +tact);
   // var admin_files=data.admin_files;
   var user_imagename=data.user_ebfiles;
   
    //var admin_filesname=data.admin_files;
  
    var user_imagename = user_imagename.split(',');
   //   alert("Rajat image"+user_imagename)
    var length = user_imagename.length;
  
  
   
   // else if(tact==="Email-Reminder-Blast")
   // {
    
   
   //  var user_rb_files=data.user_rb_file;
   
   //  var user_rb_files = user_rb_files.split(',');
   
   //  var length = user_rb_files.length;
   
   
   // }
   // else if(tact==="Webinar")
   // {
   //  console.log("Tact is Webinar");
   
    
   //  var user_imagename=data.user_ebfiles;
   
   //  var user_imagename = user_imagename.split(',');
   
   //  var length = user_imagename.length;
  
   
   // }
   
   
   var htmlContent = '';
   var htmlContent1 ='';
   var htmlContent2 =htmlContent+ '' +htmlContent1;
   // alert(htmlContent2)
   //var htmlData =admin_filesname;
   for (var i = 0; i <= 2; i++){ 
   //   alert(user_imagename[i])
    if(user_imagename[i] == undefined) { 
      
      //  alert(user_imagename[i]);
      console.log("tact is new:" +tact);
      console.log("Within if condition...");
    
      (user_imagename[i]);
      htmlContent += ' <form enctype="multipart/form-data" id = "form_id"><p> <tr><td></td><td></td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"> </form>' ;
    console.log("hello de"+htmlContent)

    
   
    }else  if(user_imagename[i] != '')
    {
      alert("user_imagename[i]" +user_imagename[i]);
      console.log("tact is:" +tact);
      console.log("Within else condition...");
      console.log(user_imagename[i]);
      htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:10%"></td><td>'+user_imagename[i]+'<button type="button" class="btn btn-secondary"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\''+ camp_id +','+user_imagename[i]+',' + i +  ','  + tact +'\'>Download File for view</button></td><td><input type="text" value='+user_imagename[i]+' name="filenum" style="display:none;"><input type="file" name="image" class = "imageInput custom-file-input" data-id = '+i+'  ></td><td> <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)" data-id=\'' + camp_id + ','+user_imagename[i]+',' + i + ',' +tact+'\'></tr></td>' ,'</p>' ;
   
    }
    
   
   }
   
   
   
   
   
   document.getElementById('fileviewbox').innerHTML = htmlContent;
   
}else{
   alert("not recived")
}
         
         
          $('#image').val(data.user_ebfiles);
         $('#id').val(data.id);
   
      
          setTimeout(function () {
            $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
            $('#message').html('');
          }, 5000);
   
        },
   
        error: function (data) {
   
          alert("Within error function");
          
         
        //  var camp_id=data.camp_id;
     
   //        console.log("camp id checks:" +id);
   //        var user_file=data.user_ebfiles;
     
   //        var user_file=data.user_ebfiles;
     
   //        var user_file = user_file.split(',');
     
   //        var length = user_file.length;
   //   console.log("check length:"+length);
     
   //   console.log("admin_filesname:")
     
     
     
     
   //   var htmlContent = '';
   //   var htmlContent1 ='';
   //   var htmlContent2 =htmlContent+ '' +htmlContent1;
   //   //var htmlData =admin_filesname;
   //   for (var i = 0; i < 5; i++)
   //    { 
   //     if(admin_filesname[i] === undefined)
     
   //     {
   //       console.log("Within if condition...");
   
   //       console.log("tact is:" +tact);
   //       console.log(admin_filesname[i]);
   //       htmlContent += '<p> <tr><td></td><td>Upload File...</td><td><input type="text" value='+user_file[i]+ ' name="filenum" style="display:none;"><input type="file" name="image" class = "imageInput custom-file-input" data-id = '+i+'  > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)" data-id=\''+ camp_id + ',' + user_file[i] + ',' + i + ',' +tact+ '\'></tr></td>' ,'</p>' ;
     
     
   //     }
     
   //     else  if(user_file[i] != '')
   //     {
   //      console.log("tact is:" +tact);
   //       console.log("Within else condition...");
   //       console.log(user_file[i]);
   //       htmlContent += '<p> <tr><td width="5%"><img src="../../file_img.png" style="width:100%"></td><td><p>'+user_file[i]+'</p><button type="button" class="btn btn-secondary"  name="user_file" id="user_file" onclick="fileviewFunction(this)" data-id=\''+ camp_id + ',' + user_file[i] + ',' + i +  ','  + tact +'\'>Download File for view</button></td><td><input type="text" value='+user_file[i]+ ' name="filenum" style="display:none;"><input type="file" name="user_file" class = "imageInput custom-file-input" data-id = '+i+'  > <input type="submit" class="btn btn-primary" onclick = "fileReplace1(this)" data-id=\''+ camp_id + ',' + user_file + ',' + i + ',' +tact+'\'></tr></td>' ,'</p>' ;
     
   //     }
       
     
     
     
   //   }
     
     
   //   htmlContent2 +=htmlContent+ '' +htmlContent1 ;
   //   console.log(htmlContent2);
     
     
   //   document.getElementById('container11').innerHTML = htmlContent2;
     
     
            
            
   //           $('#image').val(data.user_ebfiles);
   //          $('#id').val(data.id);
     
            
     
   //           setTimeout(function () {
   //             $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
   //             $('#message').html('');
   //           }, 5000);
     
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
   

   function myFunction(e) { //=> funtion for uploading images into data base //

     
    
      $('#exampleModal').modal('hide');
    var imageleng =  document.getElementById('image').files.length;
    console.log("hello image"+imageleng)
    if(imageleng < 3  ){
  
      var formData1 = new FormData(document.getElementById("sample_form"));
      //   var image =  document.getElementById('image');
      // var camp_id = $('.user_id').val();
        var tact = $('.tact').val();                     
      var sendComment = $('#emailBlastComment').val();
         var camp_id = $("#camp_id").attr("data-id");
 
         var status = $("#status").attr("data-id");

                                    formData1.append('sendComment', sendComment);
                                    formData1.append('status', status);
                                    formData1.append('tact', tact);
                                    formData1.getAll("image[]", image);
     
      console.log({formData1});
      //   var camp_id = $('id')
      // if (confirm("Are you sure you want to update the data?")) {
          $.ajax({
              url: "http://localhost:3000/customEmp/comment",
              method: "POST",
              data: formData1,camp_id:camp_id,
            //   dataType: "JSON",
            contentType: false,
            processData: false,
              success: function(data) {
                  if (data) {
                      $('.comment').html('<p class="alert alert-success">' + data.message + '</p>').fadeOut(4000);
                      // $('#exampleModal').hide();
                      $('#sample_form')[0].reset();
                      $('#sample_form').DataTable().ajax.reload();
                    

                  } else {
                     $('.comment').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);
                     
                  }
              }
          })
         }else{
            $('.comment').html('<p class="alert alert-primary">Please upload only two Images..</p>').fadeOut(4000);
         }

         
      }
   // }


   
      function fileviewFunction(name) { //=> funtion for uploading images into data base //
         $('#exampleModal').modal('hide');
        
     
         // var admin_files =name;
     
         // console.log("Check Admin file name:" +name);
      // alert("hello")
     
         var idtype = $(name).data('id');
         console.log("idtype in fileview function:" +idtype);
         const myArray = idtype.split(",");
     
         var camp_id = myArray[0];
         var oldfname = myArray[1];
         var tact = myArray[3];
         alert (myArray[1])
     
         var image =name;
     if(tact==="Email-Blast")
     {
       var tactfolder="Email-Blast";
     }
     
     else if(tact === "Email-Reminder-Blast")
     {
       var tactfolder="Email-Reminder-Blast";
     }
     
     else if(tact==="webinar")
     {
       var tactfolder="Webinar";
     }
       //Set the File URL.


       var url = "./files/"+camp_id+"/user/"+tactfolder+"/"+oldfname;
       console.log("URL:" +url);
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
                   window.navigator.msSaveBlob(blob, oldfname);
               } else {
      
                console.log("Within else");
                   var url = window.URL || window.webkitURL;
      
                   console.log("url" +url);
                   link = url.createObjectURL(blob);
                   console.log("link" +link);
                   var a = document.createElement("a");
                   console.log("a" +a);
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
   
    function fileReplace1 (e){
      // e.preventDefault()
      var id = $(e).parent().children('.custom-file-input').first().data("id");
     console.log("data_id"+id);
      var idtype = $(e).data('id');
      console.log("idtype:" +idtype);
      const myArray = idtype.split(",");

      var camp_id = myArray[0];
      var oldfname = myArray[1];
      var filenum = myArray[2];
      var tact = myArray[3];

      // alert("tact in filereplace function" +tact);
      var user_files  =  $('.imageInput')[0].files[0]
      // console.log("iamge",user_files)

      var formData = new FormData();
      var user_files  =  $('.imageInput')[0].files[0]
      // var user_files = $('.imageInput')[id].files[0]; // Get the selected file
      alert(user_files)
     
      console.log("user_files:" +image);

      formData.append('tact', tact); // Append the file to FormData
      formData.append('camp_id', camp_id); // Append the file to FormData
      formData.append('filenum', filenum); // Append the file to FormData
      formData.append('oldfname', oldfname); // Append the file to FormData
      formData.append('user_files', user_files); // Append the file to FormData

      // Make an Ajax POST request
      $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/customEmp/image_replace', // Replace with your server-side script URL
          data: formData,
          processData: false, // Prevent jQuery from processing the data
          contentType: false, // Set content type to false, as we are using FormData
          success: function(response) {
              // Handle the server's response here
              
              $('#action_modal').modal('hide'); // for hide root modal
              $('#form_id')[0].reset();
             
            //  $('.wrap_new').html('<p class="alert alert-success">Image Upload successfully..</p>').fadeOut(3000)
              // $("#container11").hide();
              //   $("#fileviewbox").hide();

              console.log(response);


              $('#message').html('<div class="alert alert-success">'  + response.message +  '</div>');
              $('#leftnav').DataTable().ajax.reload();
              $('#apptask').DataTable().ajax.reload();
              $('#task_priorities').DataTable().ajax.reload();
              $('#todaysstask').DataTable().ajax.reload();
              $('#weeklytasks').DataTable().ajax.reload();
              setTimeout(function () {
                $('#message').html('');
              }, 5000);


          },
          error: function(xhr, status, error) {
              // Handle errors here
              console.error(xhr.responseText);
          }
      });
  }

    