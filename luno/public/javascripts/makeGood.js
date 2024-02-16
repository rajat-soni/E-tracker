




$(document).on('click', '.mg_check', function(e) {

    var eb_mg_id = $(this).data('id');


    var checkBox = document.getElementsByClassName("mg_check");
   

    if (confirm("Are you sure you want to update the data?")) {
        $.ajax({
            url: "http://localhost:3000/customEmp/action",
            method: "POST",
            data: {
                action: 'eb_mg_check',
                eb_mg_id: eb_mg_id
            },
            dataType: "JSON",
            success: function(data) {
                $('.message').html('<div class="alert alert-success">' + data.message + '</div>').fadeIn();

                console.log("data" + data);

                if (data.success) {
                    alert(data.success)
                    // $('.msgshow').show();
                    // $('.remider_blst').show();
                    // $('.check').hide();

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

 });


