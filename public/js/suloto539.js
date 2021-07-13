//print winning numbers statistic summary
$(function() {
  let filterarr = loto539.filter(function(obj) {
    return obj["summary"];
  })
  
  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")  
  })
  $("<br>").appendTo('body');

  renderTable(filterarr);

})


function renderTable(arrofnum) {

  let begdate = arrofnum[0].date;
  let yyyyb = begdate.substr(0,4);
  let mmb = begdate.substr(5,2);
  let ddb = begdate.substr(8,2);
  begdate = yyyyb + "/" + mmb + "/" + ddb;
  let enddate = arrofnum[arrofnum.length-1].date;
  let yyyye = enddate.substr(0,4);
  let mme = enddate.substr(5,2);
  let dde = enddate.substr(8,2);
  enddate = yyyye + "/" + mme + "/" + dde;
  let dateperiod = enddate + " - " + begdate;
  $("<h4>").text("今彩539統計分析").css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');
  $("<h5>").text(dateperiod).css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');
  $("<br>").appendTo('body');

  $("<table>").css({width:"100% !important",margin:"auto"})
  .append($("<thead>")  .css({textAlign:"center",fontWeight:"bold"}) 
    .append($("<tr>")
      .append($("<th>").text("號碼")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
      .append($("<th>").text("dif<0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("dif0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("dif1")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("dif2")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("dif>2")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("min<0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("min=0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("min>0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("max<0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("max=0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("max>0")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("int1")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("int2")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("int3")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
      .append($("<th>").text("3<int<16")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
      .append($("<th>").text("int>=16")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
    
      )
    )
  .append($("<tbody>").attr({id:"tbody" }))
  .appendTo('body');

  let numArr = [],max = 40;
  for (let i = 1; i < max ; i++) {
    let n = i;
    if (n < 10) { 
     n = "0" + n;
   }else {
     n = String(n);
   }
   numArr.push(n);
  }

  let ttldifn = 0,ttldif0 = 0,ttldif1 = 0,ttldif2 = 0,ttldif3 = 0,ttldif4 = 0,
      ttlminn = 0,ttlmin0 = 0,ttlminp = 0,ttlmaxn = 0,ttlmax0 = 0,ttlmaxp = 0,
      ttlintv1 = 0,ttlintv2 = 0,ttlintv3 = 0,ttlintv4 = 0,ttlintv5 = 0,ttlintv16 = 0;

  let trArr = numArr.reduce(function(numarr,cn) {
    let difn = 0,dif0 = 0,dif1 = 0,dif2 = 0,dif3 = 0,dif4 = 0,
        minn = 0,min0 = 0,minp = 0,maxn = 0,max0 = 0,maxp = 0,
        intv1 = 0,intv2 = 0,intv3 = 0,intv4 = 0,intv5 = 0,intv16 = 0;
    arrofnum.forEach((numobj)=> {

      let summary = numobj["summary"];
      summary.forEach((obj)=> {

        let diff = obj.diff,mindiff = obj.mindiff,maxdiff = obj.maxdiff,intv = obj.intv;
         
        if (obj.num === cn) {

          switch (true) {
            case diff > 2:
            dif3++;
            break;
        
            case diff === 2:
            dif2++;
            break;

            case diff === 1:
            dif1++;
            break;

            case diff === 0:
            dif0++;
            break;

            case diff < 0:
            difn++;
            break;

            default:
            console.log("other diff " + diff);
            break;
          } //switch

          switch (true) {
            case mindiff > 0:
            minp++;
            break;

            case mindiff === 0:
            min0++;
            break;

            case mindiff < 0:
            minn++;
            break;

            default:
            console.log("other mindiff" + mindiff);
            break;

          } //switch

          switch (true) {
            case maxdiff > 0:
            maxp++;
            break;

            case maxdiff === 0:
            max0++;
            break;

            case maxdiff < 0:
            maxn++;
            break;

            default:
            console.log("other maxdiff" + maxdiff);
            break;

          } //switch

          switch (true) {

            case intv >= 16:
            intv16++;
            break;

            case intv > 3:
            intv4++;
            break;
           
            case intv === 3:
            intv3++;
            break;

            case intv === 2:
            intv2++;
            break;

            case intv === 1:
            intv1++;
            break;

            default:
            console.log("other intv" + intv);
            break;

          } //switch

        } //if 

      })//end of summary

    })//end of arrofobj

    ttldif4 = ttldif4 + dif4;
    ttldif3 = ttldif3 + dif3;
    ttldif2 = ttldif2 + dif2;
    ttldif1 = ttldif1 + dif1;
    ttldif0 = ttldif0 + dif0;
    ttldifn = ttldifn + difn;
    ttlminp = ttlminp + minp;
    ttlmin0 = ttlmin0 + min0;
    ttlminn = ttlminn + minn;
    ttlmaxp = ttlmaxp + maxp;
    ttlmax0 = ttlmax0 + max0;
    ttlmaxn = ttlmaxn + maxn;
    ttlintv16 = ttlintv16 + intv16;
    ttlintv5 = ttlintv5 + intv5;
    ttlintv4 = ttlintv4 + intv4;
    ttlintv3 = ttlintv3 + intv3;
    ttlintv2 = ttlintv2 + intv2;
    ttlintv1 = ttlintv1 + intv1;

    difn = difn ? difn : "";
    dif0 = dif0 ? dif0 : "";
    dif1 = dif1 ? dif1 : "";
    dif2 = dif2 ? dif2 : "";
    dif3 = dif3 ? dif3 : "";
    dif4 = dif4 ? dif4 : "";
    minp = minp ? minp : "";
    min0 = min0 ? min0 : "";
    minn = minn ? minn : "";
    maxp = maxp ? maxp : "";
    max0 = max0 ? max0 : "";
    maxn = maxn ? maxn : "";
    intv1 = intv1 ? intv1 : "";
    intv2 = intv2 ? intv2 : "";
    intv3 = intv3 ? intv3 : "";
    intv4 = intv4 ? intv4 : "";
    intv5 = intv5 ? intv5 : "";
    intv16 = intv16 ? intv16 : "";
    let temparr = [];
    let trarr = [];
    
    temparr.push(cn,difn,dif0,dif1,dif2,dif3,
      minn,min0,minp,maxn,max0,maxp,
      intv1,intv2,intv3,intv4,intv16
     );
    numarr.push(temparr);

    
    return numarr;

  },[]);//end of numArr reduce

  trArr.forEach((arr) => {
    
      $("<tr>").css({textAlign:"center"})                        
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[0]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[1]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[2]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[3]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[4]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[5]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[6]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[7]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[8]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[9]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[10]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[11]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[12]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[13]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[14]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(arr[15]))
       )
      .append($("<td>")   
       .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
         .val(arr[16]))
       )     
      
      .appendTo(tbody);

  })

  let ttlArr = [];
  ttlArr.push('總數',ttldifn,ttldif0,ttldif1,ttldif2,ttldif3,
    ttlminn,ttlmin0,ttlminp,ttlmaxn,ttlmax0,ttlmaxp,
    ttlintv1,ttlintv2,ttlintv3,ttlintv4,ttlintv16
    );
  
  $("<tr>").css({textAlign:"center"})                        
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[0]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[1]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[2]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[3]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[4]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[5]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[6]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[7]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[8]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[9]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[10]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[11]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[12]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[13]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[14]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
     .val(ttlArr[15]))
   )
  .append($("<td>")   
   .append($("<input>").attr({type:"text",class:"flex"}).css({width:"70px",textAlign:"center",fontWeight:"bold",color:"red"}).prop("readonly",true)
     .val(ttlArr[16]))
   )          
  .appendTo(tbody);

} //end of renderTable   
 
//print UL winning numbers statistic summary

$(function() {
  let filterarr = loto539.filter(function(obj) {
    return obj["summary"];
  });
  
  let arrofnum539 = filterarr.reduce((reduceNum,numobj)=> {
    let temparr = [];

    let date = numobj.date.substr(6,5);
    let summary = numobj.summary;
    temparr.push(date,summary);
    reduceNum.push(temparr)
    return reduceNum;
  },[]);


  renderUl(arrofnum539)

});

function renderUl(arrofnum539) {  

  let numArr = [],max = 40;
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

              arrofnum539.forEach((arr)=> {
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

  let total = arrofnum539.length;
  let mtxt = "總數: " + formatAmount(total);
  $("<li>").css({fontWeight:"bold",color:"blue"}).text(mtxt).appendTo($("#ul"));
  $("<br>").appendTo('body');

} //end of renderUl

function formatAmount(n) {
     return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }  