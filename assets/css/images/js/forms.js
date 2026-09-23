$(document).ready(function (e){

$("#appointment_form").on('submit',(function(e){
    e.preventDefault();
    var valid;  
    valid = validateForm();
    if(valid) {
        $.ajax({
        url: "./send-mail.php",
        type: "POST",
        data:  new FormData(this),
        contentType: false,
        cache: false,
        processData:false,
        success: function(data){
            $("#mail-status").html(data.message);
            $('#loader-icon').hide();
            $('input[type="text"],textarea,input[type="file"],input[type="email"]').val('');

            if( data.err == 0 )
            {
                window.location='thank-you.html';
            }
            
        },
        error: function(){}             
        
        });
    }
}));


function validateForm() {
    var valid = true;   
    $("#yourname").removeClass("invalid");
    $("#youremail").removeClass("invalid");
    $("#yourphone").removeClass("invalid");
    
    if(!$("#yourname").val()) {
        $("#yourname").addClass("invalid");
        $("#yourname").attr("title","Required");
        valid = false;
    }
    if(!$("#youremail").val()) {
        $("#youremail").addClass("invalid");
        $("#youremail").attr("title","Required");
        valid = false;
    }
    if(!$("#youremail").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        $("#youremail").addClass("invalid");
        $("#youremail").attr("title","Invalid Email");
        valid = false;
    }
    if(!$("#yourphone").val()) {
        $("#yourphone").addClass("invalid");
        $("#yourphone").attr("title","Required");
        valid = false;
    }
    
    return valid;
}

});