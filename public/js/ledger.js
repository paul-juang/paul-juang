//process ledger accounts

$.extend(jQuery.expr[':'], {
  focusable: function (el, index, selector) {
    return $(el).is('a, button, :input, [tabindex]');
  }
});

$(document).on('keypress', 'input,select', function (e) {
  if (e.which == 13) {
    e.preventDefault();
    let $canfocus = $(':focusable');  
    let index = $canfocus.index(this) + 1;
  if (index >= $canfocus.length) index = 0;
    $canfocus.eq(index).focus();
  }
});

$(function() {
  $("#submit").prop("disabled",true);
  $("#save").prop("disabled",true);

  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  $("<br>").appendTo('body');
  
  $("#return").on("click",function() {
      $(this).attr("href","/")
   })

  let jsonarr = ["acctchart.json", "acctclass.json"];
  
  async.map(jsonarr,function(json,callback) {
    /*$.getJSON(json, function(result) {
      callback(null,result);
    })*/
    fetch(json)
    .then(res => res.json())
    .then(data => callback(null,data))
    .catch(err => callback(err))       
  },
  function(err,result) {
    if (err) {
      console.log(err);
    }
    let acctchart = result[0];
    let acctclass = result[1];
    
    //console.log("acctchart: ", acctchart);
    //console.log("acctclass: ", acctclass);
    processLedger(acctchart,acctclass);
  });

  function processLedger(acctchart,acctclass) {

    let today = new Date().toISOString().split("T")[0]

    $("#today").val(today);

    $("table").hide();
    $("#acctno").focus(); 

    let acctChart = acctchart.filter(function(arr) {
      return arr[0].length === 4;
    });

    let sugChart = [];
    for(let prop in acctChart) {
      sugChart.push({
        value: acctChart[prop][0] + " " + acctChart[prop][1],
        data: acctChart[prop][1]
      })     
    }
    //console.log("sugChart: ",sugChart);

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
        $("#submit").prop("disabled",false);
        $("#dr").focus();
      }
    });

    $("#acctno").on("keypress",function() {
      $("#submit").prop("disabled",false);
      $("#acctno").removeClass('danger');
      $('#acctname').removeClass('danger');
      $("#errmsg1").text('');
      $("#errmsg2").text('');
    });

    $("#acctno").on("blur",function(e) {
       let prop = $(this).val();
         if (!acctclass[prop]) {
          $(this).val("");
          $("#acctname").val("");
        }
        else {
          $("#acctname").val(acctclass[prop][0].acctname);
          $("#acctno").removeClass('danger');
          $('#acctname').removeClass('danger');
          $("#errmsg1").text('');
          $("#errmsg1").text('');
          $("#dr").focus();
        }
    });

    $("#acctname").on("focus",function() {
      $("#dr").focus();
    })

    $("#dr").on("keypress",function() {
       $("#dr").removeClass('danger');
       $("#cr").removeClass('danger');
       $("#errmsg1").text('');
       $("#errmsg2").text('');
    })

    $("#cr").on("keypress",function() {
       $("#dr").removeClass('danger');
       $("#cr").removeClass('danger');
       $("#errmsg1").text('');
       $("#errmsg2").text('');
    })

    let tempArr = [];
    
    $('#submit').on('click', function() {
  
      let createacctno = $('#acctno').val().trim();
      let createacctname = $('#acctname').val().trim();
      let createdr = $('#dr').val().trim();
      let createcr = $('#cr').val().trim();
      let createref = $('#ref').val().trim();
      let createdate = $('#today').val();
      if (!createacctno) {
        $("#acctno").addClass("danger");
        $("#errmsg1").text('科目代號不可空白');
        return false;
      }
      else {
        if (!acctclass[createacctno]) {
          $("#acctno").addClass("danger");
          $("#errmsg1").text('查無科目代號');
          return false;
        }
      }

      if (!createdr && !createcr) {
       $("#dr").addClass('danger'); 
       $("#cr").addClass('danger'); 
       $("#errmsg1").text('借貸必須輸入其一');
        return false;
      }

      if (createdr && createcr) {
        $("#cr").val('');
        $("#dr").val(''); 
        $("#dr").addClass('danger'); 
        $("#cr").addClass('danger'); 
        $("#errmsg1").text('借貸只可輸入其一');
        return false;
      }

     //validation ok
      $("#errmsg1").text('');
      $("#submit").prop("disabled",true);
      $("#save").prop("disabled",false);

      let id = 0;
      let ttldr = 0;
      let ttlcr = 0;
      //
      if (tempArr.length === 0) {
        id = 0;
      }
      else {
       id = tempArr[tempArr.length-1]["id"] + 1;
     }
     
     let obj = {
      date: createdate,
      acctno: createacctno,
      acctname: createacctname,
      dr: createdr,
      cr: createcr,
      reference: createref,
      id: id,
      cindex: "index" + id
    };
    
    tempArr.push(obj);
    ttldr += +createdr;
    ttlcr += +createcr;
    $("table").show();
     renderTable();
    });

    $('table').on('click', '.update-button', function(e) {
      
      let rowEl = $(this).closest('tr');     
      let acctnoEl = rowEl.find('.acctno');
      let acctnameEl = rowEl.find('.acctname');
      let drEl = rowEl.find('.dr');
      let crEl = rowEl.find('.cr');
      
      let newacctno = rowEl.find('.acctno').val().trim();
      let newacctname = rowEl.find('.acctname').val().trim();
      let newdr = rowEl.find('.dr').val().trim();
      let newcr = rowEl.find('.cr').val().trim();
      let newref = rowEl.find('.ref').val();
      let cindex = rowEl.find('.index').text();   
     
      if (!newacctno) {
        rowEl.find('.acctno').addClass("danger");
        $("#errmsg2") .css({fontSize:"0.8em",color:"red"}) .text('代號不可空白');
        return false; 
      }
      else {
        if (!acctclass[newacctno]) {
          newacctno = "";
          newacctname = "";
          rowEl.find('.acctno').addClass("danger");
          $("#errmsg2") .css({fontSize:"0.8em",color:"red"}) .text('查無科目代號');
          return false;
        }
        else {
          rowEl.find('.acctname').val(acctclass[newacctno][0].acctname)
          newacctname = acctclass[newacctno][0].acctname;
        }
      }
     
      if (!newdr && !newcr) {
        rowEl.find('.cr').val('');
        rowEl.find('.dr').val('');
        rowEl.find('.dr').addClass("danger");
        rowEl.find('.cr').addClass("danger");
        $("#errmsg2").text('借貸必須輸入其一');
        return false;     
      }
      if (newdr && newcr) {
        rowEl.find('.cr').val('');
        rowEl.find('.dr').val('');
        rowEl.find('.dr').addClass("danger");
        rowEl.find('.cr').addClass("danger");
        $("#errmsg2").text('借貸借貸只可輸入其一');
        return false;     
      }

      //update validation ok
      rowEl.find('.acctno').removeClass("danger");
      rowEl.find('.dr').removeClass("danger");
      rowEl.find('.cr').removeClass("danger");
      $("#errmsg2").text('');

      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].cindex === cindex) {
          tempArr[i].acctno = newacctno;
          tempArr[i].acctname = newacctname;
          tempArr[i].dr = newdr;
          tempArr[i].cr = newcr;
          tempArr[i].reference = newref;
          break;
        }
      } 
      renderTable();
      //console.log("update tempArr ",tempArr)
    });

    $('table').on('click', '.delete-button', function() {
      $("#msg").hide();
      let rowEl = $(this).closest('tr');      
      let cindex = rowEl.find('.index').text();   
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].cindex === cindex) {
         tempArr.splice(i,1);
         break;
       }
     } 
     renderTable();
   });

   
   function renderTable() {
      $('#acctno').val("");   
      $('#acctname').val("");   
      $('#dr').val("");    
      $('#cr').val("");   
      $('#ref').val("");   
      $('#acctno').focus();
      let tbodyEl = $('tbody');
      tbodyEl.html('');
      tempArr.forEach(function(obj) {
        $("<tr>") 
        .append($("<td>")
          .append($("<input>").attr({type:"text",class:"acctno"}).val(obj.acctno))
          )
        .append($("<td>")
          .append($("<input>").attr({type:"text",class:"acctname"}).prop("readonly",true).val(obj.acctname))
          )
        .append($("<td>")
          .append($("<input>").attr({type:"number",class:"dr"}).val(obj.dr))
          ) 
        .append($("<td>")
          .append($("<input>").attr({type:"number",class:"cr"}).val(obj.cr))
          )                          
        .append($("<td>")
          .append($("<input>").attr({type:"text",class:"ref"}).val(obj.reference))
          ) 
        .append($("<td>")
          .append($("<button>").attr({class:"update-button btn btn-success"}).text("修改"))
          )
        .append($("<td>")
          .append($("<button>").attr({class:"delete-button btn btn-danger"}).text("刪除"))
          )
        .append($("<td>").attr({class:"index"}).css("color","rgba(0,0,0,0)").text(obj.cindex))              
        .appendTo($('tbody'))
      }); 
    }

    $("#save").on("click", async function() {
     
      $("table").show();

      renderTable();

      let drttl = 0;
      let crttl = 0;

      tempArr.forEach(function(obj) {
       drttl += +obj.dr;
       crttl += +obj.cr;
      })

     if (drttl !== crttl ) {
        $("#errmsg2").text('借貸不平衡');
        return false;
      }
      

      //validation ok post  data to server
      let res = await fetch("/ledger", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ arrOfobj: tempArr })
      })
      let txt = await res.text();
      console.log(txt)
      tempArr = [];
      renderTable();
      $("#acctno").focus();

    }) //end of save on click

  } //end of processLedger
  
}) //end of $(function())