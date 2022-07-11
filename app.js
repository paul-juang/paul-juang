const https = require('https');

const Stream = require("stream").Transform

const fs = require('fs');

const async = require("async");

const express = require('express');

const path = require('path');

const app = express();

const session = require('express-session');

const bcrypt = require("bcryptjs") //bcrypt

const cookieParser = require('cookie-parser');

const MongodbSession = require('connect-mongodb-session')(session);

require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{ 
  useUnifiedTopology:true, 
  useNewUrlParser:true,
  useCreateIndex:true 
})
.then(()=> console.log("Database connected ..."))
.catch((err)=> console.log(err))   

const PORT = process.env.PORT || 3000;

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cookieParser());

const store = new MongodbSession({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
})

/*app.use(session({
  secret: "hashsecret",
  resave: false,
  saveUninitialized: false,
  store: store
}));*/

//use router
//app.use(require('./routes/session'));
app.use(require('./routes/accounting'));
app.use(require('./routes/agk'));
app.use(require('./routes/loto'));
app.use(require('./routes/misc'));

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
