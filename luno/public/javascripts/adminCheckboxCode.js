//=============================  Eb status code Start ==================================
function checkboxClick(e){
    var status_id = $(e).data('id');
   
   var checkBox = document.getElementsByClassName("myStatusCheckbox");
   

   if (confirm("Are you sure you want to update the data?")) {
       $.ajax({
           url: "https://staging.webtechstar.com:7777/assigntask/action",
           method: "POST",
           data: {
               action: 'admin_status',
               status_id: status_id
           },
           dataType: "JSON",
           success: function(data) {
             

               console.log("data" + data);

               if (data.success) {
                   alert(data.success)
                   $('.msgshow').show();
                   $('.remider_blst').show();
                   $('.check').hide();

                   $('.view_msg').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);
                   $('#table_data').DataTable().ajax.reload();
               



               } else {
                  alert("error")
                   
               }

              
               setTimeout(function() {
                   $('.message').html('');
               }, 1000);

           }
       });
   } else {

       e.target.className == 'checkBox';
       $(".checkBox").prop('checked', false);


       //alert(e.target.className);

   }

}//=============================  Eb status code End ==================================


//=============================  Make Good status code Start ==================================
function  MakeGoodcheckboxClick(e){
   var makeGoodStatusId = $(e).data('id');
  

  var checkBox = document.getElementsByClassName("myMakeGoodStatusCheckbox");
  

  if (confirm("Are you sure you want to update the data?")) {
      $.ajax({
          url: "https://staging.webtechstar.com:7777/assigntask/action",
          method: "POST",
          data: {
              action: 'admin_make_good_status',
              makeGoodStatusId: makeGoodStatusId
          },
          dataType: "JSON",
          success: function(data) {
            $('.view_msg').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);

              console.log("data" + data);

              if (data.success) {
                  alert(data.success)
                  $('.msgshow').show();
                  $('.remider_blst').show();
                  $('.check').hide();

                 alert("success")

                  dataTable.row($(this).attr('data-rowid')).invalidate().draw();



              } else {
                 alert("error")
                  
              }

              $('#tdata').DataTable().ajax.reload();
              setTimeout(function() {
                  $('.message').html('');
              }, 1000);

          }
      });
  } else {

      e.target.className == 'checkBox';
      $(".checkBox").prop('checked', false);


      //alert(e.target.className);

  }

}//=============================  Make Good status code End ==================================//

///============================= RB status code Start ==================================//
function  rbCheckboxClick(e){
   var rbStatusId = $(e).data('id');
  

  var checkBox = document.getElementsByClassName("rbStatusCheckbox");
  

  if (confirm("Are you sure you want to update the data?")) {
      $.ajax({
          url: "https://staging.webtechstar.com:7777/assigntask/action",
          method: "POST",
          data: {
              action: 'admin_rb_status',
              rbStatusId: rbStatusId
          },
          dataType: "JSON",
          success: function(data) {
            $('.view_msg').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);

              console.log("data" + data);

              if (data.success) {
                  alert(data.success)
                  $('.msgshow').show();
                  $('.remider_blst').show();
                  $('.check').hide();

                 alert("success")

                  dataTable.row($(this).attr('data-rowid')).invalidate().draw();



              } else {
                 alert("error")
                  
              }

              $('#tdata').DataTable().ajax.reload();
              setTimeout(function() {
                  $('.message').html('');
              }, 1000);

          }
      });
  } else {

      e.target.className == 'checkBox';
      $(".checkBox").prop('checked', false);


      //alert(e.target.className);

  }

}///============================= RB status code End==================================//



///============================= RB MG Status Code Start ==================================//
function  rbMgCheckboxClick(e){
   var rbMgStatusId = $(e).data('id');
  

  var checkBox = document.getElementsByClassName("rbMgStatusCheckbox");
  

  if (confirm("Are you sure you want to update the data?")) {
      $.ajax({
          url: "https://staging.webtechstar.com:7777/assigntask/action",
          method: "POST",
          data: {
              action: 'admin_rb_mg_status',
              rbMgStatusId: rbMgStatusId
          },
          dataType: "JSON",
          success: function(data) {
              

             

              if (data.success) {
                  alert(data.success)
                  $('.msgshow').show();
                  $('.remider_blst').show();
                  $('.check').hide();

                  $('.view_msg').html('<p class="alert alert-danger">' + data.message + '</div>').fadeOut(4000);

                  dataTable.row($(this).attr('data-rowid')).invalidate().draw();



              } else {
                 alert("error")
                  
              }

              $('#tdata').DataTable().ajax.reload();
              setTimeout(function() {
                  $('.message').html('');
              }, 1000);

          }
      });
  } else {

      e.target.className == 'checkBox';
      $(".checkBox").prop('checked', false);


      //alert(e.target.className);

  }

}

///============================= RB  MG Status Code Start ==================================//