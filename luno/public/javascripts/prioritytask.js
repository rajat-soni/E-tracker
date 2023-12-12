
  /* Start code for priority Task */

  var dataTable = $('#task_priorities').DataTable({



    'processing': true,
    'serverSide': true,
    'serverMethod': 'get',
    'ajax': {
      'url': 'http://localhost:3000/alltask/get_prioritydata',

    },

    'aaSorting': [],
    'columns': [

      // { "mData": 0 , //or address field
      // "mRender" : function ( data, type, full ) { 
      // //data = mData
      // //full is the full array address= [0] city = [1] state=[2] zip=[3] 
      //    return data+', '+blast_date+', '+blast_time;}
      //  },
      { data: 'blast_date' },
      { data: 'camp_name' },
      { data: 'tact' },
      { data: 'id' }


    ],

    columnDefs: [
      {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
          return `
                    
                      <button type="button" class="btn btn-link btn-sm delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-id="${data}"><i class="fa fa-trash"></i></button>

                      <button type="button" class="btn btn-link btn-sm edit" data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + ' ' + row.rb_type + `"><i class="fa fa-pencil"></i></button>

                      <button type="button" class="btn btn-link btn-sm view1"  data-id="`+ row.id + ' ' + row.status + ' ' + row.allocated_to + ' ' + row.blast_date + `"><i class="fa fa-eye"></i></button>
                      
                      `;
        }
      }


    ]


  });

  /* End code for priority Task */