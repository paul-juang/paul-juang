//print winning numbers statistic summary
$(function() {
  let filterarr = loto539.filter(function(obj) {
    return obj["summary"];
  })
  let n = filterarr.length;
  let arrofobj = loto539.slice(0,n);
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

  $("<h4>").text("今彩539中獎號碼摘要").css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');
  $("<h5>").text(dateperiod).css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');;

  $("<br>").appendTo('body');

  objarr.forEach(function(obj,index) {
    $("<h5>").text("中獎號碼: "+ obj.lotonum.join(' ') + "  日期: "+obj.date)
    .css({textAlign:"center",fontSize:"1.2em",fontWeight:"bold",color:"red"})
    .appendTo('body');

    $("<table>").css({width:"100% !important",margin:"auto"})
    .append($("<thead>")  .css({textAlign:"center",fontWeight:"bold"}) 
      .append($("<tr>")
        .append($("<th>").text("號碼")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
        .append($("<th>").text("差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
        .append($("<th>").text("min差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
        .append($("<th>").text("max差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
        .append($("<th>").text("間距")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
        .append($("<th>").text("估計機率")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
        )
      )
    .append($("<tbody>").attr({id:function() { return "tbody" + index }}))
    .appendTo('body');
    let id = "#" + "tbody" + index;
    let tbody = $(id);

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
       .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(obj.num))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colordiff}).prop("readonly",true)
         .val(obj.diff))
       )
     
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colordmindiff}).prop("readonly",true)
         .val(obj.mindiff))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colormaxdiff}).prop("readonly",true)
         .val(obj.maxdiff))
       )
     
      .append($("<td>")   
       .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(obj.intv))
       )
      .append($("<td>")
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
         .val(obj.p))
       )              
      .appendTo(tbody);
    })
  $("<br>").appendTo('body');

  })

}
