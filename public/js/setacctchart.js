//set up account chart
$.extend(jQuery.expr[':'], {
  focusable: function (el, index, selector) {
    return $(el).is('a, button, :input, [tabindex]');
  }
});

$(document).on('keypress', 'input,select', function (e) {
  if (e.which == 13) {
    e.preventDefault();
  var $canfocus = $(':focusable');  // Get all focusable elements on the page
  var index = $canfocus.index(this) + 1;
  if (index >= $canfocus.length) index = 0;
  $canfocus.eq(index).focus();
}
});

$(function() {

  $("<a>").attr({id:"return",title:"返回首頁"})
  .text("\u21B6").appendTo('body');

  $("<br>").appendTo('body');

  $("#return").on("click",function() {
      $(this).attr("href","/")
  })

  $.getJSON("acctChartAll.json",function(result) {
         console.log("result from json file",result)
         let tempresult = result; //save resul original

         let acctclass = tempresult.filter(function(arr) {
          return arr[0].length == 2;
         })
         .reduce(function(reduceobj,arr) {
          reduceobj[arr[0]] = arr[1];
          return reduceobj;
         },{})

         console.log("acctclass",acctclass)

         let lastindex = 0;
         let tempArr = result.filter(function(arr) {
           return  arr[0].length === 4;
         })
         .reduce(function(reducearr,arr) {
          let subno = arr[0].substr(0,2)
          reducearr.push(
            {
             acctno: arr[0],
             acctname:  arr[1],
             lastindex: lastindex,
             cindex: "index" + lastindex,
             listorder: subno,
             classname: acctclass[subno]
           }
         )
          lastindex++;
          return reducearr;
        },[])
         console.log("tempArr",tempArr)
//
let acctchart = result;
let sugChart = [];
let acctChart = acctchart.filter(function(arr) {
      return arr[0].length === 4;
    });

    for(let prop in acctChart) {
      sugChart.push({
        value: acctChart[prop][0] + " " + acctChart[prop][1],
        data: acctChart[prop][1]
      })     
    }
    //console.log("sugChart: ",sugChart)
    $('#acctno').autocomplete({
      lookup: sugChart,
      minChars: 1,
      lookupLimit: 10,
      lookupFilter: function (suggestion, query, queryLowerCase) {
        return suggestion.value.toLowerCase().indexOf(queryLowerCase) === 0;
      },
      onSelect: function (suggestion) {
        let sacctno = suggestion.value.substr(0,4);
        let sacctname = suggestion.data
        $("#acctno").val(sacctno);
        $("#acctname").val(sacctname);
        $("#dr").focus();
      }
    });


         renderTable();

         function renderTable() {
          tempArr.sort(function(a,b) {
            aPro = a.listorder;
            bPro = b.listorder;
            return ((aPro < bPro) ? -1 : ((aPro > bPro) ? 1 : 0));
          })
          tempArr.forEach(function(obj) {
            $("<tr>") 
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"acctno"}).val(obj.acctno))
              )
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"acctname"}).prop("readonly",true).val(obj.acctname))
              )
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"classname"}).prop("readonly",true).val(obj.classname))
              )                         
            .append($("<td>")
              .append($("<button>").attr({class:"update-button btn btn-success"}).text("修改"))
              )
            .append($("<td>")
              .append($("<button>").attr({class:"delete-button btn btn-danger"}).text("刪除"))
              )
            .append($("<td>").attr({class:"index"}).css({color:"rgba(3,3,3,0)",width:0}).text(obj.cindex))              
            .appendTo($('tbody'))
          }); //end of forEach 

        } //end of renderTable

      }) //end of getjson

 }) //end of $(function)
