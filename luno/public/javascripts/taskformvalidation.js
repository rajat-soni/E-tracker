var camp_nameError = document.getElementById("camp_nameError");
var camp_name = document.getElementById('camp_name');
var btnClick = document.getElementById('action_button')
camp_nameError.disabled = true;

camp_name.onkeyup = () => {
 
    clickFormValidationCheck()
}

function clickFormValidationCheck(){ 
    var camp_name = document.getElementById('camp_name').value;

  
    if(camp_name.length == 0){
        camp_nameError.innerHTML = 'Please Enter Campaign Name'
        camp_nameError.disabled = false;
    
        return false;
    }
//   else if(camp_name.length <= 3){
//         camp_nameError.innerHTML = 'Campaign Name Must be in 3 letters'
//         camp_nameError.disabled = false;

//         return false;
//     }
   else if(!camp_name.match(/^[a-zA-Z]/)){
        camp_nameError.innerHTML = 'Please Enter Valid Campaign Name';
        camp_nameError.disabled = false;

        return false;
    }

    camp_nameError.innerHTML ='';
    camp_nameError.disabled = true;    
}


var btnClick = document.getElementById('action_button')

    var camp_nameError = document.getElementById("camp_nameError")
    
btnClick.onclick = () => {     
    camp_nameError.disabled = true;
    clickFormValidationCheck();
         
        if( camp_nameError.disabled == true ){ 
          return true;
        }else{
            return false;    
            }
}


 




// Validation start for Campaign from field

var camp_fromError = document.getElementById("camp_fromError");
var camp_from = document.getElementById('camp_from');
var btnClick = document.getElementById('action_button')
camp_fromError.disabled = true;

camp_from.onkeyup = () => {
 
    camp_fromValidationCheck()
}

function camp_fromValidationCheck(){ 
    var camp_from = document.getElementById('camp_from').value;

  
    if(camp_from.length == 0){
        camp_fromError.innerHTML = 'Please Enter Campaign From'
        camp_fromError.disabled = false;
    
        return false;
    }
//   else if(camp_from.length <= 3){
//         camp_fromError.innerHTML = 'Campaign From Must be in 3 letters'
//         camp_fromError.disabled = false;

//         return false;
//     }
   else if(!camp_from.match(/^[a-zA-Z]/)){
    camp_fromError.innerHTML = 'Please Enter Valid Campaign From';
    camp_fromError.disabled = false;

        return false;
    }

    camp_fromError.innerHTML ='';
    camp_fromError.disabled = true;    
}


var btnClick = document.getElementById('action_button')

    var camp_fromError = document.getElementById("camp_fromError")
    
btnClick.onclick = () => {     
    camp_fromError.disabled = true;
    camp_fromValidationCheck();
         
        if( camp_fromError.disabled == true ){ 
          return true;
        }else{
            return false;    
            }
}


 

// validation end for campaign from field









// Validation start for Blast Count

var blast_countError = document.getElementById("blast_countError");
var blast_count = document.getElementById('blast_count');
var btnClick = document.getElementById('action_button')
blast_countError.disabled = true;

blast_count.onkeyup = () => {
 
    blastcountValidationCheck()
}

function blastcountValidationCheck(){ 
    var blast_count = document.getElementById('blast_count').value;

  
    if(blast_count.length == 0){
        blast_countError.innerHTML = 'Please Enter Blast Count'
        blast_countError.disabled = false;
    
        return false;
    }
//   else if(blast_count.length <= 3){
//         blast_countError.innerHTML = 'Blast Count Must be in 3 letters'
//         blast_countError.disabled = false;

//         return false;
//     }
//    else if(!blast_count.match(/^[a-zA-Z]/)){
//     blast_countError.innerHTML = 'Please Enter Valid Blast Count';
//     blast_countError.disabled = false;

//         return false;
//     }

    blast_countError.innerHTML ='';
    blast_countError.disabled = true;    
}


var btnClick = document.getElementById('action_button')

    var blast_countError = document.getElementById("blast_countError")
    
btnClick.onclick = () => {     
    blast_countError.disabled = true;
    blastcountValidationCheck();
         
        if( blast_countError.disabled == true ){ 
          return true;
        }else{
            return false;    
            }
}


 

// validation end for Blast Count






// Validation start for Priority Field

var priorityError = document.getElementById("priorityError");
var priority = document.getElementById('priority');
var btnClick = document.getElementById('action_button')
priorityError.disabled = true;

priority.onkeyup = () => {
 
    blastcountValidationCheck()
}

function blastcountValidationCheck(){ 
    var e = document.getElementById('priority').value;

    var priority = e.options[e.selectedIndex].value;
    var priority = e.options[e.selectedIndex].text;
    if(priority == "Select"){
        priorityError.innerHTML = 'Please Select Priority'
        priorityError.disabled = false;
    
        return false;
    }



//   else if(priority.length <= 3){
//         priorityError.innerHTML = 'Blast Count Must be in 3 letters'
//         priorityError.disabled = false;

//         return false;
//     }
//    else if(!priority.match(/^[a-zA-Z]/)){
//     priorityError.innerHTML = 'Please Enter Valid Blast Count';
//     priorityError.disabled = false;

//         return false;
//     }

priorityError.innerHTML ='';
priorityError.disabled = true;    
}


var btnClick = document.getElementById('action_button')

    var priorityError = document.getElementById("priorityError")
    
btnClick.onclick = () => {     
    priorityError.disabled = true;
    blastcountValidationCheck();
         
        if( priorityError.disabled == true ){ 
          return true;
        }else{
            return false;    
            }
}


 

// validation end for Priority Field