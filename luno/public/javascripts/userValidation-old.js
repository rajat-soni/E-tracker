var first_name_error = document.getElementById("first_name_error")
var last_name_error = document.getElementById("last_name_error")
 var user_email_error = document.getElementById("user_email_error");
 var mobile_error = document.getElementById("mobile_error");
 var user_name_error = document.getElementById("user_name_error");
var role_error = document.getElementById("role_error_value");
var password_error1 = document.getElementById("password_error1");



var first_name  = document.getElementById("first_name")

var last_name = document.getElementById('last_name')
var user_email = document.getElementById('email')
var phone = document.getElementById('phone')
var user_name = document.getElementById('user_name')
var role = document.getElementById('role')
var password = document.getElementById('password')



 first_name_error.disabled = true;
 user_email_error.disabled = true;
 mobile_error.disabled = true;
 user_name_error.disabled = true;
//  password_error.disabled = true;
role_error.disabled = true;
//  email_error.disabled = true;
//  client_id_error.disabled = true;

var btnClick = document.getElementById('action_button')

first_name.onkeyup = () => {

    userFormValidationCheck() // function call
}



function userFormValidationCheck(){  // defination of function //
    var first_name_new = document.getElementById('first_name').value;
   
    if(first_name_new.length <= 3){
        first_name_error.innerHTML = 'Last Name Must be in 3 letters'
        first_name_error.disabled = false;
        first_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(first_name_new.length == 0){
        first_name_error.innerHTML = 'Please Enter Last Name'
        first_name_error.disabled = false; 
        first_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(!first_name_new.match(/^[a-zA-Z]/)){
        first_name_error.innerHTML = 'Please Enter Valid Name';
        first_name_error.disabled = false;
        first_name.style.borderColor = "#B2BABB"
        return false;
    }

    first_name_error.innerHTML ='';
    first_name_error.disabled = true; 
    first_name.style.borderColor = "#34eb40"   
} //end of user_First Name validation  //





last_name.onkeyup = () => {

    userLastNameValidationCheck();

}


function userLastNameValidationCheck(){  // defination of function //
    var last_name_new = document.getElementById('last_name').value;
   
    if(last_name_new.length <= 3){
        last_name_error.innerHTML = 'Last Name Must be in 3 letters'
        last_name_error.disabled = false;
        last_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(last_name_new.length == 0){
        last_name_error.innerHTML = 'Please Enter Name'
        last_name_error.disabled = false; 
        last_name.style.borderColor = "#B2BABB"
        return false;
    }
    if(!last_name_new.match(/^[a-zA-Z]/)){
        last_name_error.innerHTML = 'Please Enter Valid Name';
        last_name_error.disabled = false;
        last_name.style.borderColor = "#B2BABB"
        return false;
    }

    last_name_error.innerHTML ='';
    last_name_error.disabled = true; 
    last_name.style.borderColor = "#34eb40"   
} //end of user_First Name validation  //

 // sender email validation code start //
user_email.onkeyup = () => {

  userEmailValidationCheck()
}

var user_email_error = document.getElementById("user_email_error")


function userEmailValidationCheck(){ 
    var user_email = document.getElementById('email').value;
    

    if(user_email.length <= 3){
        user_email_error.innerHTML = 'Email at least 4 letters..'
        user_email_error.disabled = false;
        return false;
    }
    if(!user_email.match( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        email_error.innerHTML = ' <p style = "color:red;">Please enter  Valid email like @ etc..</p>';
        email_error.disabled = false;
         
         return false;
    }
    if(user_email == ""){
        user_email_error.innerHTML = 'email should not be empty..';
        user_email_error.disabled = false;
        return false;
    }



    user_email_error.innerHTML ='';
    user_email_error.disabled = true;    
} // end of email //



phone.onkeyup = () => {
    mobileValidation() ;
} 

function mobileValidation(){

    var mobile = document.getElementById('phone').value;

    if(mobile.length <=9){
        mobile_error.innerHTML = '<p  style = "color:red;" >Mobile no must be 10 digits</p>'
        phone.style.borderColor = "#B2BABB";
        mobile_error.disabled = false;
            
            return false;
    }
    if(mobile.length == 0){
        mobile_error.innerHTML = '<p  style = "color:red;" >Mobile no should not be empty</p>'
        phone.style.borderColor = "#B2BABB";
        mobile_error.disabled = false;
        
        return false;
    }
    if(!mobile.match(/^[0-9]/)){
        mobile_error.innerHTML = '<p  style = "color:red;" >Please Enter Valid Moble no</p>';
        phone.style.borderColor = "#B2BABB";
        mobile_error.disabled = false;  

        return false;
    }

    mobile_error.innerHTML ='';
    phone.style.borderColor = "#34eb40";
    mobile_error.disabled = true;
    
    

} // end of mobile code //



 user_name.onkeyup = () => {
    userNameValidationCheck()
 }

function userNameValidationCheck(){  // defination of function //
    var user_name_new = document.getElementById('user_name').value;
   
    if(user_name_new.length <= 3){
        user_name_error.innerHTML = 'user Name Must be in 3 letters'
        user_name.style.borderColor = "#B2BABB"; 
        user_name_error.disabled = false;
        return false;
    }
    if(user_name_new.length == 0){
        user_name_error.innerHTML = 'Please Enter Name';
        user_name.style.borderColor = "#B2BABB"; 
        user_name_error.disabled = false; 
        return false;
    }
    if(!user_name_new.match(/^[a-zA-Z]/)){
        user_name_error.innerHTML = 'Please Enter Valid Name';
        user_name.style.borderColor = "#B2BABB"; 
        user_name_error.disabled = false;
        return false;
    }

    user_name_error.innerHTML ='';
    user_name.style.borderColor = "#34eb40"
    user_name_error.disabled = true;    
} //end of user_Name validation  //






role.onchange  = () => {
    roleValidation();
}
function roleValidation() {
   
        var role_new =  document.getElementById('role');
       
            if(role_new.value == ""){
                
           
                role_error.innerHTML = 'Please select  record';
                role_error.disabled = false;
               return false;  
           }else {
            role_error.disabled = true;
            role_error.innerHTML = ""
           }
}  // end code 

password.onkeyup = () => {
    passwordValidation();
}


function passwordValidation(){  // defination of function //
    var password_new = document.getElementById('password').value;
   
    if(password_new.length <= 3){
        password_error1.innerHTML = 'password Must be in 3 letters'
        password_error1.style.borderColor = "#B2BABB"; 
        password_error1.disabled = false;
        return false;
    }
    
    if(!password_new.match(/^[a-zA-Z]/)){
        password_error1.innerHTML = 'Please Enter Valid Password';
        password_error1.style.borderColor = "#B2BABB"; 
        password_error1.disabled = false;
        return false;
    }

    password_error1.innerHTML ='';
    password.style.borderColor = "#34eb40"
    password_error1.disabled = true;    
} //end of user_Name validation  //




// var client_id_new = document.getElementById('client_id')

// client_id_new.onchange = () => { // code for client id validation //
    

//     clientIdValidationCheck();
 
//  }


// function clientIdValidationCheck(){
//  var client_id_new =    document.getElementById('client_id');
//      if(client_id_new.value == ""){
    
//         client_id_error.innerHTML = 'Please select  record';
//         client_id_error.disabled = false;
//         return false;  
//     }else {
//     client_id_error.disabled = true;
//     client_id_error.innerHTML = ""
//     }
// }  // end code 



// pass.matches(".*[*.!@#$%^&(){}[]:";'<>,.?/~`_+-=|\\].*")

    var btnClick = document.getElementById('action_button');
    var first_name_error = document.getElementById("first_name_error");
    var last_name_error = document.getElementById("last_name_error");
    var user_email_error = document.getElementById("user_email_error");
    var  user_name_error = document.getElementById("user_name_error")
    var role_error = document.getElementById('role_error_value')
  

btnClick.onclick = () => {       // all function condition start //
    first_name_error.disabled = true;
    last_name_error.disabled = true;
    user_email_error.disabled = true;
    mobile_error.disabled = true;
    user_name_error.disabled = true;
    role_error.disabled = true;
    password_error1.disabled = true;  
    userFormValidationCheck();
    userLastNameValidationCheck();
    userEmailValidationCheck();
    mobileValidation();
    userNameValidationCheck();
    roleValidation();
    passwordValidation()

        if((first_name_error.disabled == true ) && (last_name_error.disabled == true) && (user_email_error.disabled == true) && (mobile_error.disabled == true) && (user_name_error.disabled == true) && (role_error.disabled == true) && ( password_error1.disabled == true) ) { 

          return true;

        }else{
            return false;    
            }
}
