var sender_name_error = document.getElementById("sender_name_error")
var email_error = document.getElementById("email_error")
 var client_id_error = document.getElementById("client_id_error")

var sender_name1  = document.getElementById("sender_name")

var sender_email1 = document.getElementById('sender_email')
var client_id = document.getElementById('client_id')

 sender_name_error.disabled = true;
 email_error.disabled = true;
 client_id_error.disabled = true;

var btnClick = document.getElementById('action_button')

sender_name.onkeyup = () => {

    senderFormValidationCheck() // function call
}



function senderFormValidationCheck(){  // defination of function //
    var sender_name = document.getElementById('sender_name').value;
   
    var regexname=/([a-zA-Z])/;
     if(sender_name.length < 2){
         sender_name_error.innerHTML = '*first name must be in 2 letters'
         sender_name_error.disabled = false;
         sender_name1.style.borderColor = "#B2BABB";
          return false; }
           if(sender_name.length == 0){ 
            sender_name_error.innerHTML = '*please enter Name'
            sender_name_error.disabled = false; 
             sender_name1.style.borderColor = "#B2BABB"; 
             return false;}
             if(!sender_name.match(regexname)){
                 sender_name_error.innerHTML = '*please enter valid name';
                  sender_name_error.disabled = false;
                  sender_name1.style.borderColor = "#B2BABB"; 
                  return false;
                }


    sender_name_error.innerHTML ='';
    sender_name_error.disabled = true;     
    sender_name1.style.borderColor = "#34eb40";  
} //end of sender_name //


 // sender email validation code start //
sender_email.onkeyup = () => {

  senderEmailValidationCheck()
}

// var email_error = document.getElementById("email_error")
//     email_error = true;

function senderEmailValidationCheck(){ 
    var sender_email = document.getElementById('sender_email').value;
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i; 
    
    if(sender_email.length <= 1){
        
         email_error.innerHTML = '*email at least 1 letter.' 
         email_error.disabled = false; sender_email1.style.borderColor = "#B2BABB"; 
          return false;
        
        }
        if(!testEmail.test(sender_email))
        { email_error.innerHTML = ' <p style = "color:red;">*please enter valid email like @ etc.</p>';
         email_error.style.borderColor = "#B2BABB";
          email_error.disabled = false;
          return false;
         }



    email_error.innerHTML ='';
    email_error.disabled = true;  
    sender_email1.style.borderColor =  "#34eb40";  
} // end of email //







var client_id_new = document.getElementById('client_id')

client_id_new.onchange = () => { // code for client id validation //
    

    clientIdValidationCheck();
 
 }


function clientIdValidationCheck(){
 var client_id_new =    document.getElementById('client_id');
     if(client_id_new.value == ""){
    
        client_id_error.innerHTML = '*please select  record';
        client_id_error.disabled = false;
        client_id.style.borderColor = "#B2BABB"
        return false;  
    }else {
    client_id_error.disabled = true;
    client_id_error.innerHTML = ""
   
    }
}  // end code 



    var btnClick = document.getElementById('action_button');
    var sender_name_error = document.getElementById("sender_name_error");
    var email_error = document.getElementById("email_error");
    var client_id_error = document.getElementById("client_id_error");

btnClick.onclick = () => {       // all function condition start //
    sender_name_error.disabled = true;
    email_error.disabled = true;
    client_id_error.disabled = true;
    senderFormValidationCheck()
    senderEmailValidationCheck()
    clientIdValidationCheck()


        if((sender_name_error.disabled == true)  && (email_error.disabled == true) && (client_id_error.disabled == true) ){ 
          return true;
        }else{
            return false;    
            }
}
