const fs = require('fs');

const express = require('express');

const router = express.Router();


//for agk menu

router.get("/treedata",function(req, res) {
  res.render("treedata");
});

router.get("/getdata",function(req, res) {
  fs.readFile("treeData.json","utf8", function(err,results) {  
      if (err) {
        return err;
      }
      else {
        let treedata = JSON.parse(results);
        res.send({treedata: treedata})
      }
    })
  
});

router.get("/agkdraw",function(req, res) {
  res.render("agkdraw");
});

router.get("/drawtree",function(req, res) {
  res.render("drawtree");
});

module.exports = router;
