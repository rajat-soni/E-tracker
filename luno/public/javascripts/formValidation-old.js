var clientErr = document.getElementById("clientError")
var clientName = document.getElementById('client_name')

var btnClick = document.getElementById('action_button')
clientErr.disabled = true;

clientName.onkeyup = () => {
    clickFormValidationCheck()
}

function clickFormValidationCheck(){ 
    var client_name = document.getElementById('client_name').value;

    if(client_name.length < 2){
        clientErr.innerHTML = '*first name must be in 2 letters'
        clientName.style.borderColor = "#B2BABB"; 
       
        clientErr.disabled = false;

        return false;
    }
    if(client_name.length == 0){
        clientErr.innerHTML = '*please enter name'
        clientName.style.borderColor = "#B2BABB"; 
        clientErr.disabled = false;
    
        return false;
    }
    if(!client_name.match(/^[a-zA-Z]/)){
        clientErr.innerHTML = '*please enter valid name';
        clientName.style.borderColor = "#B2BABB"; 
        clientErr.disabled = false;

        return false;
    }

    clientErr.innerHTML = '';
    clientErr.disabled = true;   
    clientName.style.borderColor = "#34eb40"; 
}


var btnClick = document.getElementById('action_button')

    var clientErr = document.getElementById("clientError")
    
btnClick.onclick = () => {     
    clientErr.disabled = true;
    clickFormValidationCheck();
         
        if( clientErr.disabled == true ){ 
          return true;
        }else{
            return false;    
            }
}


 

