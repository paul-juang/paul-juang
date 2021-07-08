//for lserver
$(function() {

/*
    $("<a>").attr({id:"return",title:"返回首頁"})
    .text("\u21B6").appendTo('body');

    $("<br>").appendTo('body');

    $("#return").on("click",function() {
      $(this).attr("href","/home")
    })
*/

  let option = "649",arrleng = 6, max = 50;

$("#649").on("change",function() {
  if (this.value === "539") {
    option = "539"
    arrleng = 5;
    max = 40;
  }else {
    option = "649";
    arrleng = 6;
    max = 50;
  } 
})

 //GET
$('#get-button').on('click', function() {
    alert(option)

  $.ajax({
    url: '/lotodata/' + option,  
    contentType: 'application/json',
    success: function(response) {
             renderTable(response.arrOfLotonum);
             $('#post').hide();
             $('#check').hide();
             $('#div1').hide();
      } //sucess function
  }); //end of ajax
   
}); //end of onclick

 //post a collection of documents to database
 $("#post").on("click",function() {

  //if (option === "539") { arrleng = 5, max = 40 };

  //reduce arrofarr to an array of loto number 
  let resultarr = ((arrleng,max,totalarr,numarr) => {
    let arrofarr = getArrOfRandomArr(arrleng,max,totalarr); 
    console.log("arrofarr",arrofarr)          
    numarr = arrofarr.reduce((lotoarr,lotonum) => {
      let obj = {};
      obj['lotonum'] = lotonum;
      lotoarr.push(obj);
      return lotoarr;
    },[]);
    console.log('numarr',numarr)
    return numarr;
  }) (arrleng,max,10,[]);

  console.log(resultarr);
  $.ajax({
    url: '/lotodata/' + option,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ arrOfLotonum: resultarr }),
    success: function(response) {
      console.log(response);
    }
  });

 })



function renderTable(arrofobj) {
  //let arrleng = 0;
  //let max = 0;
  let arrofarr = arrofobj.reduce((numarr,numobj)=> {
    let num = numobj.lotonum;
    //arrleng = num.length;
    numarr.push(num)
    return numarr;
  },[]);

  console.log(arrofarr);

  let numarr = [];
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
  if (arrleng === 5) {
      p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;
    }else {
      p = 1/49 + 1/48 + 1/47 + 1/46 + 1/45 + 1/44;
    }
    mean = Math.floor(totalarr * p);

  let resultobj = numarr.reduce((obj,cn) => {
        let count = 0;
        let position = [];
        arrofarr.forEach((arr,index) => {
          arr.forEach((cx) => {
           if (cx === cn) {
            count += 1;
            position.push(index + 1);
           }
          })
        })
        let tempobj = {},
        neardistance = position.length === 0 ? totalarr : totalarr - position[position.length - 1],
        deviation = count - mean;
        tempobj["count"] = count;  
        tempobj['mean'] = mean;
        tempobj["deviation"] = deviation;
        tempobj["position"] = position; //position === [] -  cn does not appear during max period
        tempobj["neardist"] = neardistance;
        tempobj["prob"] = 1 - Math.pow(1-p,neardistance+1);
        obj[cn] = tempobj;
       return obj;
     },{});
    console.log(resultobj); 

    $("<tbody>").empty();

     numarr.forEach((cn) =>{
      let no = cn,
          count = resultobj[cn].count,
          mean = resultobj[cn].mean,
          deviation = resultobj[cn].deviation,
          position = resultobj[cn].position.join(','),
          neardist =  resultobj[cn].neardist,
          prob =  resultobj[cn].prob;
          $("<tr>")
           .append($("<td>").text(String(no)))
           .append($("<td>").text(String(count)))
           .append($("<td>").text(String(mean)))
           .append($("<td>").attr({class:"diff"}).text(String(deviation)))  
           .append($("<td>").text(position)) 
           .append($("<td>").text(String(neardist)))  
           .append($("<td>").attr({class:"prob"}).text(String(prob)))  
          .appendTo($('tbody'))
    })

    let diff1 = document.querySelectorAll(".diff");
    let diff2 = $(".diff")
    console.log("selector")
        console.log(diff1.constructor)
                console.log(diff1.length)

        console.log("query")
        console.log(diff2.constructor)
                        console.log(diff2.length)




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
