


var tactebweb = document.getElementById('tactebweb');
error_Tact.disabled = true;

tactebweb.onchange = () => {
    tactValidation();
  //  tactEmail();
    var e = document.getElementById("tactebweb");
var value = e.value;
alert("Tact value first" +value);
   


    



console.log("Tact value on tact validation:" +value);
if(value  === "e_blast"){
   
    alert("first if condition");
   // for e-blast //
var cname = document.getElementById('cname');
var camp_name = document.getElementById('camp_name');
var camp_from = document.getElementById('camp_from');
var blast_count = document.getElementById('blast_count');
var priority = document.getElementById('priority');
var allocated_to = document.getElementById('allocated_to');
var blast_type = document.getElementById('blast_type11');
var asset_name = document.getElementById('asset_name');
var asset_link = document.getElementById('asset_link');
var tactebweb = document.getElementById('tactebweb');

 










var cname_error = document.getElementById('cname_error')
var camp_name_error = document.getElementById('camp_error');
 var camp_from_error = document.getElementById('camp_from_error');
var blast_error = document.getElementById('blast_error');
var error_priority = document.getElementById('error_priority');
var error_allocated = document.getElementById('error_allocated');
var error_Tact = document.getElementById('error_Tact');
var error_blast_type = document.getElementById('error_blast_type');
var error_ebasset_name = document.getElementById('error_ebasset_name');
var error_asset_link = document.getElementById('error_asset_link');






// var error_asset_link = document.getElementById('error_asset_link');
//var eblast_error = document.getElementById('eblast_error');



cname_error.disabled = true;
camp_name_error.disabled = true;
camp_from_error.disabled = true;
blast_error.disabled = true;
error_priority.disabled = true;
error_allocated.disabled = true;
error_blast_type.disabled = true;
error_ebasset_name.disabled = true;
error_Tact.disabled = true;





// tactebweb.onchange = () => {

//     tactEmail();
    
//     }
    
//     var tactebwebNew = document.getElementById('error_Tact');
    
//     function tactEmail() { // client name funcion start 
    
//     var tactebweb = document.getElementById('tactebweb');
//     if(tactebweb.value  === "e_blast"){
//     alert("within tact is eblast");
//         nameValidation();
//         campNameValidation();
//         campFromValidation()
//         blastCountValidation();
//         priorityValidation();
//         allocatedToValidation()
//         blast_typeValidation();
//         campFromValidation();
//         asset_linkValidation();
//         asset_nameValidation();
//         return true;
//     }
    
//     // else if( tactebweb.value  === 'webinar' ){

//     //     alert("webinar");
//     //     wapCampFun();
//     //     wapCampFromFun();  
//     //     wapCountFromFun();
//     //     webPriorityFun();
//     //     webBlstTypFun();
//     //     webAllocatedTo();
//     //     registrLinkFun();
//     //     registrLinkFun();
//     //     return true;
         
        
//     // }
    
    
//     else{
//         error_Tact.disabled = true;
//         error_Tact.innerHTML = '';
//         tactebwebNew.style.borderColor = "green";
//     }
//     } 
    
    
    
    // client name funcion end 

// ebasset_nameview.onkeyup = () => {

// eblastValidation();
// }

// function eblastValidation() {

//     var ebasset_nameview = document.getElementById('ebasset_nameview').value;
//        alert(ebasset_nameview);
//     if(ebasset_nameview.length <=2){
//         eblast_error.innerHTML = 'comment Must be in 2 letters'
//         eblast_error.disabled = false;
//         return false;
//     }

//     if(ebasset_nameview.length == 0){
//         eblast_error.innerHTML = 'Please Enter Name'
//         eblast_error.disabled = false; 
//         return false;
//     }
//     if(!ebasset_nameview.match(/^[a-zA-Z]/)){
//         eblast_error.innerHTML = 'Please Enter Valid Name';
//         eblast_error.disabled = false;
//         return false;
//     }

//     eblast_error.innerHTML ='';
//     eblast_error.disabled = true;    
//} //end of camp_name //






blast_type.onchange = () => {
blast_typeValidation();
}

var blast_type_new = document.getElementById('blast_type11');
function  blast_typeValidation()  {

var blast_type = document.getElementById('blast_type11');
if(blast_type.value  == "Please select one"){
    error_blast_type.disabled = false;
    error_blast_type.innerHTML = 'Please select one value'
    error_blast_type.style.borderColor = "black";

    return false;
}else{
    error_blast_type.disabled= true;
    error_blast_type.innerHTML = '';
    blast_type_new.style.borderColor = "green";

    
}
}















allocated_to.onchange = () => {
allocatedToValidation();
}
var allocated_to_new= document.getElementById('allocated_to');

function allocatedToValidation () {

var allocated_to = document.getElementById('allocated_to');
if(allocated_to.value  == "Please select one"){
    error_allocated.disabled = false;
    error_allocated.innerHTML = 'Please select one value'
    allocated_to_new.style.borderColor = "black";

    return false;
}else{
    error_allocated.disabled = true;
    error_allocated.innerHTML = '';
    allocated_to_new.style.borderColor = "green";

    
}
}
priority.onchange = () => {
priorityValidation()
}

var priority_new = document.getElementById('priority');

function priorityValidation () {

var priority = document.getElementById('priority');
if(priority.value  == "Please select one"){
    error_priority.disabled = false;
    error_priority.innerHTML = 'Please select one value'
    priority_new.style.borderColor = "black";
    return false;
}else{
    error_priority.disabled = true;
    error_priority.innerHTML = '';
    priority_new.style.borderColor = "black";
    
}
}

//start validation Eblast Asset Name
asset_name.onkeyup = () => {
asset_nameValidation();
}
var asset_name_new = document.getElementById('asset_name');

function asset_nameValidation () {  // defination of function //
var asset_name = document.getElementById('asset_name').value;


if(asset_name.length == 0){
    error_ebasset_name.innerHTML = ' Asset Name not be empty'
    error_ebasset_name.disabled = false; 
    asset_name_new.style.borderColor = "black";

    return false;
}


error_ebasset_name.innerHTML ='';
error_ebasset_name.disabled = true;  
asset_name_new.style.borderColor = "green";

} //end of E-Blast Asset Name//

//start validation Eblast Asset Link

asset_link.onkeyup = () => {
asset_linkValidation();
}
var asset_link_new = document.getElementById('asset_link');

function asset_linkValidation () {  // defination of function //
var asset_link = document.getElementById('asset_link').value;


if(asset_link.length == 0){
    error_asset_link.innerHTML = ' Asset Link not be empty'
    error_asset_link.disabled = false; 
    asset_link_new.style.borderColor = "black";

    return false;
}


error_asset_link.innerHTML ='';
error_asset_link.disabled = true;  
asset_link_new.style.borderColor = "green";

} 

//end validation of E-Blast Asset Link//
blast_count.onkeyup = () => {
blastCountValidation();
}
var blast_count_new = document.getElementById('blast_count');

function blastCountValidation () {  // defination of function //
var blast_count = document.getElementById('blast_count').value;


if(blast_count.length == 0){
    blast_error.innerHTML = ' Blast count not be empty'
    blast_error.disabled = false; 
    blast_count_new.style.borderColor = "black";

    return false;
}
// if(!camp_from.match(/[0-9]/)){
//     blast_error.innerHTML = 'Please Enter Valid ';
//     blast_error.disabled = false;
//     return false;
// }

blast_error.innerHTML ='';
blast_error.disabled = true;  
blast_count_new.style.borderColor = "green";

} //end of camp_name //
camp_from.onkeyup = () => {
campFromValidation();
}
var camp_from_new = document.getElementById('camp_from');

function campFromValidation () {  // defination of function //
var camp_from = document.getElementById('camp_from').value;

if(camp_from.length <= 2){
    camp_from_error.innerHTML = 'Campaign from Must be in 2 letters'
    camp_from_error.disabled = false;
    camp_from_new.style.borderColor = "black";
    return false;
}

if(camp_from.length == 0){
    camp_from_error.innerHTML = 'Please Enter Name'
    camp_from_error.disabled = false; 
    camp_from_new.style.borderColor = "black";
    return false;
}
if(!camp_from.match(/^[a-zA-Z]/)){
    camp_from_error.innerHTML = 'Please Enter Valid Name';
    camp_from_error.disabled = false;
    camp_from_new.style.borderColor = "black";
    return false;
}

camp_from_error.innerHTML ='';
camp_from_error.disabled = true;  
camp_from_new.style.borderColor = "green";  
} //end of camp_name //

camp_name.onkeyup = () => {

campNameValidation();
}
var camp_name_new = document.getElementById('camp_name');

function campNameValidation () {  // defination of function //
var camp_name_value = document.getElementById('camp_name').value;

if(camp_name_value.length <= 2){
    camp_name_error.innerHTML = 'Campaign Name Must be in 2 letters'
    camp_name_error.disabled = false;
    camp_name_new.style.borderColor = "black";
    return false;
}

if(camp_name_value.length == 0){
    camp_name_error.innerHTML = 'Please Enter Name'
    camp_name_error.disabled = false; 
    camp_name_new.style.borderColor = "black";
    
    return false;
}
if(!camp_name_value.match(/^[a-zA-Z]/)){
    camp_name_error.innerHTML = 'Please Enter Valid Name';
    camp_name_error.disabled = false;
    camp_name_new.style.borderColor = "black";
    return false;
}

camp_name_error.innerHTML ='';
camp_name_error.disabled = true;  
camp_name_new.style.borderColor = "green";  
} //end of camp_name //

cname.onchange = () => {

nameValidation();

}

var cname_new = document.getElementById('cname');

function nameValidation() { // client name funcion start 

var cname = document.getElementById('cname');
if(cname.value  == "Please select one"){
    cname_error.disabled = false;
    cname_new.style.borderColor = "black";
    cname_error.innerHTML = 'Please select one value'
    return false;
}else{
    cname_error.disabled = true;
    cname_error.innerHTML = '';
    cname_new.style.borderColor = "green";
    
}
} // client name funcion end 

var btnClick = document.getElementById('action_button');
var camp_name_error = document.getElementById('camp_error');

btnClick.onclick = () => {
cname_error.disabled = true;
camp_name_error.disabled = true;
camp_from_error.disabled = true;
blast_error.disabled = true;
error_priority.disabled = true;
error_allocated.disabled = true;
error_blast_type.disabled= true;
// error_Tact.disabled = true;



nameValidation();
campNameValidation();
campFromValidation()
blastCountValidation();
priorityValidation();
allocatedToValidation()
blast_typeValidation();


campFromValidation();
asset_linkValidation();
asset_nameValidation();





if( ( cname_error.disabled == true) && ( camp_name_error.disabled == true ) && (camp_from_error.disabled == true)  && (blast_error.disabled == true) && (error_priority.disabled == true) && (error_allocated.disabled == true) && (error_blast_type.disabled == true) && (error_ebasset_name.disabled == true) && (webcamp_error.disabled == true) && (webcamp_from_error.disabled == true) && (webinar_count_error.disabled == true ) && (weberror_priority_error.disabled == true) && ( weberrblsttype_error.disabled == true) && (weberror_allocated_error.disabled == true) && (error_registration_link.disabled == true) ) {
    return true;
}else{
    return false;
}
}













}
else if(value  === "webinar"){

    alert("within else if webinar");

// for webinar //
var webcamp_name = document.getElementById('webcamp_name');
var webcamp_from = document.getElementById('webcamp_from');
var webinar_count = document.getElementById('webinar_count');
var webpriority = document.getElementById('webpriority');
var webBlsttype = document.getElementById('webblsttype');
var weballocated_to = document.getElementById('weballocated_to');
var registration_link = document.getElementById('registration_link');


// for webinar error //
var webcamp_error = document.getElementById('webcamp_error');
var webcamp_from_error = document.getElementById('webcamp_from_error');
var webinar_count_error = document.getElementById('webinar_count_error');
var weberror_priority_error = document.getElementById('weberror_priority');
var weberrblsttype_error = document.getElementById('weberrblsttype');
var weberrblsttype_error = document.getElementById('weberrblsttype');
var weberror_allocated_error = document.getElementById('weberror_allocated');
var error_registration_link = document.getElementById('error_registration_link');





    
webcamp_error.disabled = true;
webcamp_from_error.disabled = true;

webinar_count_error.disabled = true;
weberror_priority_error.disabled = true;
weberrblsttype_error.disabled = true;
weberror_allocated_error.disabled = true;
error_registration_link.disabled = true;





registration_link.onkeyup = () => {

    registrLinkFun();
    }
    
    function registrLinkFun() {
    
        var registration_link = document.getElementById('registration_link').value;
       
        if(registration_link.length <=2){
            error_registration_link.innerHTML = 'comment Must be in 2 letters'
            error_registration_link.disabled = false;
            return false;
        }
    
        if(registration_link.length == 0){
            error_registration_link.innerHTML = 'Please Enter Name'
            error_registration_link.disabled = false; 
            return false;
        }
        if(!registration_link.match(/^[a-zA-Z]/)){
            error_registration_link.innerHTML = 'Please Enter Valid Name';
            error_registration_link.disabled = false;
            return false;
        }
    
        error_registration_link.innerHTML ='';
        registration_link.disabled = true;    
    } //end of camp_name //


















weballocated_to.onchange = () => {
    webAllocatedTo();
}
    
    var weballocated_to_new = document.getElementById('weballocated_to');
    function webAllocatedTo()  {
    
    var webBlsttype = document.getElementById('weballocated_to');
    if(webBlsttype.value  == "Please select one"){
        weberror_allocated_error.disabled = false;
        weberror_allocated_error.innerHTML = 'Please select one value'
        weberror_allocated_error.style.borderColor = "black";
    
        return false;
    }else{
        weberror_allocated_error.disabled= true;
        weberror_allocated_error.innerHTML = '';
        weballocated_to_new.style.borderColor = "green";
    
        
    }
    }
    
webBlsttype.onchange = () => {
    webBlstTypFun();
}
    
    var blast_type_new = document.getElementById('webblsttype');
    function webBlstTypFun()  {
    
    var webBlsttype = document.getElementById('webblsttype');
    if(webBlsttype.value  == "Please select one"){
        weberrblsttype_error.disabled = false;
        weberrblsttype_error.innerHTML = 'Please select one value'
        weberrblsttype_error.style.borderColor = "black";
    
        return false;
    }else{
        weberrblsttype_error.disabled= true;
        weberrblsttype_error.innerHTML = '';
        blast_type_new.style.borderColor = "green";
    
        
    }
    }
    





webpriority.onchange = () => {
    webPriorityFun();
    }
    
    var blast_type_new = document.getElementById('webpriority');
    function   webPriorityFun()  {
    
    var webpriority = document.getElementById('webpriority');
    if(webpriority.value  == "Please select one"){
        weberror_priority_error.disabled = false;
        weberror_priority_error.innerHTML = 'Please select one value'
        weberror_priority_error.style.borderColor = "black";
    
        return false;
    }else{
        weberror_priority_error.disabled= true;
        weberror_priority_error.innerHTML = '';
        blast_type_new.style.borderColor = "green";
    
        
    }
    }
    

















webinar_count.onkeyup = () => {

    wapCountFromFun();
    }
    
    function wapCountFromFun() {
    
        var webinar_countnew = document.getElementById('webinar_count').value;
       
        if(webinar_count.length == 0){
            webinar_count_error.innerHTML = ' webinar count not be empty'
            webinar_count_error.disabled = false; 
         //   webinar_count.style.borderColor = "black";
        
            return false;
        }
    
        webinar_count_error.innerHTML ='';
        webinar_count_error.disabled = true;  
       // webinar_count.style.borderColor = 'green';
    } //end of camp_name //

    webcamp_from.onkeyup = () => {

    wapCampFromFun();
    }
    
    function wapCampFromFun() {
    
        var webcamp_from = document.getElementById('webcamp_from').value;
       
        if(webcamp_from.length <=2){
            webcamp_from_error.innerHTML = 'comment Must be in 2 letters'
            webcamp_from_error.disabled = false;
            return false;
        }
    
        if(webcamp_from.length == 0){
            webcamp_from_error.innerHTML = 'Please Enter Name'
            webcamp_from_error.disabled = false; 
            return false;
        }
        if(!webcamp_from.match(/^[a-zA-Z]/)){
            webcamp_from_error.innerHTML = 'Please Enter Valid Name';
            webcamp_from_error.disabled = false;
            return false;
        }
    
        webcamp_from_error.innerHTML ='';
        webcamp_from_error.disabled = true;    
    } //end of camp_name //
    
    





webcamp_name.onkeyup = () => {

wapCampFun();
}

function wapCampFun() {

    var webcamp_name = document.getElementById('webcamp_name').value;
   
    if(webcamp_name.length <=2){
        webcamp_error.innerHTML = 'comment Must be in 2 letters'
        webcamp_error.disabled = false;
        return false;
    }

    if(webcamp_name.length == 0){
        webcamp_error.innerHTML = 'Please Enter Name'
        webcamp_error.disabled = false; 
        return false;
    }
    if(!webcamp_name.match(/^[a-zA-Z]/)){
        webcamp_error.innerHTML = 'Please Enter Valid Name';
        webcamp_error.disabled = false;
        return false;
    }

    webcamp_error.innerHTML ='';
    webcamp_error.disabled = true;    
} //end of camp_name //








var btnClick = document.getElementById('action_button');
var camp_name_error = document.getElementById('camp_error');

btnClick.onclick = () => {
alert("within action button");
    // webinar errors //
    webcamp_error.disabled = true;
    webcamp_from_error.disabled = true
    webinar_count_error.disabled = true;  
    weberror_priority_error.disabled = true;
    weberror_allocated_error.disabled = true;
    wapCampFun();
    wapCampFromFun();
    wapCountFromFun();
    webPriorityFun();
    webBlstTypFun()
    webAllocatedTo();
    registrLinkFun();





if(  (webcamp_error.disabled == true) && (webcamp_from_error.disabled == true) && (webinar_count_error.disabled == true ) && (weberror_priority_error.disabled == true)  && (weberror_allocated_error.disabled == true)  ) {
    alert("if condition within action btn");
    return true;
}else{
    alert("else condtion within action btn");
    return false;
}
}


    // error_Tact.disabled= true;
    // error_Tact.innerHTML = '';
    // tact_new.style.borderColor = "green";


    /* var cname = document.getElementById('cname');  
    var cname_error = document.getElementById('cname_error')
    cname_error.disabled = true; */


}

}
var tact_new= document.getElementById('tactebweb');

 function tactValidation () {

    var tactebweb = document.getElementById('tactebweb');
    if(tactebweb.value  == "Please select one"){
        error_Tact.disabled = false;
        error_Tact.innerHTML = 'Please select one value'
        tact_new.style.borderColor = "black";

        return false;
    }else{
        error_Tact.disabled= true;
        error_Tact.innerHTML = '';
        tact_new.style.borderColor = "green";

        
    }


   


}





// function tactEmail() { // client name funcion start 
    
//     var tactebweb = document.getElementById('tactebweb');
//     if(tactebweb.value  === "webinar"){
//     alert("within tact is webinar");
//     alert("webinar");
//     wapCampFun();
//     wapCampFromFun();  
//     wapCountFromFun();
//     webPriorityFun();
//     webBlstTypFun();
//     webAllocatedTo();
//     registrLinkFun();
//     registrLinkFun();
//     return true;
//     }

//   else  if(tactebweb.value  === "e_blast"){
//         alert("within tact is eblast");
//             nameValidation();
//             campNameValidation();
//             campFromValidation()
//             blastCountValidation();
//             priorityValidation();
//             allocatedToValidation()
//             blast_typeValidation();
//             campFromValidation();
//             asset_linkValidation();
//             asset_nameValidation();
//             return true;
//         }
        
    
// else{
//         error_Tact.disabled = true;
//         error_Tact.innerHTML = '';
//         tactebwebNew.style.borderColor = "green";
//     }
//     } 
   
