var dataTable;
$(document).ready(function () { // for fetch Data //

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
          var rowId = row.id;
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
                 
                 <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                 Comment
                </button>
              
 
                `;
          }else{
           
            return`
 
     
         ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 


         ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
               
               <button type="button"  id = "editimage"   class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' +tact+`">
               
               
               <i class="fa fa-file-excel-o" style = "font-size:18px;"></i>





                 <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ row.id + ' ' + row.user_id + ' ' + tact + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>



                
                 <button type="button" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" "  data-bs-target="#${tact+""+row.id}" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date +' ' + row.blast_time +' ' + tact +`" >
                
            <i class="fa fa-upload" onclick = "this.bgColor='black'" style = "font-size:10px;"></i></button>
           </button>
                
               
                <!-- Modal -->
            
                <form id = "sample_form"  enctype="multipart/form-data">
               
 
             
           <div class="modal fade" id="${tact+""+row.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Insert File</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div class="form-floating">
                      <p class="msgee"></p>
                      <input type = "hidden" class ="tact" id = "tact" name = "tact"  >
                      <input type = "hidden" name = "camp_id" id = "camp_id"   >
                      <input type = "hidden" id ="rbstatus">
                      <input type = "hidden" id ="rbstatus">
                      <input type = "hidden" id ="status" name = "status">
                      <input type = "hidden" id ="blast-type">
                      <input type = "hidden" id ="comment_id" name = "comment_id" data-id = " ` + row.comment_id + `" >
                      <input type = "hidden" id ="status"  data-id = " ` +  row.status + `" >
                      <textarea class="form-control"  id = "emailBlastComment" name = "emailBlastComment" placeholder = 'Write text here...' ></textarea>
                      <label for="floatingTextarea"></label>
                      <input type = "file" class="form-control main-list-image-input" name = "image[]" data-id="${row.id}"   id = "image" multiple >
                    </div>
                      </div>
                      <div class="modal-footer">
                       
                        <button 
                        type="button" 
                        class="imageform btn btn-primary" onclick="fileUpload(this)" 
                        data-id="${row.id}" 
                        data-tact="${tact}"
                        
                        >Submit Files</button>


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
     
     
      var btn =   document.getElementsByClassName('btnColor').innertext = 'Close';
     if(btn == 'Close'){
      this.style.color = "black";
     }else{
      this.style.color = "blue";
     }

    
      
        const myArray = idtype.split(" ");
        var id = myArray[1];
        var user_id = myArray[2];
        var tact = myArray[3];

      
      console.log("View Data"); 
      console.log("ID" +id);
      console.log("User ID" +user_id);
    
      $('.readAl').prop('readonly', true);
       

       if(tact == "Email-Blast"){
    

    
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
         console.log("Only E-Blast")
       }
       else if(tact == "Email-Reminder-Blast")
       {
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
         console.log("E-Blast/Reminder");
       }
       else if(tact == "Webinar")
      {

  
  
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
    
      

    
      console.log("Click rb checkbox" +id);
  
      $('#dynamic_modal_title').text('View Data');

      $('#action').val('view');

      $('#action_button').text('').hide();

      $('#action_modal').modal('show');


      $.ajax({
         url: "https://staging.webtechstar.com:7777/customEmp/action",
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
            
               $("#webinarFlex").show();   
               //  alert(webinar.html())
               $("#ebComment").hide();
               var rb =  $("#rbFlex").hide();
               // alert(rb.html())
               $("#ebasset").hide(); 
               $("#user_ebcomment").hide(); 
             
                  $("#ebBlastview").hide(); 
                  $('#webinar_comment').show();   
                  $('#webinar_admin_comment').show();
                  var user_image1=data.webinar_files;
               
              
                  var user_image1 = user_image1.split(',');
                  var length = user_image1.length;

                

                     for (var i = 0; i <=1; i++)
                     { 
                   
                        if(user_image1[i]!=undefined && user_image1[i].trim().length!=0 ){
                        htmlContent += '<p> <tr><td > <i class="fa-solid fa-folder-open"  style = "font-size:14px;"><span style = "font-size:9px;"> &nbsp; '+user_image1[i]+'</i></span> &nbsp; &nbsp;   <a  href = ""<i class="fa fa-download" style = "font-size:15px; color:black;"  name="webinar_files" id="images"  onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + user_image1[i] + ',' + i +  ','  + tact+'\'><a></i></td></tr>' ,'</p>' ;
                     }
                  }
                   document.getElementById('wbinar11').innerHTML = htmlContent;
                   $('#webinar_comment').show();
                   $('#wbinar11').show();
                   $('#webinarcomment').show()
                  
                   $("#webinarFlex").show();
                     
                        $('#ebBlastview').hide();
                        $('#rbFlex').hide();
                        $('#user_ebcomment').hide()
                        $('#ebBlastview').hide()
                    
                        var admin_image=data.admin_files;
                        var admin_image = admin_image.split(',');
                        var admin_length = admin_image.length;
                        var adminHtml = '';
                        for(var i = 0; i<=1; i++ ){
                           if(admin_image[i]!=undefined && admin_image[i].trim().length!=0 ){
                            
                              adminHtml += '<p> <tr><td > <i class="fa-solid fa-folder-open"  style = "font-size:14px;"><span style = "font-size:9px;"> &nbsp; '+admin_image[i]+'</i></span> &nbsp; &nbsp;   <a  href = "#"<i class="fa fa-download" style = "font-size:15px; color:black;"  name="webinar_files" id="images"  onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + admin_image[i] + ',' + i +  ','  + tact+'\'><a></i></td></tr>' ,'</p>' ;
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
                     

            }
            else if(tactValue  ==  'e_blast'){


               $("#rbFlex").hide();
               $("#webinarFlex").hide()
               $("#ebBlastview").show()
    
               var user_image=data.user_ebfiles;
          
               var user_image = user_image.split(',');
               var length = user_image.length;
              
               var htmlebContent = '';
 
                  for (var i = 0; i < length ; i++)
                  { 
                     
                     if(user_image[i]!=undefined && user_image[i].trim().length!=0 ){
                       
                     htmlebContent += '<p> <tr><td> <i class="fa-solid fa-folder-open"  style = "font-size:14px;"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;'+user_image[i]+'&nbsp;&nbsp;</span> <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;"  name="user_ebfiles" style = "font-size: 12px;" id="user_ebfiles" onclick="fileviewFunction(this)" data-id=\''+ data.camp_id +','+user_image[i]+',' + i +  ','  + tact +'\'> </a></i></td></tr>' ,'</p>' ;
                  }
     
                  }
                   document.getElementById('viewfiles112').innerHTML = htmlebContent;
                     $("#viewfiles112").show();
                     $("#rbFlex").hide();
                 
                     $("#user_ebcomment").show();
                 

                     var admin_image=data.admin_files;
                     
                     var admin_image = admin_image.split(',');
                     var admin_length = admin_image.length;
                     var amdinebContent = '';
                  
                  for(var i = 0; i < admin_length; i++ ){

                     
                    
                     if(admin_image[i]!=undefined && admin_image[i].trim().length!=0 ){
                     amdinebContent += '<p> <tr><td> <i class="fa-solid fa-folder-open"  style = "font-size:14px;"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;'+ admin_image[i]+'&nbsp;&nbsp;</span> <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;" name="admin_files" id="admin_files" onclick="fileviewFunction(this)" data-id=\''+ data.camp_id +','+admin_image[i]+',' + i +  ','  + tact +'\'></a></i></td></tr>' ,'</p>' ;
                 
                     }
                  }
                  document.getElementById('viewfiles113').innerHTML = amdinebContent;
                  $("#viewfiles113").show();
                 $("#rbFlex").hide();
                  $("#webinarFlex").hide();
                  $("#user_ebcomment").show();
                 


                  var user_rbfiles = data.user_rbfiles;
              
                  var user_rbfiles = user_rbfiles.split(',');
                  var user_rbfiles_length = user_rbfiles.length;
                     for (var i = 0; i < user_rbfiles_length; i++)
                     { 
   
                  
                        if(user_rbfiles[i]!=undefined && user_rbfiles[i].trim().length!=0 ){             
                           htmlContent += '<tr><td ><p>  <i class="fa-solid fa-folder-open"  style = "font-size:14px;"><span style = "font-size:9px; color:black;">&nbsp; &nbsp;'+user_rbfiles[i]+'&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black" name="user_rbfiles" style = "font-size: 12px;" id="user_file" onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + user_rbfiles[i] + ',' + i +  ','  + tact+'\'></a></i></td></tr>' ,'</p>';
                        
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
                     for(var i = 0; i < admin_rb_length; i++ ){
                       
                        if(admin_rb_image[i]!=undefined && admin_rb_image[i].trim().length!=0 ){ 
                           adminRbHtml += '<tr><td ><p> <i class="fa-solid fa-folder-open"  style = "font-size:14px;"><span style = "font-size:10px; color:black;">&nbsp; &nbsp;'+admin_rb_image[i]+' <span style = "font-size:16px; color:black;">&nbsp; &nbsp; <a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;" name="user_rbfiles" id="user_file" onclick="fileviewFunction(this)" data-id=\''+data.camp_id+ ',' + admin_rb_image[i] + ',' + i +  ','  + tact+'\'></a></i></a><br></td></tr>' ,'</p>' ;
                        }
                     }
                       document.getElementById('viewReminderBlastView12').innerHTML = adminRbHtml;
                       $('#viewReminderBlastView12').show();
                       $('#webinarFlex').hide();
                       $('#fileviewdownload').hide();
                       $('#viewfiles11').hide();
                       $('#webinar_comment_show').hide();
                       
                       $("#user_ebcomment").show();

                       if(tact=="Email-Reminder-Blast"){
                        $('#rbFlex').show();
                       }else{
                        $('#rbFlex').hide();
                       }
             

            }
           
            
            
         
      }
      });



   });
   //End of  on('click', '.view',


   $(document).on('click', '#editimage', function () {
       

  
 
      // var id = $(this).data('id');
      var idtype = $(this).data('id');

      const myArray = idtype.split(" ");
      var camp_id = myArray[0];
   
 
 
      var tactValue = myArray[1];
   
     console.log("tactValue is my"+tactValue)
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

         var imageleng = document.getElementById('image').files.length;
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
               data: { camp_id: camp_id, action: 'fetch_files' },

               dataType: "JSON",
            success: function (data) {
                  
              
      
             
               var  user_rb_files = data.user_rbfiles;



                if(tactValue==="Email-Blast")  
                {
                     var user_imagename=data.user_ebfiles;
                     var user_imagename = user_imagename.split(',');
                     var length = user_imagename.length;
                     cate_id = data.camp_id;
                  
                        var htmlContent = '';
                     var htmlContent1 ='';
                     var htmlContent2 =htmlContent+ '' +htmlContent1;
   
                  for (var i = 0; i <= length; i++){ 
    
                        if(user_imagename[i] == undefined) { 

                           // htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ cate_id + ',' + user_imagename[i] + ',' + i + ',' +tactValue+ '\' value = "Insert File"></tr></td>' ,'</p> </form>';
   
                        }else if(user_imagename[i] != '') {

                         
                           console.log(user_imagename[i]);
                           htmlContent += '<tr><td width="60%"> <i class="fa-solid fa-folder-open"  style = "font-size:13px;"><span style = "font-size:10px; color:black;"> &nbsp; &nbsp;'+user_imagename[i]+'&nbsp;&nbsp; </span> </i><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black"" name="image" id="image" onclick="fileviewFunction(this)" data-id=\''+ data.camp_id +','+user_imagename[i]+',' + i +  ','  + tactValue +'\'></i></td> &nbsp;<td  width="40%"><input type="text" value='+user_imagename[i]+' name="filenum" style="display:none;"> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-danger btn-sm  " onclick = "fileReplace1(this)"  data-id=\'' + data.camp_id + ','+user_imagename[i]+',' + i + ',' +tactValue+'\' value = "Delete Files"> &nbsp; &nbsp;</span></td></tr>' ,'';
                        }else{
                              //  alert("tact is not:" +tact);
                        }
                  }
            
                  if (2 - length > 0) {
                     
                           htmlContent += '<tr><td><form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td><input type = "file" class="form-control" name = "image" id = "hello"    data-id="'+data.camp_id+'" ></td><td><button type="button" class="imageform btn btn-primary" onclick="myFunction(this)" data-id='+ data.camp_id + ','+tactValue+'>Upload</button></td></tr>' ,'</p>  </form></td></tr>';
                        
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

          
   $( document ).ready(function() {
     
      // if(rblength <= 1){

      // alert(rblength)
        
      //       $("#tr_id").hide();
       
         
      // }else{
         
      //       $("#tr_id").show();
      // }
        
        });

          for (var i = 0; i <= 1; i++)
          { 

            if(user_rb_files[i] == undefined) { 
         
   
      
               // htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_rb_files[i]+ ' name="filenum" style="display:none;"><input type="file" name="user_rbfiles" class = " bg- form-control btn-dark imageInput custom-file-input" data-id = '+i+'  > <input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ data.camp_id + ',' +user_rb_files[i]+ ',' + i + ',' +tactValue+ '\' value = "Insert Files" ></tr></td>' ,'</p> </form>';
               
            
            }else  if
(user_rb_files[i] != ''){
                  console.log("tact is:" +tact);
                  console.log("Within else condition...");
                  console.log(user_rb_files[i]);
                  htmlContent += '<p class="main"> <tr><td width="60%">  <i class="fa-solid fa-folder-open"  style = "font-size:13px;"><span style = "font-size:10px; color:black;">  &nbsp; &nbsp;'+user_rb_files[i]+'&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\''+ data.camp_id +','+user_rb_files[i]+',' + i +  ','  + tactValue +'\'> </a></i></td> &nbsp;</td><td width="40%"> <input type="submit" class="btn btn-danger btn-sm bg-danger" onclick = "fileReplace1(this)" data-id=\'' + data.camp_id + ','+user_rb_files[i]+',' + i + ',' +tactValue+'\' value = "Delete file" id = "btn_id"></td> </tr>' ,'</p>' ;
    
            }
         }

         if (2 - rblength > 0) {
                htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td><input type = "file" class="form-control" name = "image" id = "hello"    data-id="'+data.camp_id+'" ></td><td><button type="button" class="imageform btn btn-primary btn-sm" onclick="myFunction(this)" data-id='+ data.camp_id + ','+tactValue+'>Upload File</button></td></tr>' ,'</p>  </form>';
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
   var htmlContent1 ='';
   var htmlContent2 =htmlContent+ '' +htmlContent1;
   
   for (var i = 0; i <= 1; i++){ 

     
    
    
      if(user_imagename[i] == undefined) { 
         
   
      
      
       //  htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr><td width="10%">Upload File Here</td><td><input type="text" value='+user_imagename[i]+ ' name="filenum" style="display:none;"><input type="file" name="webinar_files" class = " bg- form-control btn-dark imageInput custom-file-input" data-id = '+i+'  > <input type="submit"  class="bg-primary btn-sm btn-primary" onclick = "fileReplace1(this)" data-id=\''+ data.camp_id + ',' +user_imagename[i]+ ',' + i + ',' +tactValue+ '\' value = "Insert Files" ></tr></td>' ,'</p> </form>';
         
        
      
      }else  if(user_imagename[i] != '')
      {

         
         console.log("tact is:" +tact);
         console.log("Within else condition...");
         console.log(user_imagename[i]);
         htmlContent += '<p> <tr><td width="60%"><i class="fa-solid fa-folder-open"  style = "font-size:13px;"><span style = "font-size:10px; color:black;"> &nbsp; &nbsp;'+user_imagename[i]+'&nbsp;&nbsp;</span><a href = "#"<i class="fa fa-download" style = "font-size:16px; color:black;"  name="image" id="image" onclick="fileviewFunction(this)" data-id=\''+ data.camp_id +','+user_imagename[i]+',' + i +  ','  + tactValue +'\'></a> </i></td > &nbsp;<td  width="40%"><input type="text" value='+user_imagename[i]+' name="filenum" style="display:none;"> <span> &nbsp; &nbsp;<input type="submit" class="btn btn-danger btn-sm  " onclick = "fileReplace1(this)"  data-id=\'' + data.camp_id + ','+user_imagename[i]+',' + i + ',' +tactValue+'\' value = "Delete Files"> &nbsp; &nbsp;</span></tr></td></tr>' ,'</p>';
   
      }else{
         // $('.msgedit').show().html('<p class="alert alert-danger">Please Upload Files..</p>').fadeOut(4000);
      }

      
    
            }

            console.log("check length" +length);

            if (2 - length > 0) {
         
            htmlContent += '<form enctype="multipart/form-data" id = "form_id"><p> <tr id = "tr_id"><td><input type = "file" class="form-control" name = "image"   id = "hello"  data-id="'+data.camp_id+'" ></td><td><button type="button" class="imageform btn btn-primary btn-sm" onclick="myFunction(this)" data-id='+ data.camp_id + ','+tactValue+'>Upload File</button></td></tr>' ,'</p>  </form>';
   
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
            url: "https://staging.webtechstar.com:7777/customEmp/action",
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
            url: "https://staging.webtechstar.com:7777/customEmp/action",
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
   //            url: "https://staging.webtechstar.com:7777//customEmp/comment",
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


      const formData1=new FormData($(e).closest("form")[0]);
      const camp_id=$(e).data("id");
      const tact=$(e).data("tact") 
    var imageleng = $(`input.main-list-image-input[type='file'][data-id='${camp_id}']`)[0].files.length;
    if(imageleng==0){
      $('.msgee').show().html('<p class="alert alert-primary">Please upload only two Images or upload least one image..</p>').fadeOut(4000);
      //$(`#${tact}`).modal("hide");
      return;
    }

    if(imageleng>2){
      $('.msgee').show().html('<p class="alert alert-primary">Please upload only two Images or upload least one image..</p>').fadeOut(4000);
      //$(`#${tact}`).modal("hide");
      return;
    }
      
      
      const images_input=$(`input[name='image[]'][data-id='${camp_id}']`)

      const comment=$(e).closest("form").find("#emailBlastComment").val();
     
    
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
      }else{
         $('.comment').html('<p class="alert alert-primary">Please upload only two Images..</p>').fadeOut(4000);
         $(`#${tact+""+camp_id}`).modal("hide");
      }
        
       
   }//fileUpload() end




   function myFunction(e) { //=> funtion for uploading images into data base //   

      $("#exampleModal").modal("hide"); $("#fileviewbox").show(); 
      $("#fileviewdownload").hide()
      
      var imageleng = document.getElementById('hello').files.length;
         
      if(imageleng==0){
         $('.msgedit').show().html('<p class="alert alert-danger">Please least one Files Uploaded..</p>').fadeOut(4000);
      
         return;
      }

      if(imageleng >2){
      
      
         return;
      }

       var formData1 = new FormData(document.getElementById("sample_form"));

       var idtype=$(e).data("id");
     
       const myArray = idtype.split(",");
       var camp_id = myArray[0];
       var tact = myArray[1];
      //  const tact=$(e).data("tact") 
 
      var file_data =  $(`input[type="file"][name="image"][data-id="${camp_id}"]`)[0].files;
      

      // for multiple files
      for(var i = 0;i<file_data.length;i++){
      formData1.append("image", file_data[i]);
      }

       formData1.set("camp_id", camp_id);
      //  formData1.append('sendComment', comment);
   //    formData1.set('image[]', images_input[0].files[0]);
   // formData1.set('image[]', $('#image')[0].files[1]);
      
     
      

       
     // console.log("image"+formData1.append('image[]', image))

    
      // formData1.append("comment", comment);
     
      //console.log(formData1.append("comment", comment));
      //formData1.append("camp_id ", camp_id);
      // formData1.append("comment_id ", comment_id);
      
      console.log("check which files are selected");
      
   
      console.log({ formData1 });
      // formData1.append('sendComment', sendComment);
      // formData1.append('status', status); 
      // formData1.getAll("image[]", image);
      formData1.set("tact", tact);
     
 
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
                     
                      $(`"#" ${tact}`)[0].reset();
                      $(`"#" ${tact}`).DataTable().ajax.reload();
                    

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
         var image =name;
         //  console.log("tachvalue is ->😍❤❤🤣😂😊😊✔"+tact)
            if(tact=="Email-Blast")
            {
               var tactfolder="Email-Blast";
            }
            
            else if(tact == "Email-Reminder-Blast")
            {
               var tactfolder="Email-Reminder-Blast";
            }
            
            else if(tact=="Webinar")
            {
               var tactfolder="Webinar";
            }
       


                var url = "./files/"+camp_id+"/user/"+tactfolder+"/"+oldfname; //Set the File URL.
      //  console.log("URL_FILE:" +url);
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
      
              
                   window.navigator.msSaveBlob(blob, oldfname);
               } else {
      
               
                   var url = window.URL || window.webkitURL;
  
                   console.log("url" +url);
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
   
    function fileReplace1 (e){

      
   var id = $(e).parent().children('.imageInput').first().data("id");
    
   
      var idtype = $(e).data('id');
    
      const myArray = idtype.split(",");
      var camp_id = myArray[0];

      var oldfname = myArray[1];
      var loop_index=myArray[2]
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
              
             
              console.log(response);


              $('#message').html('<div class="alert alert-success"> File Successfully deleted..</div>');
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
   }
      
  }


    

  function handleImageUpload(i) {
  
   var imageInput = document.getElementById('image_id');
   var imageleng =  document.getElementById('image_id').files.length;
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
       url: 'https://staging.webtechstar.com:7777/customEmp/image_remove', // Replace with your server-side script URL
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




