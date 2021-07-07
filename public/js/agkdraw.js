//Print ledger accounts etc.
let pro = "acctno";  //set first property of object to be sorted
let pro2 = "date";  //set second property of object to be sorted

/*
//test d3 scale
var xScale = d3.scale.log().domain([10, 10000]).range([1,4])
let x1 = xScale(10)
console.log("x1",x1)
let x2 = xScale(100)
console.log("x2",x2)
let x3 = xScale(1000)
console.log("x3",x3)
let x4 = xScale(10000)
console.log("x4",x4)
//
*/

$(function(){
 $("<a>").attr({id:"return",title:"返回首頁"})
    .css({color: "rgb(0,0,255)"})
    .text("\u21B6").appendTo('body');
    $("#return").on("click",function() {
      $(this).attr("href","/")
    })

  //printLedgerAcct();
 // printTrialBalance();
printByIdx();
})

function printLedgerAcct() {
  $.getJSON("ledgeragk.json",function(jsonArr){ 

    jsonArr.sort(sortascend);
    console.log("jsonArr sorted by acctno+date: ",jsonArr)
    let acctObj = jsonArr.reduce(function(acctobj,obj) {
     acctobj[obj.acctno] = acctobj[obj.acctno] || [];
     acctobj[obj.acctno].push(
      {acctname: obj.acctname,dr:obj.dr,cr:obj.cr,date:obj.date}
      )
     return acctobj; 
   }, {});
    console.log("acctObj reduced from jsonArr: ",acctObj)
    $("<h2>").text("總帳目").css({textAlign: "center"}).appendTo('body');   
    $("<br>").appendTo('body');

    for (let i in acctObj) {

      $("<h4>").text("科目: " + i + '  ' + acctObj[i][0].acctname).css({position:"relative",left: 268})
      .appendTo('body')

      $("<table>").attr({class: "table table-bordered table-striped text-center"})
      .append($("<thead>").attr({class: "thead-light"})
        .append($("<tr>")
          .append($("<th>").text("日期"))
          .append($("<th>").text("借"))    
          .append($("<th>").text("貸"))
          )
        )
      .append($("<tbody>").attr({id:function() { return "tbody" + i }}))
      .appendTo('body')

      let id = "#" + "tbody" + i;
      let tbody = $(id);
      let drttl = 0;
      let crttl = 0;
      acctObj[i].forEach(function(obj) {
        let dr = "";
        let cr = "";
        if (obj.dr) {
          drttl = drttl + obj.dr;
          dr = formatAmount(obj.dr);
        }

        if (obj.cr) {
          crttl = crttl + obj.cr;
          cr = formatAmount(obj.cr)
        }

        $("<tr>")                         
        .append($("<td>")   
         .append($("<input>").attr({type:"text"}).css({textAlign:"center"}).val(obj.date))
         )
        .append($("<td>") 
         .append($("<input>").attr({type:"text"}).css({textAlign:"center"}).val(dr))
         )
        .append($("<td>")
         .append($("<input>").attr({type:"text"}).css({textAlign:"center"}).val(cr))
         )              
        .appendTo(tbody);

      })
      let cdrbal = "";
      let ccrbal = "";
      let bal = drttl - crttl;
      if (bal > 0) {
        cdrbal = formatAmount(bal)
      }
      if (bal < 0) {
        bal = Math.abs(bal)
        ccrbal = formatAmount(bal)
      }

      $("<tr>")                         
      .append($("<td>")   
       .append($("<input>").attr({type:"text"}).css({textAlign:"center"}).val("結餘"))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text"}).css({textAlign:"center"}).val(cdrbal))
       )
      .append($("<td>")
       .append($("<input>").attr({type:"text"}).css({textAlign:"center"}).val(ccrbal))
       )              
      .appendTo(tbody);

      $("<br>").appendTo("body");
    }

  });  

}


function printTrialBalance() {
  $.getJSON("ledge.json",function(jsonArr){ 

    jsonArr.sort(sortascend);
    let acctObj = jsonArr.reduce(function(acctobj,obj) {
     acctobj[obj.acctno] = acctobj[obj.acctno] || [];
     acctobj[obj.acctno].push(
      {acctname: obj.acctname,dr:obj.dr,cr:obj.cr,date:obj.date}
      )
     return acctobj; 
   }, {});

    let  totalAcctArr = [];
    for (let i in acctObj) {
      let tempobj = {};
      let nc = i.substr(0,1);
      let actclass = "";
      let printorder = '';
      switch(nc) {   
        case "1" :
        actclass = "asset";
        printorder = "1";
        break;
        case "2" :
        actclass = "liability";
        printorder = "2";
        break;
        case "3" :
        actclass = "net";
        printorder = "3";
        break;
      }
      tempobj.acctname = acctObj[i][0].acctname;
      let drttl = 0;
      let crttl = 0;
      acctObj[i].forEach(function(arr,index) {
        if (acctObj[i][index].dr) {
          drttl = drttl + acctObj[i][index].dr;
        }
        if (acctObj[i][index].cr) {
          crttl = crttl + acctObj[i][index].cr;
        }  
        let diff = drttl - crttl;
        let drbal = 0;
        let crbal = 0;
        if (diff > 0) { 
          drbal = diff;
        }
       if (diff < 0) { 
          crbal = Math.abs(diff);
        }
        tempobj.drttl = drbal;
        tempobj.crttl = crbal;
//        
        tempobj.actclass = actclass;
        tempobj.printorder = printorder;
      })
      totalAcctArr.push(tempobj)    
    }

    console.log("totalAcctArr converted from acctObj",totalAcctArr);
    $("<h2>").text("試算表").css({textAlign: "center"}).appendTo('body');   
    $("<br>").appendTo('body');

    $("<table>").attr({class: "table table-bordered table-striped text-center"})
    .append($("<thead>").attr({class: "thead-light"})
      .append($("<tr>")
        .append($("<th>").text("科目"))
        .append($("<th>").text("借"))    
        .append($("<th>").text("貸"))

        )
      )
    .append($("<tbody>").attr({id:"tbody"}))
    .appendTo('body')

    let totaldr = 0;
    let totalcr = 0;
    totalAcctArr.forEach(function(obj) {
      let dr = "";
      let cr = "";
      if (obj.drttl) {
        totaldr += obj.drttl;
        dr = formatAmount(obj.drttl);
      }

      if (obj.crttl) {
        totalcr += obj.crttl;
        cr = formatAmount(obj.crttl);
      }

      $("<tr>")                         
      .append($("<td>")  
       .append($("<input>").attr({type:"text",class:"date"}).css({textAlign:"center"}).val(obj.acctname))
       )
      .append($("<td>") 
        .append($("<input>").attr({type:"text",class:"dr"}).css({textAlign:"center"}).val(dr))
        )
      .append($("<td>")
       .append($("<input>").attr({type:"text",class:"cr"}).css({textAlign:"center"}).val(cr))
       )              
      .appendTo($("#tbody"));

    })
    let diff = totalcr - totaldr;
    let netmame = '';
    
    let cdrdiff = '';
    let ccrdiff = '';

    if (diff > 0) {
      totaldr = totaldr + diff;
      cdrdiff = formatAmount(diff);
      netname = '盈利';
    }

    if (diff < 0) { 
      diff = Math.abs(diff);
      totalcr = totalcr + diff;
      ccrdiff = formatAmount(diff);
      netname = '虧損';
    }
    
    if (diff !== 0)  {

     $("<tr>")                         
     .append($("<td>")  
       .append($("<input>").attr({type:"text",class:"date"}).css({textAlign:"center"}).val(netname))
       )
     .append($("<td>") 
      .append($("<input>").attr({type:"text",class:"dr"}).css({textAlign:"center"}).val(cdrdiff))
      )
     .append($("<td>")
       .append($("<input>").attr({type:"text",class:"cr"}).css({textAlign:"center"}).val(ccrdiff))
       )              
     .appendTo($("#tbody"));

   }

   let ctotaldr = formatAmount(totaldr);
   let ctotalcr = formatAmount(totalcr);

   $("<tr>")                         
   .append($("<td>")   
     .append($("<input>").attr({type:"text",class:"date"}).css({textAlign:"center"}).val("總計"))
     )
   .append($("<td>") 
    .append($("<input>").attr({type:"text",class:"dr"}).css({textAlign:"center"}).val(ctotaldr))
    )
   .append($("<td>")
     .append($("<input>").attr({type:"text",class:"cr"}).css({textAlign:"center"}).val(ctotalcr))
     )              
   .appendTo($("#tbody"));
   $("<br>").appendTo("body")
   
 });  

}


function getTotalByAcctNo(jsonArr) {
  jsonArr.sort(sortascend); 
  console.log("jsonArr sorted by Acct no", jsonArr) 
  let acctObj = jsonArr.reduce(function(acctobj,obj) {
   acctobj[obj.acctno] = acctobj[obj.acctno] || [];
   acctobj[obj.acctno].push(
    {acctname: obj.acctname,dr:obj.dr,cr:obj.cr,date:obj.date}
    )
   return acctobj; 
 }, {});
  console.log("AcctNoObj reduced from jsonArr ",acctObj);
  let  ttlarr = [];
  for (let i in acctObj) {
    let tempobj = {};
    let nc = i.substr(0,1);
    let actclass = "";
    let printorder = '';
    switch(nc) {   
      case "1" :
      actclass = "asset";
      printorder = "1";
      break;
      case "2" :
      actclass = "liability";
      printorder = "2";
      break;
      case "3" :
      actclass = "net";
      printorder = "3";
      break;
    }
    tempobj.acctno = i;
    let drttl = 0;
    let crttl = 0;
    acctObj[i].forEach(function(arr,index) {
      if (acctObj[i][index].dr) {
        drttl = drttl + acctObj[i][index].dr;
      }
      if (acctObj[i][index].cr) {
        crttl = crttl + acctObj[i][index].cr;
      }    
      tempobj.drttl = drttl;
      tempobj.crttl = crttl;
      tempobj.actclass = actclass;
      tempobj.printorder = printorder;
    })
    ttlarr.push(tempobj)    
  }
  return ttlarr;
}

/*
function sortByIdx(a, b){
  let aIdx = a.idx;
  let bIdx = b.idx;
  return ((aIdx < bIdx) ? -1 : ((aIdx > bIdx) ? 1 : 0));
}

*/
function printByIdx() {

  $.getJSON("treeData.json",function(jsonArr){ 
    jsonArr.sort(function(a,b) {
        let aIdx = a.idx+a.date;
        let bIdx = b.idx+b.date;
         return ((aIdx < bIdx) ? -1 : ((aIdx > bIdx) ? 1 : 0));
    });  
    console.log(jsonArr)  
    let idxObj = jsonArr.reduce(function(idxobj,obj) {
     idxobj[obj.idx] = idxobj[obj.idx] || [];
     idxobj[obj.idx].push(
      {name:obj.name,parent:obj.parent,date:obj.date}
      )
     return idxobj; 
   }, {});

    for (let i in idxObj) {
      $("<h4>").text("引導: " + i ).css({position:"relative",left: 248,fontWeight:"bold"})
      .appendTo('body')
      $("<table>").attr({class: "table table-bordered table-striped text-center"})
      .append($("<thead>").attr({class: "thead-light"})
        .append($("<tr>")
          .append($("<th>").text("球號"))
          .append($("<th>").text("註冊日期"))    
          .append($("<th>").text("安置"))
          )
        )
      .append($("<tbody>").attr({id:function() { return "tbody" + i }}))
      .appendTo('body')

      let id = "#" + "tbody" + i;
      let tbody = $(id)

      idxObj[i].forEach(function(obj) {

        $("<tr>")
        .append($("<td>").css({textAlign:"center"})
         .append($("<input>").attr({type:"text",class:"date"}).prop("readonly",true)
  .css({textAlign:"center",fontWeight:"bold",fontSize:"16px"}) .val(obj.name))
         )
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"dr"}).prop("readonly",true)
    .css({textAlign:"center",fontWeight:"bold",fontSize:"16px"}).prop("readonly",true)
 .val(obj.date))
         )
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"cr"}).prop("readonly",true)
  .css({textAlign:"center",fontWeight:"bold",fontSize:"16px"}) .val(obj.parent))
         )              
        .appendTo(tbody);

      })
    }

  }); 


}

function sortascend(a,b) {
  let aPro = "";
  let bPro = "";

  if (pro && pro2) {
    aPro = a[pro] + a[pro2];
    bPro = b[pro] + b[pro2];
  }
  else {
    aPro = a[pro];
    bPro = b[pro];
  }
  
  return ((aPro < bPro) ? -1 : ((aPro > bPro) ? 1 : 0));
}

function sortdescend(a,b) {
  let aPro = "";
  let bPro = "";

  if (pro && pro2) {
    aPro = a[pro] + a[pro2];
    bPro = b[pro] + b[pro2];
  }
  else {
    aPro = a[pro];
    bPro = b[pro];
  }
  
  return ((aPro < bPro) ? 1 : ((aPro > bPro) ? -1 : 0));
}


function formatAmount(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}   
function sortByAcctno(a, b) {
  let aAccctno = a.acctno;
  let bAccctno = b.acctno;
  return ((aAccctno < bAccctno) ? -1 : ((aAccctno > bAccctno) ? 1 : 0));
}


function sortByIdx(a, b){
  let aIdx = a.idx;
  let bIdx = b.idx;
  return ((aIdx < bIdx) ? -1 : ((aIdx > bIdx) ? 1 : 0));
}


function sortByParent(a, b){
  let aParent = a.parent;
  let bParent = b.parent;
  return ((aParent < bParent) ? -1 : ((aParent > bParent) ? 1 : 0));
}


