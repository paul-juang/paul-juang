//load num539.js
$(function() { 
  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  $("<br>").appendTo('body');
  $("#betnum").hide();
  $("#winnum").hide();
  $("#bonus").hide();
  $("ul").hide();
  $("table").hide();

  $("#return").on("click",function() {
    $(this).attr("href","/")
  })

  $("#combstr").focus();

  $('#get-button').on('click', function() {
   renderTable();

 })

  
})

function renderTable(arrofobj) {  

  let combstr = $("#combstr").val().trim();
  let combarr = [];
  getTwo(combarr,combstr); //push num to combarr
  combarr = sortAndUnique(combarr) //sort and delete duplicate nums
  console.log("combarr",combarr);
  
  $("#betnum").css({fontSize:"2.2em", color: "blue"}).text(combarr.join(" "));
  $("#betnum").show();
  let winnum = loto539[0]["lotonum"];
  let windate = "         日期: " +loto539[0]["date"];
  let wintext = '     中獎號碼: '+ winnum.join(' ') + windate;
  $("#winnum").css({fontSize:"1.8em",color: "red"}).text(wintext);
  $("#winnum").show();
  $("#bonus").show();
  $("ul").show();
  let r = 5;
  let comb5 = k_combinations(combarr,r);
  console.log(comb5);

  let ttlwin1 = 0,ttlwin2 = 0,ttlwin3 = 0,ttlwin4 = 0,ttlwin5 = 0;
  
  let reducearr = comb5.reduce((arrofobj,arr) => {
    let anywin = 0; //任n個
    let bonuswin = 0; 
    arr.forEach((num) => {
       winnum.forEach((wnum) => {
          if (num === wnum) {    //check winnin numbers
            anywin++
          }
        })
     })
    let win1 = 0,win2 = 0,win3 = 0,win4 = 0,win5 = 0;
    switch (anywin) {
      case 5:
      win1 = 1;   //first prize
      ttlwin1++;
      break;
      case 4:     
      win2 = 1;   //second prize 
      ttlwin2++;
      break;
      case 3:
      win3 = 1;   //third prize
      ttlwin3++;
      break;
      case 2:        
      win4 = 1;   //fourth prize
      ttlwin4++;
      break;

    }

 
    let obj = {};
    let num = arr.join(" ");


    obj["num"] = num;
    obj["win1"] = win1 ? win1 : "";
    obj["win2"] = win2 ? win2 : "";
    obj["win3"] = win3 ? win3 : "";
    obj["win4"] = win4 ? win4 : "";    

    arrofobj.push(obj)
    return arrofobj;
  },[])
  console.log("reducearr",reducearr)

  $('tbody').empty();
  reducearr.forEach((obj) =>{

    $("<tr>")
    .append($("<td>").css({width: "80px"}).text(obj.num))
    .append($("<td>").css({color: "red",width: "40px"}).text(obj.win1))
    .append($("<td>").css({color: "red",width: "40px"}).text(obj.win2))
    .append($("<td>").css({width: "40px"}).text(obj.win3))
    .append($("<td>").css({width: "40px"}).text(obj.win4))
   
    .appendTo($('tbody'))
  })

  $("table").show();
  $("#combstr").val("");

  let prize1 = 8000000,prize2 = 20000,prize3 = 300,prize4 = 50;
  let cost = 50,ttlcost = 0,ttlwin=0;
  ttlcost = reducearr.length*cost;
  ttlwin = (prize1*ttlwin1)+(prize2*ttlwin2)+(prize3*ttlwin3)+(prize4*ttlwin4);


  let liarr = [];
  liarr.push("投注總數: " + reducearr.length);
  liarr.push("投注成本: " + ttlcost);
  liarr.push("頭獎: "+ ttlwin1);
  liarr.push("貳獎: "+ ttlwin2);
  liarr.push("參獎: "+ ttlwin3);
  liarr.push("肆獎: "+ ttlwin4);
  liarr.push("中獎總額: "+ ttlwin);

  document.querySelectorAll("li").forEach(function(li,index) {
    li.innerHTML = liarr[index];
  })



  } //end of renderTable


  function k_combinations(set, k) { 

    let combs = [];

    if (k > set.length || k <= 0) {
      return combs;
    }

    if (k == set.length) {
      combs = [set]
      return combs;
    }

    if (k == 1) {     
      set.forEach(function(mem) {
       combs.push([mem]);    
     })
      return combs;
    }

    
    set.forEach(function(mem,index) {
      let head = set.slice(index, index + 1);
      let tailcombs = k_combinations(set.slice(index + 1), k - 1);
      tailcombs.forEach(function(mem){
        combs.push(head.concat(mem));  
      })
    })  
    return combs;
  }


  function factorial(num) {
    return num == 1 ? 1: num * factorial(num - 1)
  }


  function getTwo(arr,str) {
    if (!str) {
      return;
    }
    let two = str.substr(0,2)
    str = str.substr(2)
    arr.push(two)
    return getTwo(arr,str);
  }

  function sortAndUnique(arr) {
    arr = arr.sort((a,b)=> a-b);
    let newarr = [];
    arr.forEach((line)=> {
      if (newarr.indexOf(line) === -1) {
        newarr.push(line);
      }
    })

      //simpler but confusing - closure created
      //let newarr = arr.filter((line, index) => {
      //     return arr.indexOf(line) == index;
      //    })
      return newarr;
    }
