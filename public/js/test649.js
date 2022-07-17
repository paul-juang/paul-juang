//statistics of num649 winning numbers
$(function() {
  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({position:"fixed",top:"4px",left:"10px",fontSize:"20px",
    fontWeight:"bold",color:"rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")  
  })
  $("<br>").appendTo('body');

  let filterArr = loto649.filter(obj => obj["summary"])
  console.log("filterArr", filterArr)

  let begdate = filterArr[0].date;
  let yyyyb = begdate.substr(0,4);
  let mmb = begdate.substr(5,2);
  let ddb = begdate.substr(8,2);
  begdate = yyyyb + "/" + mmb + "/" + ddb;
  let enddate = filterArr[filterArr.length-1].date;
  let yyyye = enddate.substr(0,4);
  let mme = enddate.substr(5,2);
  let dde = enddate.substr(8,2);
  enddate = yyyye + "/" + mme + "/" + dde;
  let dateperiod = enddate + " - " + begdate;
  let totalrecord = filterArr.length

  let summaryArr = filterArr.map(obj => obj["summary"])
  console.log("summaryArr", summaryArr)

  let reduceObj = summaryArr.reduce((sumObj,arr) => {
    arr.forEach(obj => {
      sumObj[obj.num] = sumObj[obj.num] || {}
      if (sumObj[obj.num]["1.count"]) {
        sumObj[obj.num]["1.count"]++
      } else {
        sumObj[obj.num]["1.count"] = 1
      }

      sumObj[obj.num]['2.diff'] = sumObj[obj.num]['2.diff'] || {}
      sumObj[obj.num]['2.diff'][obj.diff] = sumObj[obj.num]['2.diff'][obj.diff] || {}
      if (sumObj[obj.num]['2.diff'][obj.diff]["count"]) {
        sumObj[obj.num]['2.diff'][obj.diff]["count"]++
      } else {
        sumObj[obj.num]['2.diff'][obj.diff]["count"] = 1
        sumObj[obj.num]['2.diff'][obj.diff]["pcnt"] = 0
      }

      sumObj[obj.num]['3.mindiff'] = sumObj[obj.num]['3.mindiff'] || {}
      sumObj[obj.num]['3.mindiff'][obj.mindiff] = sumObj[obj.num]['3.mindiff'][obj.mindiff] || {}
      if (sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"]) {
        sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"]++
      } else {
        sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"] = 1
        sumObj[obj.num]['3.mindiff'][obj.mindiff]["pcnt"] = 0
      }

      sumObj[obj.num]['4.maxdiff'] = sumObj[obj.num]['4.maxdiff'] || {}
      sumObj[obj.num]['4.maxdiff'][obj.maxdiff] = sumObj[obj.num]['4.maxdiff'][obj.maxdiff] || {}
      if (sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"]) {
        sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"]++
      } else {
        sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"] = 1
        sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["pcnt"] = 0
      }

      sumObj[obj.num]['5.intv'] = sumObj[obj.num]['5.intv'] || {}
      sumObj[obj.num]['5.intv'][obj.intv] = sumObj[obj.num]['5.intv'][obj.intv] || {}
      if (sumObj[obj.num]['5.intv'][obj.intv]["count"]) {
        sumObj[obj.num]['5.intv'][obj.intv]["count"]++
      } else {
        sumObj[obj.num]['5.intv'][obj.intv]["count"] = 1
        sumObj[obj.num]['5.intv'][obj.intv]["pcnt"] = 0
      }

  }) //forEach
    return sumObj
  }, {})

  updPcnt(reduceObj,totalrecord)
  getMaxnSum(reduceObj)
  postnGetJson(reduceObj,dateperiod,totalrecord) 
  
})

function updPcnt(reduceObj,totalrecord) {
  let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
  Object.keys(reduceObj).sort((a,b)=> {a-b})
  .forEach(num => {
    proArr.forEach(pro => {
      Object.keys(reduceObj[num][pro]).forEach(key => {
        let ttlrec = reduceObj[num]["1.count"]
        //let pcnt1 = ttlrec/totalrecord
        let pcnt2 = reduceObj[num][pro][key]["count"]/ttlrec
        //let pcnt = pcnt1 + pcnt2
        let pcnt = pcnt2
        reduceObj[num][pro][key]["pcnt"] = pcnt
      })
    })  
  })

}


function getMaxnSum(reduceObj) {
  let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
  Object.keys(reduceObj).sort((a,b)=> a-b) //.sort((a,b)=> {a-b})
   .forEach(num => {
      let dfpro0 = 0, dfprop = 0, dfpron = 0, mnpro0 = 0, mnprop = 0, mnpron = 0, 
          mxpro0 = 0, mxprop = 0, mxpron = 0, prol = 0, proh = 0,summary = {}
      proArr.forEach(pro => {
        let maxpro = '', max = 0
        Object.keys(reduceObj[num][pro]).forEach(key => {
          let keyn = parseInt(key)
          //for summary
          /*
          if (pro === "2.diff") {
            if (keyn < 0) {
              dfpron = dfpron+reduceObj[num][pro][key]["count"]
            } else if (keyn === 0) {
              dfpro0 = dfpro0+reduceObj[num][pro][key]["count"]
            } else{
              dfprop = dfprop+reduceObj[num][pro][key]["count"]
            }
          } else if (pro === "3.mindiff") {
            if (keyn < 0) {
              mnpron = mnpron+reduceObj[num][pro][key]["count"]
            } else if (keyn === 0) {
              mnpro0 = mnpro0+reduceObj[num][pro][key]["count"]
            } else{
              mnprop = mnprop+reduceObj[num][pro][key]["count"]
            }
          } else if (pro === "4.maxdiff") {
            if (keyn < 0) {
              mxpron = mxpron+reduceObj[num][pro][key]["count"]
            } else if (keyn === 0) {
              mxpro0 = mxpro0+reduceObj[num][pro][key]["count"]
            } else{
              mxprop = mxprop+reduceObj[num][pro][key]["count"]
            }
          } else {
            if (keyn < 16) {
              prol = prol+reduceObj[num][pro][key]["count"]
            } else {
              proh = proh+reduceObj[num][pro][key]["count"]
            }
          }
          */
          // get max
          if (reduceObj[num][pro][key]["count"] > max) {
            maxpro = key
            max = reduceObj[num][pro][key]["count"]
          }
          
        })
        //for summary
        /*
        if (pro === "2.diff") {
          summary["diff"] = {}
          summary["diff"]["n"] = dfpron
          summary["diff"]["npcnt"] = Math.round(dfpron/reduceObj[num]["1.count"]*100)
          summary["diff"]["z"] = dfpro0
          summary["diff"]["zpcnt"] = Math.round(dfpro0/reduceObj[num]["1.count"]*100)
          summary["diff"]["p"] = dfprop
          summary["diff"]["ppcnt"] = Math.round(dfprop/reduceObj[num]["1.count"]*100)
        } else if (pro === "3.mindiff") {
          summary["mindiff"] = {}
          summary["mindiff"]["n"] = mnpron
          summary["mindiff"]["npcnt"] = Math.round(mnpron/reduceObj[num]["1.count"]*100)
          summary["mindiff"]["z"] = mnpro0
          summary["mindiff"]["zpcnt"] = Math.round(mnpro0/reduceObj[num]["1.count"]*100)
          summary["mindiff"]["p"] = mnprop
          summary["mindiff"]["ppcnt"] = Math.round(mnprop/reduceObj[num]["1.count"]*100)
        } else if (pro === "4.maxdiff") {
          summary["maxdiff"] = {}
          summary["maxdiff"]["n"] = mxpron
          summary["maxdiff"]["npcnt"] = Math.round(mxpron/reduceObj[num]["1.count"]*100)
          summary["maxdiff"]["z"] = mxpro0
          summary["maxdiff"]["zpcnt"] = Math.round(mxpro0/reduceObj[num]["1.count"]*100)
          summary["maxdiff"]["p"] = mxprop
          summary["maxdiff"]["ppcnt"] = Math.round(mxprop/reduceObj[num]["1.count"]*100)
        } else {
          summary["intv"] = {}
          summary["intv"]["l"] = prol
          summary["intv"]["lpcnt"] = Math.round(prol/reduceObj[num]["1.count"]*100)
          summary["intv"]["h"] = proh
          summary["intv"]["hpcnt"] = Math.round(proh/reduceObj[num]["1.count"]*100)
        }
        */
        //for max
        reduceObj[num][pro]["max"] = {}
        reduceObj[num][pro]["max"]["count"] = `( ${maxpro}:${max} )`
        reduceObj[num][pro]["max"]["maxkey"] = maxpro
        reduceObj[num][pro]["max"]["maxcount"] = max
      })
      reduceObj[num]["6.summary"] = summary
   })
}

function getMax(reduceObj) {
  let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
  Object.keys(reduceObj).sort((a,b)=> a-b) //.sort((a,b)=> {a-b})
   .forEach(num => {
      proArr.forEach(pro => {
        let maxpro = '', max = 0
        Object.keys(reduceObj[num][pro]).forEach(key => {
          let keyn = parseInt(key)
          if (reduceObj[num][pro][key]["count"] > max) {
            maxpro = key
            max = reduceObj[num][pro][key]["count"]
          }
        })
        reduceObj[num][pro]["max"] = {}
        reduceObj[num][pro]["max"]["count"] = `( ${maxpro}:${max} )`
        reduceObj[num][pro]["max"]["maxkey"] = maxpro
        reduceObj[num][pro]["max"]["maxcount"] = max
      })
   })
}

function postnGetJson(reduceObj,dateperiod,totalrecord) {
  fetch("/test649/json",
  {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({reduceObj:reduceObj})
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    getJson(dateperiod,totalrecord)
  })
  .catch(function(err){ console.log(err) })
}


function getJson(dateperiod,totalrecord) {
  $.getJSON("reduceObj.json", function(reduceObj) {
    console.log("jsonarr", reduceObj)
    
    let sortedArr = Object.keys(reduceObj).sort((a,b) => a-b)
    let ulArr = sortedArr.reduce((numObj, num) => {
      numObj[num] = numObj[num] || [];
      let ln0 = reduceObj[num]['1.count']
      numObj[num].push(ln0)

      let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
      proArr.forEach(pro => {
        let keyarr = Object.keys(reduceObj[num][pro])
        let arr0 = []
        keyarr.forEach(key => {
          let n = reduceObj[num][pro][key]['count'] 
          let cn = String(n)
          if (n < 10) cn = " "+cn
            let ln = `${key}:${cn}` 
          arr0.push(ln)
          }) 
          let ln = arr0.join(',\u2002\u2002')
          numObj[num].push(ln)
        })
      /*
      let arrx = []
      let ln1 = "差數: =0:"+ reduceObj[num]['6.summary']['diff']['z']+
                "\u2002\u2002>0:" + reduceObj[num]['6.summary']['diff']['p'] +
                "\u2002\u2002<0:" + reduceObj[num]['6.summary']['diff']['n']
      let ln2 = "mn差數: =0:"+ reduceObj[num]['6.summary']['mindiff']['z']+
                "\u2002\u2002>0:" + reduceObj[num]['6.summary']['mindiff']['p'] +
                "\u2002\u2002<0:" + reduceObj[num]['6.summary']['mindiff']['n']            
      let ln3 = "mx差數: =0:"+ reduceObj[num]['6.summary']['maxdiff']['z']+
                "\u2002\u2002>0:" + reduceObj[num]['6.summary']['maxdiff']['p'] +
                "\u2002\u2002<0:" + reduceObj[num]['6.summary']['maxdiff']['n']            
      let ln4 = "間距: <16:"+ reduceObj[num]['6.summary']['intv']['l']+
                "\u2002\u2002>=16:" + reduceObj[num]['6.summary']['intv']['h'] 
      arrx.push(ln1,ln2,ln3,ln4)
      let lnx = arrx.join(',\u2002\u2002\u2002')
      numObj[num].push(lnx)
      let arry = []
      let ln10 = "差數: =0:"+ reduceObj[num]['6.summary']['diff']['zpcnt']+"%"+
                "\u2002\u2002>0:" + reduceObj[num]['6.summary']['diff']['ppcnt'] +"%"+
                "\u2002\u2002<0:" + reduceObj[num]['6.summary']['diff']['npcnt']+"%"
      let ln20 = "mn差數: =0:"+ reduceObj[num]['6.summary']['mindiff']['zpcnt']+"%"+
                "\u2002\u2002>0:" + reduceObj[num]['6.summary']['mindiff']['ppcnt'] +"%"+
                "\u2002\u2002<0:" + reduceObj[num]['6.summary']['mindiff']['npcnt'] +"%"           
      let ln30 = "mx差數: =0:"+ reduceObj[num]['6.summary']['maxdiff']['zpcnt']+"%"+
                "\u2002\u2002>0:" + reduceObj[num]['6.summary']['maxdiff']['ppcnt'] +"%"+
                "\u2002\u2002<0:" + reduceObj[num]['6.summary']['maxdiff']['npcnt'] +"%"           
      let ln40 = "間距: <16:"+ reduceObj[num]['6.summary']['intv']['lpcnt']+"%"+
                "\u2002\u2002>=16:" + reduceObj[num]['6.summary']['intv']['hpcnt'] +"%"
      arry.push(ln10,ln20,ln30,ln40)
      let lny = arry.join(',\u2002\u2002\u2002')
      numObj[num].push(lny)
      */
      return numObj
    }, {})
    
    console.log("ulArr",ulArr)
    $("<h4>").text("大樂透統計分析").css({textAlign: "center",fontWeight:"bold",color:"blue"})
    .appendTo('body')
    $("<h5>").text(`${dateperiod}  共${totalrecord}期`).css({textAlign: "center",fontWeight:"bold",color:"blue"})
    .appendTo('body')

    Object.keys(ulArr).sort((a,b)=>a-b).forEach(key => {
      let pernt = Math.round(ulArr[key][0]/totalrecord*100)
      $("<span>").css({fontSize:"1.2rem",fontWeight:"bold",color:"blue"})
      .text(`號碼:\u2002${key}\u2002次數:${ulArr[key][0]}\u2002${pernt}%`).appendTo('body');
      $("<ul>").attr({id: "ul"}).css({fontSize:"1.2rem",fontWeight:"bold",color:"blue"})
       .append($("<li>").text(`差數:\u2002\u2002\u2002\u2002${ulArr[key][1]}`))
       .append($("<li>").text(`mn差數: ${ulArr[key][2]}`))
       .append($("<li>").text(`mx差數: ${ulArr[key][3]}`))   
       .append($("<li>").text(`間距:\u2002\u2002\u2002\u2002${ulArr[key][4]}`)) 
       /*.append($("<li>").text(`摘要:\u2002\u2002${ulArr[key][5]}`)) 
       .append($("<li>").text(`分比:\u2002\u2002${ulArr[key][6]}`)) */
      .appendTo('body')
    })

 })

}

function displayUl(reduceObj,dateperiod,totalrecord) {
  let sortedArr = Object.keys(reduceObj).sort((a,b) => a-b)
  let ulArr = sortedArr.reduce((numObj, num) => {
    numObj[num] = numObj[num] || [];
    let ln0 = reduceObj[num]['1.count']
    numObj[num].push(ln0)

    let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
    proArr.forEach(pro => {
      let keyarr = Object.keys(reduceObj[num][pro])
      let arr0 = []
      keyarr.forEach(key => {
        let n = reduceObj[num][pro][key]['count'] 
        let cn = String(n)
        if (n < 10) cn = " "+cn
          let ln = `${key}:${cn}` 
        arr0.push(ln)
        }) //keyarr.forEach
      let ln = arr0.join(',\u2002\u2002')
      numObj[num].push(ln)
      })  // proArr.forEach

    return numObj
  }, {})

  console.log("ulArr",ulArr)
  $("<h4>").text("大樂透中獎號碼統計分析").css({textAlign: "center",fontWeight:"bold",color:"blue"})
  .appendTo('body')
  $("<h5>").text(`${dateperiod}  共${totalrecord}期`).css({textAlign: "center",fontWeight:"bold",color:"blue"})
  .appendTo('body')

  Object.keys(ulArr).sort((a,b)=>a-b).forEach(key => {
    let pernt = Math.round(ulArr[key][0]/totalrecord*100)
    $("<span>").css({fontSize:"1.2rem",fontWeight:"bold",color:"blue"})
    .text(`號碼:\u2002${key}\u2002\u2002次數:\u2002${ulArr[key][0]}\u2002\u2002${pernt}%`).appendTo('body');
    $("<ul>").attr({id: "ul"}).css({fontSize:"1.2rem",fontWeight:"bold",color:"blue"})
    .append($("<li>").text(`差數:\u2002\u2002\u2002\u2002${ulArr[key][1]}`))
    .append($("<li>").text(`mn差數: ${ulArr[key][2]}`))
    .append($("<li>").text(`mx差數: ${ulArr[key][3]}`))   
    .append($("<li>").text(`間距:\u2002\u2002\u2002\u2002${ulArr[key][4]}`)) 
    .appendTo('body')  
  })
}


function displayDiv(reduceObj) {
   let sortedArr = Object.keys(reduceObj).sort((a,b) => a-b)  
   $('<div>').attr({class:"container"})
   .html(`
    <ul>
    ${sortedArr.map(num => {
      return `
      <li>號碼:${num} 共出現${reduceObj[num]["1.count"]}次
      <ul>
      <li>diff:
      <ul>
      ${Object.keys(reduceObj[num]["2.diff"])
      .map(key=>{
        return `
        <li>${key}: ${reduceObj[num]["2.diff"][key]["count"]}次</li>
        `
      }).join('')
    }
    </ul>
    </li>
    <li>mindiff:
    <ul>
    ${Object.keys(reduceObj[num]["3.mindiff"])
    .map(key=>{
      return `
      <li>${key}: ${reduceObj[num]["3.mindiff"][key]["count"]}次</li>
      `
    }).join('')
  }
  </ul>
  </li>
  <li>maxdiff:
  <ul>
  ${Object.keys(reduceObj[num]["4.maxdiff"])
  .map(key=>{
    return `
    <li>${key}: ${reduceObj[num]["4.maxdiff"][key]["count"]}次</li>
    `
  }).join('')
  }
  </ul>
  </li>
  <li>intv:
  <ul>
  ${Object.keys(reduceObj[num]["5.intv"])
  .map(key=>{
    return `
    <li>${key}: ${reduceObj[num]["5.intv"][key]["count"]}次</li>
    `
  }).join('')
  }
  </ul>
  </li>
  </ul>
  </li>
  `
  }).join('')}

    </ul>
    `)
   .appendTo('body')
}
