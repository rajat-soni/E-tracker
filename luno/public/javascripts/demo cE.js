if (row.camp_id === null || (row.tact == "Email Blast / Reminder Blast" && row.user_rbfiles == "" ||  (row.user_rbfiles === "undefined"))|| (row.tact == "Email Blast" && (row.user_ebfiles == "" ||  (row.user_ebfiles === "undefined") )) || (row.tact == "Webinar" && (row.webinar_files == "" ||  (row.webinar_files === "undefined") ))  )
{

 
                  return `
                    
  
                  ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
   
   
                  ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 

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
                           <br>
                           <label ></label>
                           <input type = "file" class=" main-list-image-input" name = "image[]" data-id="${row.id}"   id = "image" multiple >
                         </div>
                           </div>
                           <div class="modal-footer">
                            
                             <button 
                             type="button" 
                             class="imageform btn btn-primary" onclick="fileUpload(this)" 
                             data-id="${row.id}" 
                             data-tact="${tact}"
                             
                             >Upload Files</button>
     
     
                           </div>
                         </div>
                       </div>
                     </div>
                     </form>


              
 
                `;
          }
          
          else{
          
            return`
 
      console.log("elsecondtion")
         ${(row.allocated_to == row.user_id && row.status == 1) ? `<b><i class="bi bi-check msgshow"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" style="font-size:26px;"></i>` : (row.allocated_to == row.user_id && dt2 < dt1 && row.status == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">EB Missed</span>`: (row.allocated_to == row.user_id && dt2 > dt1 && row.status == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm check" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 


         ${(row.rballocated_to == row.user_id && row.rbstatus == 1) ? `<b><i class="bi bi-check msgshow" style="font-size:26px;"></i>` : (row.rballocated_to == row.user_id && dt3 < dt1 && row.rbstatus == 0 ) ? `<span class="bg-danger text-light px-1 rounded small">RB Missed</span>`: (row.rballocated_to == row.user_id && dt3 > dt1 && row.rbstatus == 0 ) ?`<input type="checkbox" class="btn btn-link btn-sm remider_blstcheckbox" id ="my_id" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-rowid='${meta.row}' data-id="${data}"></button>`:` `} 
               
               


         <button type="button"  style="display:none" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" "  data-bs-target="#${tact+""+row.id}" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date +' ' + row.blast_time +' ' + tact +`" >


         <button type="button" class="btn btn-link btn-sm view" data-bs-toggle="tooltip" data-bs-placement="top" title="view"  data-id =" `+ row.id + ' ' + row.user_id + ' ' + tact + ` "><span class="bi bi-eye" style = "font-size:20px"></span></button>

              


                 <button type="button"  id = "editimage"     class="btn btn-link btn-sm editimage" data-id="`+ row.id + ' ' +tact+`"><i class="fa fa-upload"></i></button>



               
                 <button type="button" style="display:none" class="open-homeEvents btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + ' ' + row.rb_date + ' ' + row.blast_time + ' ' + tact + `">
                 Comment
                </button>

                
                 `;
          }

                
            }
         }


      ]


   });
