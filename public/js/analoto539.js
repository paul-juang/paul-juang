//statistics of num539 winning numbers
$(function() {
  $("#return").attr({title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6") 
  
  $("#return").on("click",function() {
    $(this).attr("href","/")
  });
  $("<br>").appendTo('body');
  $("<br>").appendTo('body');

  $("<div>").attr({id:"divtable",class:"content-padding clearfix"})  
  .appendTo('body');
  
  let filterArr = loto539.filter(function(obj) {
      return obj["summary"];
    })
 
  filterArr.forEach(obj => {
    $("<option>").attr({class:"option",value:obj.date}).text(obj.date)
    .appendTo($("#selectdate"))
  })

  $("#selectdate").val("").on("change", function() {
    let arrOnChange = filterArr.filter(function(obj) {
      return obj["date"] <= $("#selectdate").val()
    })

    let begdate = arrOnChange[0].date;
    let enddate = arrOnChange[arrOnChange.length-1].date;
    let dateperiod = getDateperiod(begdate, enddate)
    let totalrecord = arrOnChange.length

    let summaryArr = arrOnChange.map(obj => obj["summary"])

    let reduceObj = summaryArr.reduce((sumObj, arr) => {

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

      }) 
      return sumObj
    }, {})

    updPcnt(reduceObj,totalrecord)
    getMaxnSum(reduceObj)
    getReport(dateperiod,totalrecord,reduceObj) 

 }) 
  
})

function getDateperiod(begDate, endDate) {
  let begdate = begDate;
  let yyyyb = begdate.substr(0,4);
  let mmb = begdate.substr(5,2);
  let ddb = begdate.substr(8,2);
  begdate = yyyyb + "/" + mmb + "/" + ddb;
  let enddate = endDate
  let yyyye = enddate.substr(0,4);
  let mme = enddate.substr(5,2);
  let dde = enddate.substr(8,2);
  enddate = yyyye + "/" + mme + "/" + dde;
  let dateperiod = enddate + " - " + begdate;
  return dateperiod;
}


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
          
          // get max
          if (reduceObj[num][pro][key]["count"] > max) {
            maxpro = key
            max = reduceObj[num][pro][key]["count"]
          }
          
        })
        
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

function getReport(dateperiod,totalrecord, reduceObj) {
 
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
          let ln = arr0.join(', ')

          numObj[num].push(ln)
        })
      
      return numObj
    }, {})
    
    $('#divtable').html("");
    $("<h4>").text("今彩539統計分析").css({textAlign: "center",color:"blue",fontWeight:"bold"})
    .appendTo($('#divtable'))
    $("<h5>").text(`${dateperiod}  共${totalrecord}期`).css({textAlign: "center",color:"blue",fontWeight:"bold"})
    .appendTo($('#divtable'))

    let keyarr = Object.keys(ulArr).sort((a, b) => a-b)

    $('<nav>').attr({class:"nav-bar"})
     .html(`

      ${keyarr.map(key => {
        
        let pernt = Math.round(ulArr[key][0]/totalrecord*100)
        return `
          <div class= "container"> 號碼:${key} 次數:${ulArr[key][0]} ${pernt}%
              <ul>
                <li>1.差數:
                   <ul>
                      <li><a> ${ulArr[key][1]}</a></li>
                   </ul>
                </li>
                <li>2.mn差數: 
                    <ul>
                      <li><a> ${ulArr[key][2]}</a></li>
                    </ul>                
                </li>
                <li>3.mx差數: 
                    <ul>
                      <li><a> ${ulArr[key][3]}</a></li>
                    </ul> 
                </li>
                <li>4.間距: 
                    <ul>
                      <li><a>${ulArr[key][4]}</a></li>
                    </ul> 
                </li>
              </ul>
          </div>
        `
        }).join('')
      }

      `
     )
     .appendTo($('#divtable'))
}



