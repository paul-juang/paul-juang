const fs = require('fs');

const async = require("async");

const https = require('https');

const express = require('express');

const router = express.Router();

const Loto539 = require('../models/loto539');

const Loto649 = require('../models/loto649');



router.get("/async",function(req, res) {
    res.render("async");
})

//loto
router.get("/loto",function(req, res) {
    res.render("loto");
})

router.get("/loto539",function(req, res) {
    res.render("loto539");
})

router.get("/loto649",function(req, res) {
    res.render("loto649");
})

router.get('/lotodata/539',function(req,res) {
  
  Loto539
    .find({})
    .exec()
    .then(function(results){

//temporary - will be removed
       let json = JSON.stringify(results);
       fs.writeFile('loto539.json', json, 'utf8', function(err) { 
         if (err) {
           console.log("loto539.json error!")
          }
        })

//
       res.send({arrOfLotonum: results})
   })  
   .catch(function(err){
      console.log(err);
      res.send('find error');  //send to client
   })
})

router.post("/lotodata/539",function(req, res) {
  let arrOfLotonum = req.body.arrOfLotonum;
  async.waterfall([
    function(callback) {
      Ledger.collection.insert(arrOfLotonum, function(err,data) {
        if (err) {
          return callback(err)
        }
        res.send("insert collection success!");
        callback(null) 
      })
    },
    function(callback) {
      Loto539.find({}, function(err,data) {
        if (err) {
          return callback(err)
        }

        let json = JSON.stringify(data);
        fs.writeFile('loto539.json', json, 'utf8', function(err) { 
         if (err) {
           console.log("write balancesheet.json error!")
          }
        })

        
        callback(null,"waterfall operation success!")
       }) 
    }],
    function(err,results) {
      if (err) {
        console.log("err");
      }
      else {
        console.log(results)
      } 
    })
 

});

router.get('/lotodata/649',function(req,res) {
  
  Loto649
    .find({})
    .exec()
    .then(function(results){
//temporary - will be removed
       let json = JSON.stringify(results);
       fs.writeFile('loto649.json', json, 'utf8', function(err) { 
         if (err) {
           console.log("write loto649.json error!")
          }
        })

//
      res.send({arrOfLotonum: results})
   })  
   .catch(function(err){
      console.log(err);
      res.send('find error');  //send to client
     })
})

router.post("/lotodata/649",function(req, res) {
  let arrOfLotonum = req.body.arrOfLotonum;

  console.log(arrOfLotonum);  
  
  Loto649.collection.insert(arrOfLotonum)
  .then(function(results) {
    console.log(results);
    res.send("insert collection sucess")
  })
  .catch(function(err) {
    console.log(err);
    res.send("insert collection error")
  })

});


//starwar
router.get("/starwar",function(req, res) {
    res.render("starwar");
});


//display nasa url images
router.get("/nasaurl",function(req, res) {
    res.render("nasaurl");
});


//display randomly selected nasa url as bodt bachgroundimage
router.get("/allnasaimg",function(req, res) {
    res.render("allnasaimg");
});


//display gallery of Nasa images
router.get("/imggallery",function(req, res) {
 res.render("imggallery");
});

//get https json for star war
router.get("/getHttps",function(req, res) {

  let output = '';

  https.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",function(resp) {
    //receiving data in chunk
    resp.on("data",function(chunk) {
      output += chunk;
    })
    // The whole response has been received. Print out the result.
    resp.on("end",function() {
      output = JSON.parse(output);
      res.send({imgUrl:output.hdurl,nasaDescription:output.explanation});
    })

  }).on("error",function(err) {
     console.log(err);
     res.send("error in getting NASA url")
    })
  
});


//test d3
router.get("/d3test",function(req, res) {
    res.render("d3test");
});


router.get("/test",function(req, res) {
    res.sendFile("/paul/html/test.html");
});


router.get("/test2",function(req, res) {
    res.render("test2");
});


module.exports = router;