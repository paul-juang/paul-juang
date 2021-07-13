//print winning numbers statistic summary
$(function() {
  let filterarr = loto649.filter(function(obj) {
    return obj["summary"];
  })
  let n = filterarr.length;
  let arrofobj = loto649.slice(0,n);
  console.log(arrofobj);

  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")  
  })
  $("<br>").appendTo('body');

  renderTable(arrofobj);

})


function renderTable(objarr) {
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
  let dateperiod = enddate + " - " + begdate;
  $("<h4>").text("大樂透中獎統計").css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');
  $("<h5>").text(dateperiod).css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');
  $("<br>").appendTo('body');

  
    $("<table>").css({width:"100% !important",margin:"auto"})
    .append($("<thead>")  .css({textAlign:"center",fontWeight:"bold"}) 
      .append($("<tr>")
        .append($("<th>").text("日期")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
        .append($("<th>").text("號碼")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
        .append($("<th>").text("差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
        .append($("<th>").text("min差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
        .append($("<th>").text("max差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
        .append($("<th>").text("間距")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
        .append($("<th>").text("估計機率")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
        )
      )
    .append($("<tbody>").attr({id:"tbody" }))
    .appendTo('body');

  objarr.forEach(function(obj,index) {
    
    let mdate = obj.date;
    obj.summary.forEach(function(obj) {
      let colordiff = "blue";
      let colordmindiff = "blue";
      let colormaxdiff = "blue";
      let colorp = "blue";
 
      if (obj.diff < 0) {
        colordiff = "red";
      }

      if (obj.maxdiff < 0) {
        colormaxdiff = "red";
      }

      if (obj.mindiff < 0) {
        colordmindiff = "red";
      }

      if (obj.p > 0.89) {
        colorp = "red";
      }

      $("<tr>").css({textAlign:"center"})                        
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"160px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(mdate))
       )
      .append($("<td>")   
       .append($("<input>") .attr({type:"text",class:"flex"}).css({width:"160px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(obj.num))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"160px",textAlign:"center",fontWeight:"bold",color:colordiff}).prop("readonly",true)
         .val(obj.diff))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"160px",textAlign:"center",fontWeight:"bold",color:colordmindiff}).prop("readonly",true)
         .val(obj.mindiff))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"160px",textAlign:"center",fontWeight:"bold",color:colormaxdiff}).prop("readonly",true)
         .val(obj.maxdiff))
       )
      .append($("<td>")   
       .append($("<input>") .attr({type:"text",class:"flex"}).css({width:"160px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(obj.intv))
       )
      .append($("<td>")
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"160px",textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
         .val(obj.p))
       )              
      .appendTo(tbody);
    })

  })

}

//print UL winning numbers statistic summary

$(function() {
  let filterarr = loto649.filter(function(obj) {
    return obj["summary"];
  });
  
  let arrofnum649 = filterarr.reduce((reduceNum,numobj)=> {
    let temparr = [];

    let date = numobj.date.substr(6,5);
    let summary = numobj.summary;
    temparr.push(date,summary);
    reduceNum.push(temparr)
    return reduceNum;
  },[]);


  renderUl(arrofnum649)

});

function renderUl(arrofnum649) {  

  let numArr = [],max = 50;
  for (let i = 1; i < max ; i++) {
    let n = i;
    if (n < 10) { 
     n = "0" + n;
   }else {
     n = String(n);
   }
   numArr.push(n);
 }

console.log("numArr:",numArr);
let uiArr = numArr.reduce(function(numarr,cn) {

              let count = 0;
              let datearr = [];

              arrofnum649.forEach((arr)=> {
                 let date = arr[0];
                 let summary = arr[1];


                 summary.forEach((obj)=>{
                   if (obj.num === cn) {
                    count += 1;
                    datearr.push(date);
                   }
                 })
 
              })
              let temparr = [];  
              temparr.push(cn,count,datearr);
              numarr.push(temparr)
              return numarr;

},[])


console.log("uiArr:",uiArr);

$("<br>").appendTo('body');

$("<label>").css({fontWeight:"bold",color:"blue"}).text("備註:").appendTo('body');

$("<ul>").attr({id: "ul"}).appendTo('body');

uiArr.forEach((arr)=>{
  let num = arr[0];
  let count = arr[1];
  let date = arr[2].join(',');
  
    if (count < 10) {
      ccount = String(count) + "\u2002";
    }else{
      ccount = String(count);
    }

    let mtxt = num + "  次數:  " + ccount  + "  日期: " + date;
      
    $("<li>").css({fontWeight:"bold",color:"blue"}).text(mtxt).appendTo($("#ul"));

  })
  let total = arrofnum649.length;
  let mtxt = "總數: " + formatAmount(total);
  $("<li>").css({fontWeight:"bold",color:"blue"}).text(mtxt).appendTo($("#ul"));
  $("<br>").appendTo('body');

} //end of renderUl

function formatAmount(n) {
     return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }  

