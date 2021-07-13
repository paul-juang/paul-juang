//const fs = require('fs');

//const async = require("async");

//const https = require('https');

const express = require('express');

const router = express.Router();

const Loto539 = require('../models/loto539');

const Loto649 = require('../models/loto649');


router.get("/loto539",function(req, res) {
  res.render("loto539");
});

router.get("/loto649",function(req, res) {
  res.render("loto649");
});

router.get("/asloto649",function(req, res) {
  res.render("asloto649");
});

router.get("/asloto539",function(req, res) {
  res.render("asloto539");
});

router.get("/coloto649",function(req, res) {
 res.render("coloto649");
});

router.get("/coloto539",function(req, res) {
 res.render("coloto539");
});

router.get("/suloto649",function(req, res) {
 res.render("suloto649");
});

router.get("/suloto539",function(req, res) {
 res.render("suloto539");
});

router.get("/statloto649",function(req, res) {
 res.render("statloto649");
});

router.get("/statloto539",function(req, res) {
 res.render("statloto539");
});

router.get("/preloto649",function(req, res) {
 res.render("preloto649");
});


router.get("/preloto539",function(req, res) {
 res.render("preloto539");
});

module.exports = router;