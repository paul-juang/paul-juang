const https = require("https")

const Stream = require("stream").Transform

const fs = require("fs")

const express = require('express');

const router = express.Router();

router.get("/api",function(req, res) {
  res.render("api");
});

router.get("/starwar",function(req, res) {
  res.render("starwar");
});

router.get("/getHttps",function(req, res) {

  let output = '';

  https.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",function(resp) {
    resp.on("data",function(chunk) {
      output += chunk;
    })
    
    resp.on("end",function() {
      output = JSON.parse(output);
      res.json({imgUrl:output.hdurl});
    })

  }).on("error",function(err) {
     console.log(err);
     res.send("error in getting NASA url")
    })
  
});

router.get("/d3test", function(req, res) {
 res.render("d3test");
});

router.get("/imggallery",function(req, res) {
 res.render("imggallery");
});

router.get("/issmap",function(req, res) {
 res.render("issmap");
});

//url of image to be downloaded
let url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/1200px-International_Space_Station.svg.png";

router.get("/getimg",function(req, res) { //not exist yest
  res.render("getimg");

	https.get(url, res => {
		
		let img = new Stream()

		res.on("data", chunk => {
			img.push(chunk)
		})

		res.on("end", () => {
			//let filename = __dirname + "/apod.jpg" 
			let filename = __dirname + "/iss.png"
			fs.writeFileSync(filename, img.read())
		})
	})
	.on("error", err => {
	    console.log("error: " + err.message)
	  }) 
});


module.exports = router;
