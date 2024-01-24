
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
         { data: 'tact' },
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
              
               
               console.log("mytact"+ row.tact);
               console.log("muca"+ row.id);
   
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
               console.log("RB Date  Time:" +dt3);
               console.log("check  my tact:" +row.tact);

      
var tact=row.tact;


console.log("tact value is:" +tact);

               if(row.tact === "Email Blast")
{

  console.log("Email Blast nrew"+row.tact);
  var tact="Email-Blast";

}
else{
   console.log("Eblast else condition")
}




               if(row.tact === "Email Blast / Reminder Blast")
{
  var tact="Email-Reminder-Blast";
}




               if(row.tact === "Email Blast / Reminder Blast")
            
{
   
   tact="Email-Reminder-Blast";
}





if(row.tact === "Webinar")
{
   
  console.log("Webinar Blast");
   tact="Webinar";
}


           
          
if(row.id === null || (row.tact=="Email Blast / Reminder Blast" && row.user_rb_file==""))
{
                  return `
                     
   console.log("within if);
                  ${(row.allocated_to == row.user_id && row.status == 0) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 1 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
   
   
                  ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 

                 <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ row.id + ' ' + row.user_id + ' ' + tact + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>
                 
                 <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                 Comment
                </button>
              
 
                `;
          }else{
           
            return`
 
         console.log("helllo me")
         ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 


         ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
               
               <button type="button"  id = "editimage"   class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' +tact+`">
               
               
               <i class="fa fa-file-excel-o" style = "font-size:20px;"></i>





                 <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ row.id + ' ' + row.user_id + ' ' + tact + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>



                
                 <button type="button" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#${tact}" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date +' ' + row.blast_time +' ' + tact +`">
                
            <i class="fa fa-upload"></i></button>
           </button>
                
               
                <!-- Modal -->
            
                <form id = "sample_form"  enctype="multipart/form-data">
               
 
             
           <div class="modal fade" id="${tact}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Insert File</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div class="form-floating">
                      
                      <input type = "hidden" class ="tact" id = "tact" name = "tact"  >
                      <input type = "hidden" name = "camp_id" id = "camp_id"   >
                      <input type = "hidden" id ="rbstatus">
                      <input type = "hidden" id ="rbstatus">
                      <input type = "hidden" id ="status" name = "status">
                      <input type = "hidden" id ="blast-type">
                      <input type = "hidden" id ="comment_id" name = "comment_id" data-id = " ` + row.comment_id + `" >
                      <input type = "hidden" id ="status"  data-id = " ` +  row.status + `" >
                      <textarea class="form-control"  id = "emailBlastComment" name = "emailBlastComment" placeholder = "Write text here..." ></textarea>
                      <label for="floatingTextarea"></label>
                      <input type = "file" class="form-control" name = "image[]" data-id="${row.id}" id = "image" multiple >
                    </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button 
                        type="button" 
                        class="imageform btn btn-primary" onclick="fileUpload(this)" 
                        data-id="${row.id}" 
                        data-tact="${tact}"
                        
                        >Send Comment</button>


                      </div>
                    </div>
                  </div>
                </div>
                </form>`;
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

     
      $("#hide_modal").show();
      var idtype = $(this).data('id');

        const myArray = idtype.split(" ");
        var id = myArray[1];
        var user_id = myArray[2];
        var tact = myArray[3];

      
      console.log("View Data"); 
      console.log("ID" +id);
      console.log("User ID" +user_id);
    
      $('.readAl').prop('readonly', true);
       

       if(tact == "Email-Blast"){
        
         $("#webinarFlex").hide()
         $("#ebBlastview").show()
         $('#webinar_files').hide();
         $('#ebasset').show();
         $('#rbasset').hide();
         $('#comment').show();
         console.log("Only E-Blast")
       }
       else if(tact == "Email-Reminder-Blast")
       {
         $('#ebasset').show();
         $('#rbasset').show();
         console.log("E-Blast/Reminder");
       }
       else if(tact=="Webinar")
      {
         $("#webinarFlex").show()
         $("#ebBlastview").hide();   
         $('#ebasset').hide();
         $('#rbasset').hide();
         $('#ebasset').show();
         $('#fileviewbox').hide();
     
   
        
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

          
            $('#eb_comment').val(data.user_ebcomment);
           
            $('#comment').val(data.tycomment);
            $('#comment').val(data.comment);
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
            alert(tactValue)
            var user_rbfiles =data.user_rbfiles;
    
            var user_rbfiles = user_rbfiles.split(',');
            var user_rbfiles_length = user_rbfiles.length;
            var admin_rb_image=data.admin_rb_file;
            var admin_rb_image = admin_rb_image.split(',');
            var admin_rb_length = admin_rb_image.length;
            var admin_image=data.admin_files;
            var admin_image = admin_image.split(',');
            var admin_length = admin_image.length;
            var htmlContent = ''; 


            if(tactValue == "webinar" ){
              
               $("#webinarFlex").show()
                  $("#ebBlastview").hide();      
                  var user_image1=data.webinar_files;
              
              
                  var user_image1 = user_image1.split(',');
                  var length = user_image1.length;



                     for (var i = 0; i < length; i++)
                     { 
                   
                        htmlContent += '<p> <tr><td><img src="../../file_img.png" style="width:15%"></td><td ><p>'+user_image1[i]+'</p><button type="button" class="btn btn-primary"  name="images" id="images" onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + user_image1[i] + ',' + i +  ','  + tact+'\'>Download EB File</button><br>'+now+' </td></tr>' ,'</p>' ;
                     }
                   document.getElementById('wbinarVeiw11').innerHTML = htmlContent;
                  
                        $('#wbinarVeiw11').show();

                        $('#ebBlastview').hide();
                        $('#rbFlex').hide();
                        $('#ebComment').hide()
                        $('#ebBlastview').hide()
                    
                        var admin_image=data.admin_files;
                        var admin_image = admin_image.split(',');
                        var admin_length = admin_image.length;
                        var adminHtml = '';
                        for(var i = 0; i<admin_length; i++ ){
                           adminHtml += '<p> <tr><td><img src="../../file_img.png" style="width:15%"></td><td ><p>'+admin_image[i]+'</p><button type="button" class="btn btn-primary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + admin_image[i] + ',' + i +  ','  + tact+'\'>Download EB File</button></td></tr>' ,'</p>' ;
                        }
                        document.getElementById('wbinarVeiw12').innerHTML = adminHtml;
         
                        $('#wbinarVeiw12').show();
                        $('#ebBlastview').hide();
                        $('#rbFlex').hide();
                        $('#ebComment').hide();
                        $('#ebBlastview').hide()
                     

            }else if(tactValue  ==  'e_blast'){

               $("#webinarFlex").hide()
               $("#ebBlastview").show()
    
               var user_image=data.user_ebfiles;
          
               var user_image = user_image.split(',');
               var length = user_image.length;
              
               var htmlebContent = '';
 
                  for (var i = 0; i < length ; i++)
                  { 
                    
               
                     htmlebContent += '<p> <tr><td><img src="../../file_img.png" style="width:10%"><span>&nbsp; &nbsp;'+user_image[i]+'&nbsp;&nbsp;</span><button type="button" class=" btn btn-primary btn-sm bg-primary"  name="user_ebfiles" id="user_ebfiles" onclick="fileviewFunction(this)" data-id=\''+ data.cate_id +','+user_image[i]+',' + i +  ','  + tact +'\'> Download File</button><br>'+now+' </td></tr>' ,'</p>' ;
                    
                     
                  }
                   document.getElementById('viewfiles112').innerHTML = htmlebContent;
                     $("#viewfiles112").show();
                     $("#rbFlex").hide();
                     $("#webinarFlex").hide();

                     var admin_image=data.admin_files;
                     
                     var admin_image = admin_image.split(',');
                     var admin_length = admin_image.length;
                     var amdinebContent = '';
                  
                  for(var i = 0; i < admin_length; i++ ){

                     
                    
                   
                     amdinebContent += '<p> <tr><td><img src="../../file_img.png" style="width:10%"><span>&nbsp; &nbsp;'+ admin_image[i]+'&nbsp;&nbsp;</span><button type="button" class=" btn btn-primary btn-sm bg-primary"  name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\''+ data.cate_id +','+admin_image[i]+',' + i +  ','  + data.tact +'\'> Download File</button></td></tr>' ,'</p>' ;
                 
                  }
                  document.getElementById('viewfiles113').innerHTML = amdinebContent;
                  $("#viewfiles113").show();
                  $("#rbFlex").hide();
                  $("#webinarFlex").hide();
                
                 
                    
             

            }else if(tact == 'Email-Reminder-Blast'){
   
               var user_rbfiles =data.user_rbfiles;
               alert("user_rbfiles")
    
               var user_rbfiles = user_rbfiles.split(',');
               var user_rbfiles_length = user_rbfiles.length;
                  for (var i = 0; i < user_rbfiles_length; i++)
                  { 

                     
            
                     htmlContent += '<p> <tr><td><img src="../../file_img.png" style="width:15%"></td><td ><p>'+user_rbfiles[i]+'</p><button type="button" class="btn btn-primary"  name="user_rbfiles" id="user_file" onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + user_rbfiles[i] + ',' + i +  ','  + tact+'\'>Download EB File</button><br>'+now+' </td></tr>' ,'</p>';
                  }
                     document.getElementById('viewReminderBlastView11').innerHTML = htmlContent;
                     
                     
                     $('#viewfiles11').hide();
                     $('#viewReminderBlastView11').show()
                     $('#webinarflex').hide();
                     $('#fileviewdownload').hide();
                     $('#rbFlex').show();
                 
                     var adminRbHtml = '';
                  for(var i = 0; i < admin_rb_length; i++ ){
               
                     adminRbHtml += '<p> <tr><td><img src="../../file_img.png" style="width:15%"></td><td ><p>'+admin_rb_image[i]+'</p><button type="button" class="btn btn-primary"  name="user_rbfiles" id="user_file" onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + admin_rb_image[i] + ',' + i +  ','  + tact+'\'>Download File</button><br></td></tr>' ,'</p>' ;
                  }
                    document.getElementById('viewReminderBlastView12').innerHTML = adminRbHtml;
                    $('#viewReminderBlastView12').show();
                    $('#rbFlex').show();
                   
                    $('#webinarFlex').hide();
                    $('#fileviewdownload').hide();
                    $('#viewfiles11').hide();
           
            }else{
               alert("Please Check anyone option");
            }
         }
      });



   });



   $(document).on('click', '#editimage', function () {
       


      // var id = $(this).data('id');
      var idtype = $(this).data('id');

      const myArray = idtype.split(" ");
      var camp_id = myArray[0];
   
 
 
      var tactValue = myArray[1];
   
     console.log("tactValue is my"+tactValue)
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
               url: "http://localhost:3000/customEmp/action",
               method: "POST",
               data: { camp_id: camp_id, action: 'fetch_files' },

               dataType: "JSON",
            success: function (data) {
                  
              
      
             
               var  user_rb_files = data.user_rbfiles;



                if(tactValue=="Email-Blast")  
                {
                     var user_imagename=data.user_ebfiles;
                     var user_imagename = user_imagename.split(',');
                     var length = user_imagename.length;
                     cate_id = data.camp_id;
                  
                        var htmlContent = '';
                     var htmlContent1 ='';
                     var htmlContent2 =htmlContent+ '' +htmlContent1;
   
                  for (var i = 0; i <= 1; i++){ 
    
                        if(user_imagename[i] == undefined) { 

                           htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ cate_id + ',' + user_imagename[i] + ',' + i + ',' +tactValue+ '\' value = "Insert File"></tr></td>' ,'</p> </form>';
   
                        }else if(user_imagename[i] != '') {

                         
                           console.log(user_imagename[i]);
                           htmlContent += '<p> <tr><td width="20%"><img src="../../file_img.png" style="width:10%"><span>&nbsp; &nbsp;'+user_imagename[i]+'&nbsp;&nbsp;</span><button type="button" class=" btn btn-primary btn-sm bg-primary"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\''+ cate_id +','+user_imagename[i]+',' + i +  ','  + tactValue +'\'> Download File</button></td></tr> &nbsp;<tr><td><input type="text" value='+user_imagename[i]+' name="filenum" style="display:none;"><input type="file" name="user_ebfiles"  class = " btn-dark imageInput custom-file-input form-control" data-id = '+i+'  ></td><td> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-primary btn-md " onclick = "fileReplace1(this)"  data-id=\'' + cate_id + ','+user_imagename[i]+',' + i + ',' +tactValue+'\' value = "Insert File"> &nbsp; &nbsp;</span></tr></td>' ,'</p>';
                        }else{
                               alert("tact is not:" +tact);
                        }
                  }
            
       

   
                  document.getElementById('container11').innerHTML = htmlContent;
                  
                  $('#image').val(data.user_ebfiles);
                  
               
       
        

   }else if(tactValue==="Email-Reminder-Blast") { // reminder blast code //
    
 
      
      // alert("tactValue"+tactValue)
         var user_rb_files=data.user_rbfiles;
        
        var cate_id = data.camp_id;
   
         var user_rb_files = user_rb_files.split(',');
         var rblength = user_rb_files.length;
         var htmlContent = '';
         var htmlContent1 ='';
         var htmlContent2 =htmlContent+ '' +htmlContent1;

          for (var i = 0; i <= 1; i++)
          { 

           if(user_rb_files[i] != ''){
                  console.log("tact is:" +tact);
                  console.log("Within else condition...");
                  console.log(user_rb_files[i]);
                  htmlContent += '<p class="main"> <tr><td width="25%"><img src="../../file_img.png" style="width:10%"><span>&nbsp; &nbsp;'+user_rb_files[i]+'&nbsp;&nbsp;</span><button type="button" class=" btn btn-primary btn-sm bg-primary"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\''+ data.camp_id +','+user_rb_files[i]+',' + i +  ','  + tactValue +'\'> Download File</button></td> &nbsp;<td><input type="text" value='+user_rb_files[i]+' name="filenum" style="display:none;"><input type="file" name="user_rbfiles"  class = "  imageInput custom-file-input form-control" data-id = '+i+' id = "image_id"  onchange="handleImageUpload()" ></td><td> <input type="submit" class="btn btn-primary btn-md bg-primary" onclick = "fileReplace1(this)" data-id=\'' + data.camp_id + ','+user_rb_files[i]+',' + i + ',' +tactValue+'\' value = "Insert Image" id = "btn_id"></tr></td>' ,'</p>' ;
    
            }
         }
               htmlContent2 +=htmlContent+ '' +htmlContent1 ;
               console.log(htmlContent2);
           
               document.getElementById('container11').innerHTML = htmlContent;
            
               $("#container11").show();
               $('#image').val(data.user_rbfiles);
               $('#id').val(data.camp_id);
           
            $('#sample_form').trigger('reset');
         
      
      
   }else if(tactValue === "Webinar")
   {

      
     
      

    var user_imagename=data.webinar_files;
 
    alert(data.webinar_files)
   
    var user_imagename = user_imagename.split(',');
   
    var length = user_imagename.length; 
  

   }
   
   
   var htmlContent = '';
   var htmlContent1 ='';
   var htmlContent2 =htmlContent+ '' +htmlContent1;
   
   for (var i = 0; i <= 1; i++){ 
    
    
      if(user_imagename[i] == undefined) { 
         
   
      
      
         htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="file" name="webinar_files" class = " bg- form-control btn-dark imageInput custom-file-input" data-id = '+i+'  > <input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ data.camp_id + ',' +user_imagename[i]+ ',' + i + ',' +tactValue+ '\' value = "Insert" ></tr></td>' ,'</p> </form>';
         
      
      }else  if(user_imagename[i] != '')
      {

     
         console.log("tact is:" +tact);
         console.log("Within else condition...");
         console.log(user_imagename[i]);
         htmlContent += '<p> <tr ><td width="25%"><img src="../../file_img.png" style="width:10%"><span>&nbsp; &nbsp;'+user_imagename[i]+'&nbsp;&nbsp;</span><button type="button" class=" btn btn-primary btn-sm bg-primary"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\''+ data.camp_id +','+user_imagename[i]+',' + i +  ','  + tactValue +'\'> Download File</button></td> &nbsp;<td><input type="text" value='+user_imagename[i]+' name="filenum" style="display:none;"><input type="file" name="webinar_files"  class = " btn-dark imageInput custom-file-input form-control" data-id = '+i+'  ></td><td> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-primary btn-md " onclick = "fileReplace1(this)"  data-id=\'' + data.camp_id + ','+user_imagename[i]+',' + i + ',' +tactValue+'\' value = "Insert File"> &nbsp; &nbsp;</span></tr></td>' ,'</p>';
   
      }else{
         alert("please check the data webinardata!")
      }
    
            }
   
   document.getElementById('container11').innerHTML = htmlContent;
         
          $('#image').val(data.webinar_files);
         var camp_id =   $('#id').val(data.camp_id);
          setTimeout(function () {
            $('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
            $('#message').html('');
          }, 5000);
   
        },
   
        error: function (data) {
   
          alert("Within error function");
          
         
        }
      
     
      })
     
   })
   



     
   
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
   
   



   function fileUpload(e){
      const formData1=new FormData(document.getElementById("sample_form"));
      const camp_id=$(e).data("id");
   
      const tact=$(e).data("tact") 
    

      //alert(tact)
      
      
      
      const images_input=$(`input[name='image[]'][data-id='${camp_id}']`)

      const comment=$("#emailBlastComment").val();
     
    
      formData1.set("camp_id", camp_id);
      formData1.append('sendComment', comment);
    
       formData1.set('image[]', images_input[0].files[0]);
       formData1.append('image[]', images_input[0].files[1]);
    
     
      formData1.set("tact", tact);
      
    // console.log("image"+formData1.append('image[]', image))
      


    alert("hello"+comment+"tact"+tact+" camp_id"+camp_id+"")
      


      if (confirm("Are you sure you want to update the data?")) {
         $.ajax({
             url: "http://localhost:3000/customEmp/comment",
             method: "POST",
             data: formData1,
           // dataType: "JSON",
           contentType: false,
           processData: false,
             success: function(data) {
                 if (data) {
                     $('.comment').html('<p class="alert alert-success">' + data.message + '</p>').fadeOut(4000);
                     $('#sample_form').trigger('reset');
                     $('#sample_form')[0].reset();
                     $('#sample_form').DataTable().ajax.reload();
                   

                 } else {alert
                    $('.comment').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);
                    
                 }
             }
         })
        }else{
           $('.comment').html('<p class="alert alert-primary">Please upload only two Images..</p>').fadeOut(4000);
        }


   }
   function myFunction(e) { //=> funtion for uploading images into data base //          
       $("#exampleModal").modal("hide"); $("#fileviewbox").show(); 
       $("#fileviewdownload").hide()
       var itid =  $('.modal-footer').children().eq(1).data('id');
       const myArray = itid.split(",");var camp_id = myArray[0];
       alert(camp_id)

      




     
      var camp_id = myArray[1];
   alert("hello"+camp_id)

      
  
      var formData1 = new FormData(document.getElementById("sample_form"));
     
    
      var sendComment = $("#emailBlastComment").val();
    
      console.log("comment check which passed:"+comment);
    
      var tact = $("#tact").val();
     var camp_id = $("#camp_id").val();
    
     var comment_id = $("#comment_id");
      var comment_id = $("#comment_id").attr("data_id");
      var status = $("#status").attr("data-id");
    
      formData1.append("comment", comment);
     
      //console.log(formData1.append("comment", comment));
      formData1.append("camp_id ", camp_id);
      formData1.append("comment_id ", comment_id);
      formData1.getAll("image[]", image)
      console.log("check which files are selected");
      console.log(  formData1.getAll("image[]", image));
      formData1.append("status", status);
      console.log({ formData1 });
      formData1.append('sendComment', sendComment);
      formData1.append('status', status); 
      formData1.getAll("image[]", image);
      formData1.getAll("tact", tact);
     
 
      //   var camp_id = $('id')
      if (confirm("Are you sure you want to update the data?")) {
          $.ajax({
              url: "http://localhost:3000/customEmp/comment",
              method: "POST",
              data: formData1,camp_id:camp_id,tact:tact,
            //   dataType: "JSON",
            contentType: false,
            processData: false,
              success: function(data) {
                  if (data) {
                      $('.comment').html('<p class="alert alert-success">' + data.message + '</p>').fadeOut(4000);
                      $('#sample_form').trigger('reset');
                      $('#sample_form')[0].reset();
                      $('#sample_form').DataTable().ajax.reload();
                    

                  } else {alert
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
        
     
       
     // alert("hello")
         var idtype = $(name).data('id');
         alert(idtype)
         console.log("idtype in fileview function:" +idtype);
         const myArray = idtype.split(",");
     
         var camp_id = myArray[0];
         var oldfname = myArray[1];
         var tact = myArray[3];
         alert (myArray[1])
     
         var image =name;
     if(tact=="Email-Blast")
     {
       var tactfolder="Email-Blast";
     }
     
     else if(tact == "Email-Reminder-Blast")
     {
       var tactfolder="Email-Reminder-Blast";
     }
     
     else if(tact=="webinar")
     {
       var tactfolder="Webinar";
     }
       //Set the File URL.


       var url = "./files/"+camp_id+"/user/"+tactfolder+"/"+oldfname;
       console.log("URL_FILE:" +url);
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

   var id = $(e).parent().children('.imageInput').first().data("id");
    
   
      var idtype = $(e).data('id');
      console.log("idtype:" +idtype);
      const myArray = idtype.split(",");
      var camp_id = myArray[0];
      alert(camp_id)
      var oldfname = myArray[1];
      var loop_index=myArray[2]
       alert("myfile"+ oldfname)
      var filenum = myArray[2];
      var tact = myArray[3];
      // alert(myArray[3])
       if(filenum.length !== 0){
      // alert("tact in filereplace function" +tact);
   //   var rb_files =  document.getElementsByClassName('.custom-file-input')
      // var user_files  =  $('.imageInput')[0].files[0];
      // alert(user_files)
      // console.log("iamge",user_files)
      var formData = new FormData();
      var user_rbfiles  =  $(`.imageInput[data-id='${loop_index}']`)[0].files[0]
      console.log("rbmyfiles"+ user_rbfiles)
      // var user_files = $('.imageInput')[id].files[0]; // Get the selected file
      formData.append('tact', tact); // Append the file to FormData
      formData.append('camp_id', camp_id); // Append the file to FormData
      formData.append('filenum', filenum); // Append the file to FormData
      formData.append('oldfname', oldfname); // Append the file to FormData
      formData.append('user_rbfiles', user_rbfiles); // Append the file to FormData

      // Make an Ajax POST request
      $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/customEmp/image_replace', // Replace with your server-side script URL
          data: formData,
          processData: false, // Prevent jQuery from processing the data
          contentType: false, // Set content type to false, as we are using FormData
          success: function(response) {
              // Handle the server's response here
              
             
           
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
              $('#action_modal').modal('hide'); // for hide root modal
              $('#form_id')[0].reset();

          },
          error: function(xhr, status, error) {
              // Handle errors here
              console.error(xhr.responseText);
          }
      });
       }else{
         $('.comment').html('<p class="alert alert-primary">Please upload only two Images..</p>').fadeOut(4000);

       }
  }

    

  function handleImageUpload(i) {
  
   var imageInput = document.getElementById('image_id');
   var imageleng =  document.getElementById('image_id').files.length;
   for(i=0; i>=imageleng; i++){

      if(imageleng[i] == imageleng){

    alert(imageleng[i])
      
         //document.getElementById('btn_id').disabled = true;
      }else{
         // document.getElementById('btn_id').disabled = false;
      }
   }

  }

  function resetForm() {
   // Get the form element
   var form = document.getElementById("sample_id");
 alert("hello - am form")
   // Reset the form
   form.reset();
}

function removeFile(e){
   var idtype = $(e).data('id');
      console.log("idtype:" +idtype);
      const myArray = idtype.split(",");

      var camp_id = myArray[0];
      var oldfname = myArray[1];

       alert("myfile"+ oldfname)
   
      var filenum = myArray[2];
      var tact = myArray[3];
  
      // alert(myArray[3])
       if(filenum.length !== 0){
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
       url: 'http://localhost:3000/customEmp/image_remove', // Replace with your server-side script URL
       data: formData,camp_id :camp_id,tact:tact,
       processData: false, // Prevent jQuery from processing the data
       contentType: false, // Set content type to false, as we are using FormData
       success: function(response) {
           // Handle the server's response here
         //  $('.wrap_new').html('<p class="alert alert-success">Image Upload successfully..</p>').fadeOut(3000)
           // $("#container11").hide();
           //   $("#fileviewbox").hide();
           alert(response)

           $('#message').html('<div class="alert alert-success">'  + response.message +  '</div>');
           $('#leftnav').DataTable().ajax.reload();
           $('#apptask').DataTable().ajax.reload();
           $('#task_priorities').DataTable().ajax.reload();
           $('#todaysstask').DataTable().ajax.reload();
           $('#weeklytasks').DataTable().ajax.reload();
           setTimeout(function () {
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
    }else{
      $('.comment').html('<p class="alert alert-primary">Please upload only two Images..</p>').fadeOut(4000);

    }
}
