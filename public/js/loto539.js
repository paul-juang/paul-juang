//for app
$(function() {
  //load loto539 from num539.js
  //console.log('loto539: ',loto539);
  
  let preset = 60;
  $("#count").val(preset);
  $("h5").hide();
  $("h6").hide();
  $("ul").hide();
  $("table").hide();

  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  $("<br>").appendTo('body');

  $("#return").on("click",function() {
    $(this).attr("href","/")
  })

  $('#get-button').on('click', function() {

   let count = $("#count").val();
   let loto5390 = loto539;

     if (count > loto5390.length) {  //if greater than total array length
      count = loto5390.length;
    }

    loto5390 = loto5390.slice(0,count);
     let rearr = [];   //revserse order of arr elements
     for (var i = loto5390.length - 1; i >= 0; i--) {
       rearr.push(loto5390[i]);
     }
     renderTable(rearr);

}); //end of onclick

  function renderTable(arrofobj) {  
    console.log("arrofobj:");
    console.log(arrofobj);
    $("#count").val(arrofobj.length); //reset $("#count") value in case > total arr length

    let begdate = arrofobj[0]["date"];
    let enddate = arrofobj[arrofobj.length - 1]["date"];

    $("h5").show();
    $("h5").text("今彩539前"+$("#count").val()+"期統計數據");
    $("h6").show();
  $("h6").text(begdate+ " - " + enddate); //日期
  $("ul").show();
  $('tbody').html('');
  $("table").show();

  let arrofarr = arrofobj.reduce((numarr,numobj)=> {
    let num = numobj.lotonum;
    numarr.push(num)
    return numarr;
  },[]);

  //console.log(arrofarr);

  let numarr = [],max = 40;
  for (let i = 1; i < max ; i++) {
    let n = i;
    if (n < 10) { 
     n = "0" + n;
   }else {
     n = String(n);
   }
   numarr.push(n);
 }

  //set p of each number appearing and mean of count in totalarr
  let p = 0, mean = 0,totalarr = arrofobj.length;
 
  p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;
 
  mean = Math.round(totalarr * p);

  let resultobj = numarr.reduce((obj,cn) => {
    let count = 0;
    let position = [];
    arrofarr.forEach((arr,index) => {
      arr.forEach((cx) => {
       if (cx === cn) {
        count += 1;
        position.push(index + 1);
            //position.push(arrofobj.length - index);

          }
        })
    })
    let tempobj = {},
    neardistance = position.length === 0 ? totalarr+1 : totalarr - position[position.length - 1]+1,
        //neardistance = position.length === 0 ? totalarr + 1 : totalarr + 1- position[0],

        deviation = count - mean;
        tempobj["count"] = count;  
        tempobj['mean'] = mean;
        tempobj["deviation"] = deviation;
        tempobj["position"] = position; //position === [] -  cn does not appear during max period
        tempobj["neardist"] = neardistance;
        tempobj["prob"] = 1 - Math.pow(1-p,neardistance);
        obj[cn] = tempobj;
        return obj;
      },{});
    //console.log(resultobj); 

    $("<tbody>").empty();
    numarr.forEach((cn) =>{
      let no = cn,
      count = resultobj[cn].count,
      mean = resultobj[cn].mean,
      diff = resultobj[cn].deviation,
      position = resultobj[cn].position.join(','),
      neardist =  resultobj[cn].neardist,
      prob =  resultobj[cn].prob;
      $("<tr>")
      .append($("<td>").attr("class","no").text(String(no)))
      .append($("<td>").attr("class","count").text(String(count)))
      .append($("<td>").attr("class","mean").text(String(mean)))
      .append($("<td>").attr("class","diff").text(String(diff)))  
      .append($("<td>").attr("class","position").text(position)) 
      .append($("<td>").attr("class","neardist").text(String(neardist)))  
      .append($("<td>").attr("class","prob").text(String(prob).substr(0,6)))
      .appendTo($('tbody'))
    })

    let diff1 = document.querySelectorAll(".diff");
    let diff2 = $(".diff")

    // set td.style.color for class diff and prob
    document.querySelectorAll(".diff").forEach(function(td) {
      let txt = td.innerHTML;
      txt = Number(txt);
      if (txt < 0) {
        td.style.color = "red";
      }
    })

    document.querySelectorAll(".prob").forEach(function(td) {
      let txt = td.innerHTML;
      txt = Number(txt);
      if (txt >= 0.90) {
        td.style.color = "red";
      }
    })

/*
    // use jquery - set td.style.color for class diff and prob
    let tddiff = $("tr .diff")
    for (let i = 0; i < tddiff.length; i++) {
      let txt = $(tddiff[i]).text();
      txt = Number(txt);
      if (txt < 0) {
        $(tddiff[i]).css("color","red")
      }
    }

    let tdprob = $("tr .prob")
    for (let i = 0; i < tdprob.length; i++) {
      let txt = $(tdprob[i]).text();
      txt = Number(txt);
      if (txt >= 0.90) {
        $(tdprob[i]).css("color","red")
      }
    }
    */   

  } //end of renderTable


  function getArrOfRandomArr(arrlength,max,totalarr) {
   var arrOfRandomArr = [];
   while(arrOfRandomArr.length !== totalarr) {
    var randomArr = [];
    while(randomArr.length !== arrlength) {
      var n = Math.floor(Math.random()*max);
      if (n > 0) {
        if (n < 10) {
          n = "0" + n;
        } else {
          n = String(n);
        }
        if (randomArr.indexOf(n) == -1) {
          randomArr.push(n);
        }
      }
    }
    randomArr.sort(function(a,b) { return a - b })
    arrOfRandomArr.push(randomArr)
  }
  return arrOfRandomArr;
}

});   //end of (function())
