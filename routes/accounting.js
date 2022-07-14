const fs = require('fs');

const async = require("async");

const express = require('express');

const router = express.Router();

const Account = require('../models/account');//updated 07/08/2022

//home page
//router.get("/home",function(req, res) {
router.get("/",function(req, res) {
 res.render("homec");
});

//setacctchart   
router.get("/setacctchart",function(req, res) {
 res.render("setacctchart");
});

//acctchartdraw
router.get("/acctchartdraw",function(req, res) {
  res.render("acctchartdraw");
});


router.get("/ledger",function(req, res) {
  res.render("ledger");
});

router.post("/ledger",function(req, res) {

  let arrOfobj = req.body.arrOfobj;

  async.waterfall([
    function(callback) {
      Account.insertMany(arrOfobj, function(err,data) {
        if (err) {
          return callback(err)
        }
        callback(null) 
      })
    },
    function(callback) {
      Account.find({}, function(err,data) {
        if (err) {
          return callback(err)
        }
        callback(null,data) 
      }) 
    },
    function(arg1,callback) {
      let filterarr = arg1.filter(function(obj) {
         return /^\d{4}-\d{2}-\d{2}$/.test(obj.date) && obj.date > "2018-08-31";
     })

     let json = JSON.stringify(filterarr);
      fs.writeFile('acctdate.json', json, 'utf8', function(err) { 
        if (err) {
          console.log("write acctdate.json error!")
          //return callback(err)
        }
      })

      callback(null,filterarr) 
    },
    function(arg1,callback) {
      let arrofaccts = arg1;
      arrofaccts.sort(function(a,b) {
        aPro = a.acctno + a.date;
        bPro = b.acctno + b.date;
        return ((aPro < bPro) ? -1 : ((aPro > bPro) ? 1 : 0));
      });
      let acctObj = arrofaccts.reduce(function(acctobj,obj) {
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
     let json = JSON.stringify(acctObj);
     fs.writeFile('ledger.json', json, 'utf8', function(err) { 
        if (err) {
          console.log("write ledger.json error!")
          return callback(err)
        }
     }) 
     callback(null, arrofaccts)     
   },
   function(arg1,callback) {
    let jsonArr = arg1;
    fs.readFile("acctclass.json","utf8", function(err,results) {  //acctClassRef
      if (err) {
        console.log("read acctclass.json error!")
        return callback(err);
      }
      let acctclassref = JSON.parse(results);
      callback(null,jsonArr,acctclassref);
    })
  },
  function(arg1,arg2,callback) { 

    //temparary fix - duplicate bank liabity account
    let filtertemp = arg1.filter(function(obj) {
     return obj.acctno !== "2112";
    })
    //
    let jsonArr = filtertemp;
    let acctclassref = arg2;

    let acctObj = jsonArr.reduce(function(acctobj,obj) {
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

    let  totalAcctArr = [];

    for (let i in acctObj) {

      let drttl = 0;
      let crttl = 0;
      let printorder = i.substr(0,2);
      let acctclass = "";
      if (acctclassref[i]) {
        acctclass = acctclassref[i][0].acctclass;
      }
      else {            // fix for acctno has no acctclass
        switch(i) {
          case "1120":
          acctclass = "流動資產";
          break;

          case "1217":
          acctclass = "流動資產";
          break;

          case "1412 ":
          acctclass = "固定資產";
          break;

          case "1414":
          acctclass = "固定資產";
          break;

          case "1431":
          acctclass = "固定資產";
          break;

          case "1441":
          acctclass = "固定資產";
          break;

          case "2141":
          acctclass = "流動負債";
          break;

          case "2114":
          acctclass = "流動負債";
          break;

          case "3114":
          acctclass = "資本";
          break;

          case "4111":
          acctclass = "銷貨收入"
          break;

          case "4112":
          acctclass = "銷貨收入";
          break;

          case "4113":
          acctclass = "銷貨收入";
          break;

          case "5121":
          acctclass = "進貨成本"
          break;

          case "5122":
          acctclass = "進貨成本"
          break;

          case "5123":
          acctclass = "進貨成本"
          break;

          default:
          acctclass = i + "???";
          
        }
      }

      let tempobj = {};

      tempobj.acctno = acctObj[i][0].acctno;
      tempobj.acctname = acctObj[i][0].acctname;

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
        tempobj.acctclass = acctclass;
        tempobj.printorder = printorder;
      })

      totalAcctArr.push(tempobj);

    }
    let trialBalance = totalAcctArr;

    let gttldr = 0;
    let gttlcr = 0;
    totalAcctArr.forEach(function(obj) {
      gttldr += obj.drttl;
      gttlcr += obj.crttl;
    })

    totalAcctArr.push(
      {
        acctname: "總計",
        drttl: gttldr,
        crttl: gttlcr
      }
    )

    let json = JSON.stringify(totalAcctArr);
    fs.writeFile('trialBalance.json', json, 'utf8', function(err) { 
      if (err) {
        console.log("write trialBalance.json error!")
        return callback(err)
      }
    })

    callback(null, trialBalance)
  },
  function(arg1,callback) {

  let filterrevnue = arg1.filter(function(obj) {
   return obj.acctno >= "4000" && obj.acctno < "5000"
  })
  let reducerevenue = filterrevnue.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});

  let filterpurchase = arg1.filter(function(obj) {
   return obj.acctno >= "5000" && obj.acctno < "6000"
  })
  let reducepurchase = filterpurchase.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});


  let filterexpense = arg1.filter(function(obj) {
   return obj.acctno >= "6000" && obj.acctno < "7000"
  })

  let reduceexpense = filterexpense.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});

    //calculate net incom or loss
    let filternet = arg1.filter(function(obj) {
        return obj.acctno >= "4000" && obj.acctno < "7000"
    });

    let gttldr = 0;
    let gttlcr = 0;

    filternet.forEach(function(obj) {
       gttldr += obj.drttl;
       gttlcr += obj.crttl;
    })

    let diff = gttlcr - gttldr;
    let bal = 0;
    let ndrttl = 0;
    let ncrttl = 0;
    let gdrttl = 0;
    let gcrttl = 0;

    if (diff >= 0) {
       bal = diff;
       ndrttl = bal;
       gdrttl = gttldr + bal;
       gcrttl = gttlcr;
    }
    else {
       bal = Math.abs(diff);
       ncrttl = bal;
       gdrttl = gttldr;
       gcrttl = gttlcr + bal;
    }

    let netobj = {
       本期損益摘要 : [
         {
          acctname: "本期損益",
          drttl: ndrttl,
          crttl: ncrttl
         },
         {
          acctname: "總計",
          drttl: gdrttl,
          crttl: gcrttl
         }
       ]
    }
  let incomestatementArr = [
      reducerevenue,
      reducepurchase,
      reduceexpense,
      netobj
  ];

  let json = JSON.stringify(incomestatementArr);
    fs.writeFile('incomeStatement.json', json, 'utf8', function(err) { 
      if (err) {
        console.log("write incomestatementArr.json error!")
        return callback(err)
      }
    })

  callback(null,arg1);
},
function(arg1,callback) {
  let filtercurrentasset = arg1.filter(function(obj) {
   return obj.acctno >= "1000" && obj.acctno < "1400";
 })

  let reducecurrentasset = filtercurrentasset.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});

  let filterfixedasset = arg1.filter(function(obj) {
   return obj.acctno >= "1411" && obj.acctno < "1600"
 })

  let reducefixedasset = filterfixedasset.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let filtercurrentliability = arg1.filter(function(obj) {
   return obj.acctno >= "2000" && obj.acctno < "2300"
 })
  let reducecurrentliability = filtercurrentliability.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});

  let filterlongtermliability = arg1.filter(function(obj) {
   return obj.acctno >= "2321" && obj.acctno < "2400";
  })
  let reducelongtermliability = filterlongtermliability.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});

  let filtercapital = arg1.filter(function(obj) {
   return obj.acctno >= "3111" && obj.acctno < "3200";
  })
  let reducecapital = filtercapital.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});

  let filterretainedearning = arg1.filter(function(obj) {
   return obj.acctno >= "3351" && obj.acctno < "3400"
 })

  let reduceretainedearing = filterretainedearning.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
      {
        acctname: obj.acctname,
        drttl: obj.drttl,
        crttl: obj.crttl
      }
    )
    return reduceobj;
  },{});

  let balancesheetArr = [
        reducecurrentasset,
        reducefixedasset,
        reducecurrentliability,
        reducelongtermliability,
        reducecapital,
        reduceretainedearing
     ];

  let json = JSON.stringify(balancesheetArr);
  fs.writeFile('balanceSheet.json', json, 'utf8', function(err) { 
    if (err) {
      console.log("write balancesheet.json error!")
      return callback(err)
    }
  })
  callback(null,"waterfall operation success!")
 }
],
function(err,results) {
  if (err) {
    console.log("err.message", err.message);
    res.send("operation fail!");
  }
  else {
    console.log(results)
    res.send("operation success!");
  } 
 })
})


//generalledger
router.get("/generalledger",function(req, res) {
  res.render("generalledger");
  });


//adjustledger
router.get("/adjustledger",function(req, res) {
  res.render("adjustledger");
  });
     
router.get("/ledgerdraw",function(req, res) {
  res.render("ledgerdraw");
  });

//get ledger accounts 07/14/22
router.get("/getacct",function(req, res) {
      Account.find({}, function(err,data0) {
       if (err) res.send({error: err.message})
       res.send({data: data0})
    })
});

router.get("/trialbalance",function(req, res) {
    res.render("trialbalance");
  });

router.get("/incomestatement",function(req, res) {
    res.render("incomestatement");
  });

router.get("/balancesheet",function(req, res) {
    res.render("balancesheet");
  });


//account init
router.get("/acctinit",function(req, res) {
  res.render("acctinit");
});


//initial set up with ajac call from acctinit
router.get("/init",function(req, res) {
  async.waterfall([
    function(callback) {
      let arrofobjarr = fs.readFileSync("acctchartx.txt","utf8")
      .trim()
      .split("\n")
      .map(function(line) {return line.split("\r")})
      .reduce(function(reducearr,arr) {
        reducearr.push(arr[0]);
        return reducearr;
      },[])
      .map(function(line) { 
        return line.split("\t")
      })
      .map(function(arr) {
        return arr.join("\t")
      })
      .map(function(line) {
        return line.split("\t")
      })
      let json = JSON.stringify(arrofobjarr);    
      fs.writeFile('acctchart.json', json, 'utf8', function(err,result){ 
        if(err) {
          console.log("write acctChartAllx.json error");
        }else {}
        console.log("write acctChartAllx.json success!")
      }); 
      callback(null,arrofobjarr)
    },
    function(arg1,callback) {
          let temparr = arg1; //save arg1 original
          let acctclass = temparr.filter(function(arr) {
            return arr[0].length == 2;
          })
          .reduce(function(reduceobj,arr) {
            reduceobj[arr[0]] = arr[1];
            return reduceobj;
          },{})
          let acctclassref = arg1.filter(function(arr) {
           return arr[0].length === 4;
         })
          .reduce(function(reduceobj,arr) {  
           let nosubstr = arr[0].substr(0,2);
           reduceobj[arr[0]] = reduceobj[arr[0]] || [];
           reduceobj[arr[0]].push(
           {
            acctname: arr[1],
            acctclass: acctclass[nosubstr]
          }
          )
           return reduceobj;
         },{})
          let filterarr = arg1.filter(function(arr) {
           return arr[0].length === 4;
         }) 
          let json = JSON.stringify(acctclassref);  
          fs.writeFile('acctClassRef.json', json, 'utf8', function(err,result){ 
            if(err) {
              console.log("write acctClassRef.json error!");
            }else {
              console.log("write acctClassRef.json success!");
            }
          })   
          let returnobj = {acctclassref: acctclassref, arrofstrarr: filterarr}
          callback(null,returnobj) 
        }],
        function(err,results) {
          if (err) {
            console.log(err);
          }
          res.send("Post Success!!") 
          console.log("Operation Success!!")
        })
});

module.exports = router;
