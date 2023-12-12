 $(document).ready(function() { 
        
console.log("File Upload");


$('#action').val('Add');

$('#action_button').text('Add');
var action = $("#action").val();
console.log("action Rajashri");
console.log(action);
if (action === "Add") {
console.log("Add action within if condition");


}



        $.ajax({

url: "http://localhost:3000/fileupload",
method: "POST",
data: {  action: 'Add' },

//data: $('#task_form').serialize(),
dataType: "json",
// beforeSend: function () {
//   $('#action_button').attr('disabled', 'disabled');
// },

success: function (data) {
  $('#message').html('<div class="alert alert-success">' + data.message + '</div>');

  $('#action_button').attr('disabled', false);
 






}

});










       });