$(function() {
$("<a>").attr({href:"/",id:"return",title:"返回首頁"}).text("\u21B6").appendTo('body');
$("<br>").appendTo('body');


//move focus to next input field
jQuery.extend(jQuery.expr[':'], {
  focusable: function (el, index, selector) {
    return $(el).is('a, button, :input, [tabindex]');
  }
});

$(document).on('keypress', 'input,select', function (e) {
  if (e.which == 13) {
    e.preventDefault();
            // Get all focusable elements on the page
            var $canfocus = $(':focusable');
            var index = $canfocus.index(this) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
          }
        });

$("#name").on("keypress blur",function() {
  $("#name").removeClass('danger');
  $('#parent').removeClass('danger');
  $("#idx").removeClass('danger');
  $("#errmsg1").text("");
  $("#errmsg2").text("");

});

$("#parent").on("keypress blur",function() {
   $("#parent").removeClass('danger');
   $("#errmsg1").text("");
 })

$("#idx").on("keypress blur",function() {
  $("#idx").removeClass('danger');
  $("#errmsg1").text("");
})


function search() {
  let arr = [];
  document.querySelectorAll("tbody tr")
  .forEach((tr) => {
    console.log(tr)
    let top = $(tr).css("left")
    let name = $(tr).find(".name").val();
    let parent = $(tr).find(".parent").val();
    let date = $(tr).find(".date").val();
    let obj = {name:name,parent:parent,date:date,top:top};
    arr.push(obj)

  })
  console.log(arr)
}  


$("#return").hide();
$("#create-div").hide();
$("#table-div").hide();


  let dataArr = [];   //initialize nameArr

  //GET
  $('#get-button').on('click', function() {
    $("#return").show();
    //$("#print").show();
    $("#create-div").show();
    $("#table-div").show();
    $("#errmsg1").text("");
    $('#get-button').hide();

    $.ajax({
      url: '/getdata',  //treeData.json
      contentType: 'application/json',
      success: function(response) {        
           dataArr = response.treedata;  //reassign dataArr           
           var tbodyEl = $('tbody');
           tbodyEl.html('');
          //populate tbody
          response.treedata.forEach(function(treedata) {
            $("<tr>") 
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"name"}).val(treedata.name))
              )
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"parent"}).val(treedata.parent))
              )
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"idx"}).val(treedata.idx))
              )                         
            .append($("<td>")
              .append($("<input>").attr({type:"date",class:"date"}).val(treedata.date))
              ) 
            .append($("<td>")
              .append($("<button>").attr({class:"update-button btn btn-success"}).text("修改"))
              )
            .append($("<td>")
              .append($("<button>").attr({class:"delete-button btn btn-danger"}).text("刪除"))
              )
            .append($("<td>").attr({class:"index"}).css({visibility: "hidden"}).text(treedata._id))              
            .appendTo($('tbody'))
            }); //end of forEach 
         } //sucess function
      }); //end of ajax
   }); //end of onclick


   // POST
   $('#create-form').on('submit', function(event) {
    event.preventDefault();
    let createname = $('#name').val().trim();
    let createparent = $('#parent').val().trim();
    let createidx = $('#idx').val().trim();
    let createdate = $('#date').val().trim();
       //form input validation
       //check name input
       if (!createname) {    
        $("#errmsg1").text('球號不可空白')
        $("#name").addClass("danger");
        //$("#name").focus();
        return false;
      } else { 
          let unique = true;      //check if name is unique
          for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].name === createname) {
              unique = false;    
              break;              
            }   
          }
          if (!unique) {                     
            $("#errmsg1").text('球號不可重複');
            $("#name").addClass("danger");
            //$("#name").focus();
            return false;
           }
       }   

       //check parent input
       if (!createparent) {              
        $("#errmsg1").text('安置不可空白');
        $("#parent").addClass("danger");
        //$("#parent").focus();

        return false;

      }else if (createparent !== "0") {
        let parentExsit = false;      //check name for parent  already exsits
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].name === createparent) {   //parent exsits
              parentExsit = true;
              break;           
            }
          }

          if (!parentExsit) {         
           $("#errmsg1").text('找不到安置的球號');
           $("#parent").addClass("danger");
           //$("#parent").focus();
           return false;
         }
       }

       //check idx input
       if (!createidx ) {
        if (createparent !== "0") {
          $("#errmsg1").text('引導不可空白');
          $("#idx").addClass("danger");
          //$("#idx").focus();
          return false;
        }
      }
      else {
        if (createparent !== "0") {
            let nameExsit = false;      //check if name for idx already exsits
            for (var i = 0; i < dataArr.length; i++) {
              if (dataArr[i].name === createidx) { 
                nameExsit = true;
                break;
              }
            }
            if (!nameExsit) {         
              $("#errmsg1").text('找不到引導的球號');
              $("#idx").addClass("danger");
              //$("#idx").focus();
              return false;
            }
          }
        }

/*
//turn off temporarily
        $.ajax({
          url: '/treedata',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ name: createname, parent: createparent, idx: createidx, date: createdate}),
          success: function(response) {
           console.log(response);
                //reset input value
                $('#name').val('');
                $('#parent').val('');               
                $('#idx').val('');
                $('#get-button').click(); //update tbody
                $('#name').focus(); //set focus
              }
            })
            */
      });


//put
    // find contents on the row and send to server for update   
    $('table').on('click', '.update-button', function(e) {
      /*
        let cons = e.pageY + 16;   //constant
        let offsetadj = e.offsetY - 14;    //adjustment for e.offsetY
        let top = cons - offsetadj;
         console.log("offsetY",e.offsetY);
         console.log("top",top);
         */

        let rowEl = $(this).closest('tr');      
        let newname = rowEl.find('.name').val().trim();
        let newparent = rowEl.find('.parent').val().trim();
        let newidx = rowEl.find('.idx').val().trim();
        let newdate = rowEl.find('.date').val().trim();
        let id = rowEl.find('.index').text();     
        let nameEl = rowEl.find('.name');
        let parentEl = rowEl.find('.parent');
        let idxEl = rowEl.find('.idx');
        $(nameEl).on("keypress blur",function() {
          $("#errmsg2").text("");
         })                  
        $(parentEl).on("keypress blur",function() {
          $("#errmsg2").text("");
        })   
        $(idxEl).on("keypress blur",function() {
          $("#errmsg2").text("");
        })

        //updateArr1 for name input validation   
        let updateArr1 = [];  
        for (var i = 0; i < dataArr.length; i++) {
         if(dataArr[i]._id !== id) {
          let name = dataArr[i].name;
          let parent = dataArr[i].parent;
          let idx = dataArr[i].idx;
          updateArr1.push({name: name, parent: parent, idx: idx})
        }
      }
        //updateArr1 for parent and idx input validation   
        let updateArr2 = [];  
        for (var i = 0; i < dataArr.length; i++) {
         if(dataArr[i]._id === id) {
          break;
         }else {
            let name = dataArr[i].name;
            let parent = dataArr[i].parent;
            let idx = dataArr[i].idx;
            updateArr2.push({name: name, parent: parent, idx: idx})
          }
        }
        //check newname input
        if (!newname) {         
          $("#errmsg2").text('球號不可空白')
           rowEl.find('.name').focus();
          return false;
        }else {
          let nameUnique = true;      //check if name is unique
          for (var i = 0; i < updateArr1.length; i++) {
            if (updateArr1[i].name === newname) {
              nameUnique = false;
              break;
           }
          }
          if (!nameUnique) {
             $("#errmsg2").text('球號不可重複');
              rowEl.find('.name').focus();
              return false;
          }
       }
       //check newparent input   
       if (!newparent) {
         $("#msg").text('安置不可空白');
         rowEl.find('.parent').focus();
         return false;
       }
       else {
         if (newparent !== "0") {
           let nameExist = false;
           if (newparent !== "0") {
             for (var i = 0; i < updateArr2.length; i++) {
               if (updateArr2[i].name === newparent) {
                 nameExist = true;
                 break;
               }
             }
             if (!nameExist) {                        
               $("#errmsg2").text('找不到安置的球號');
                rowEl.find('.parent').focus();
                return false;
             }   
           }
         }
       }

      //check newidx input
      if (!newidx) {
         if (newparent !== "0") {
           $("#errmsg2").text('引導不可空白');
            rowEl.find('.idx').focus();
            return false;
         }
      }
      else {
        if (newparent !== "0") {
          let nameExist = false;      //check if name for idx already exsits
          for (var i = 0; i < updateArr2.length; i++) {
              if (updateArr2[i].name === newidx) {   //parent exsits
                nameExist = true;
                break;
              }
          }
          if (!nameExist) {         
            $("#errmsg2").text('找不到引導的球號');
            rowEl.find('.idx').focus();
            return false;
          } 
        }
      }

 /*
 //turn off teamporarily     
      $.ajax({
          url: '/treedata/' + id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ newname: newname,newparent: newparent,newidx: newidx,newdate: newdate}),
          success: function(response) {
           console.log(response);
           $('#get-button').click();  
         }    
      });

      */
    });


// DELETE
    $('table').on('click', '.delete-button', function(e) {
        /*let cons = e.pageY + 16;   //constant
        let offsetadj = e.offsetY - 14;    //adjustment for e.offsetY
        let top = cons - offsetadj;*/
        let rowEl = $(this).closest('tr');      
        let newname = rowEl.find('.name').val();
        let newparent = rowEl.find('.parent').val();
        let newidx = rowEl.find('.idx').val();
        let id = rowEl.find('.index').text();     // id of each document of the collection
        let deleteArr = [];
        for (let i = 0; i < dataArr.length; i++) {
          if (dataArr[i]._id === id) {
                 deleteArr = dataArr.splice(i);   //  get the rest of dataArr, notice splice()
                 break;
          } 
         }
        for ( let i = 0; i < deleteArr.length; i++) {  
          if (deleteArr[i].parent === newname) {
            $(this).prop('disabled', true);
            $("#errmsg2").text('必須先刪除安置在下面的球號');
            return false;
           }
         }
/*         
         $.ajax({
              url: '/treedata/' + id,
              method: 'DELETE',
              contentType: 'application/json',
              success: function(response) {
               console.log(response);
               $('#get-button').click();  
             }     
          });*/
             
     });

    /*$('#delmsg').on('click', function() {
      $(this).hide();
      $('#get-button').click();  
    })*/


});  //end of (function())
