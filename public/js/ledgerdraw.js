//last update 07/14/2020

document.addEventListener("DOMContentLoaded", () => {
  afetch("/getacct")
})


//functions
async function afetch(url) {
  const json = await fetch(url);
  const obj = await json.json()
  const arrofaccts = obj.data
  sortarr(arrofaccts)
  let acctObj = reducearr(arrofaccts)
  let dateperiod = getDate(arrofaccts);
  console.log("acctObj", acctObj)
  console.log("dateperiod", dateperiod)
  printLedgerAcct(acctObj, dateperiod);
}

function sortarr(arr) {
  arr.sort((a, b) => {
    aPro = a.acctno + a.date;
    bPro = b.acctno + b.date;
    return ((aPro < bPro) ? -1 : ((aPro > bPro) ? 1 : 0));
  });
}

function reducearr(arr) {
  let acctObj = arr.reduce(function(acctobj,obj) {
   acctobj[obj.acctno] = acctobj[obj.acctno] || [];
   acctobj[obj.acctno].push(
   {
    acctno: obj.acctno,
    acctname: obj.acctname,
    dr:obj.dr,
    cr:obj.cr,
    date:obj.date
  }
  )
   return acctobj; 
  }, {});
  for (let i in acctObj) {

   let drttl = 0;
   let crttl = 0;

   acctObj[i].forEach(function(obj) {

     if (obj.dr) {
       drttl = drttl + obj.dr;
     }

     if (obj.cr) {
       crttl = crttl + obj.cr;
     }

   })

   let bal = drttl - crttl;
   if (bal > 0) {
     drbal = bal;
     acctObj[i].push(
      {
       acctname: "",
       dr: drbal, 
       cr: null,
       date: "結餘"
      }
     )
   }

   if (bal < 0) {
     bal = Math.abs(bal)
     crbal = bal;
     acctObj[i].push(
      {
       acctname: "",
       dr: null,
       cr: crbal,
       date: "結餘"
      }
     )
   }
  } 
  return acctObj;
}

function getDate(objarr) {
    let begdate = objarr[0].date;
    let yyyyb = begdate.substr(0,4);
    let mmb = begdate.substr(5,2);
    let ddb = begdate.substr(8,2);
    begdate = yyyyb + "/" + mmb + "/" + ddb;
    let enddate = objarr[objarr.length-1].date;
    let yyyye = enddate.substr(0,4);
    let mme = enddate.substr(5,2);
    let dde = enddate.substr(8,2);
    enddate = yyyye + "/" + mme + "/" + dde;
    return begdate + " - " + enddate;  
  }

function printLedgerAcct(acctObj,dateperiod) {
    $("<a>").attr({id:"return",title:"返回首頁"})
    .css({color: "rgb(0,0,255)"})
    .text("\u21B6").appendTo('body');
    $("#return").on("click",function() {
      $(this).attr("href","/")
    })
    let date = dateperiod;
    $("<h5>").text("日期: " + date).css({textAlign: "center"})
    .appendTo('body');
    $("<h4>").text("總帳目表").css({textAlign: "center"})
    .appendTo('body');  
    
    for (let i in acctObj) {

      $("<h5>").text("科目: " + i + '  ' + acctObj[i][0].acctname).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})
      .appendTo('body');

     $("<table>").css({width:"100% !important",margin:"auto"})
      .append($("<thead>")  .css({textAlign:"center",fontWeight:"bold"}) 
        .append($("<tr>")
          .append($("<th>").text("日期")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
          .append($("<th>").text("借")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
          .append($("<th>").text("貸")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
          )
        )
      .append($("<tbody>").attr({id:function() { return "tbody" + i }}))
      .appendTo('body');
      let id = "#" + "tbody" + i;
      let tbody = $(id);
      acctObj[i].forEach(function(obj) {
        let dr = "";
        let cr = "";
        if (obj.dr) {
          dr = formatAmount(obj.dr);
        }
        if (obj.cr) {
          cr = formatAmount(obj.cr);
        }
        let color = "";
        if (obj.date === "結餘" ) {
          color = "blue";
        }
        $("<tr>").css({textAlign:"center"})                        
        .append($("<td>")   
         .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:color}).prop("readonly",true)
                   .val(obj.date))
         )
        .append($("<td>") 
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:color}).prop("readonly",true)
                   .val(dr))
         )
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:color}).prop("readonly",true)
                  .val(cr))
         )              
        .appendTo(tbody);
      })
      $("<br>").appendTo('body');
    }
  }

  function formatAmount(n) {
     return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }  



//old version
/*
$(function() {
  let jsonarr = ["Ledger.json","trialBalance.json","incomeStatement.json", "balanceSheet.json",  "acctclass.json","acctdate.json"];
  async.map(jsonarr,function(json,callback) {  
    fetch(json)
    .then(res => res.json())
    .then(data => callback(null,data))
    .catch(err => callback(err))       
  },
  function(err,result) {
    if (err) {
      console.log(err)
    }
    let acctObj = result[0];
    let trialBalance = result[1];
    let incomeStatement = result[2];
    let balanceSheet = result[3];
    let acctclass = result[4];
    let objarr = result[5];
    let dateperiod = getDate(objarr);
   
    printLedgerAcct(acctObj,dateperiod);
   
  })
  function getDate(objarr) {
    let begdate = objarr[0].date;
    let yyyyb = begdate.substr(0,4);
    let mmb = begdate.substr(5,2);
    let ddb = begdate.substr(8,2);
    begdate = yyyyb + "/" + mmb + "/" + ddb;
    let enddate = objarr[objarr.length-1].date;
    let yyyye = enddate.substr(0,4);
    let mme = enddate.substr(5,2);
    let dde = enddate.substr(8,2);
    enddate = yyyye + "/" + mme + "/" + dde;
    return begdate + " - " + enddate;  
  }

  function printLedgerAcct(acctObj,dateperiod) {
    $("<a>").attr({id:"return",title:"返回首頁"})
    .css({color: "rgb(0,0,255)"})
    .text("\u21B6").appendTo('body');
    $("#return").on("click",function() {
      $(this).attr("href","/")
    })
    let date = dateperiod;
    $("<h5>").text("日期: " + date).css({textAlign: "center"})
    .appendTo('body');
    $("<h4>").text("總帳目表").css({textAlign: "center"})
    .appendTo('body');  
    
    for (let i in acctObj) {

      $("<h5>").text("科目: " + i + '  ' + acctObj[i][0].acctname).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})
      .appendTo('body');

     $("<table>").css({width:"100% !important",margin:"auto"})
      .append($("<thead>")  .css({textAlign:"center",fontWeight:"bold"}) 
        .append($("<tr>")
          .append($("<th>").text("日期")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
          .append($("<th>").text("借")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
          .append($("<th>").text("貸")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
          )
        )
      .append($("<tbody>").attr({id:function() { return "tbody" + i }}))
      .appendTo('body');
      let id = "#" + "tbody" + i;
      let tbody = $(id);
      acctObj[i].forEach(function(obj) {
        let dr = "";
        let cr = "";
        if (obj.dr) {
          dr = formatAmount(obj.dr);
        }
        if (obj.cr) {
          cr = formatAmount(obj.cr);
        }
        let color = "";
        if (obj.date === "結餘" ) {
          color = "blue";
        }
        $("<tr>").css({textAlign:"center"})                        
        .append($("<td>")   
         .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:color}).prop("readonly",true)
                   .val(obj.date))
         )
        .append($("<td>") 
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:color}).prop("readonly",true)
                   .val(dr))
         )
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:color}).prop("readonly",true)
                  .val(cr))
         )              
        .appendTo(tbody);
      })
      $("<br>").appendTo('body');
    }
  }

  function formatAmount(n) {
     return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }  
  
})

*/
