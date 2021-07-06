const https = require('https');

const fs = require('fs');

const async = require("async");

const express = require('express');

const path = require('path');

const app = express();

require('dotenv').config()

const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology:true, useNewUrlParser:true}); 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected ...");
});

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

//use router
app.use(require('./routes/accounting'));

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});

