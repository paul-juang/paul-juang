//authentication - express-session
const express = require('express');

const session = require('express-session');

const bcrypt = require("bcryptjs") //bcrypt

const MongodbSession = require('connect-mongodb-session')(session);

const path = require('path');

const app = express();


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const mongoUri = 'mongodb+srv://paul:Jyuhnbor1234@cluster0.khrxx.mongodb.net/nodeappdb?retryWrites=true&w=majority'||process.env.MONGODB_URI;

mongoose.connect(mongoUri,{ 
  useUnifiedTopology:true, 
  useNewUrlParser:true,
  useCreateIndex:true 
})
.then(()=> console.log("Database connected ..."))
.catch((err)=> console.log(err))   

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

//for get /nasa
const https = require("https")

const Stream = require("stream").Transform

const fs = require("fs")
//

const PORT = process.env.PORT || 3000;

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cookieParser());

const store = new MongodbSession({
	uri: mongoUri,
	collection: "sessions"
})

app.use(session({
	secret: "hashsecret",
	resave: false,
	saveUninitialized: false,
	store: store
}));

/**/

const User = require("./models/user");


const authUser = async(req,res,next) => {
    console.log("req.cookie.sid:",req.cookies["connect.sid"]);
    console.log("req.sessionID:",req.sessionID);
    console.log("req.session:",req.session);
      console.log('req.headers.origin', req.headers.origin);


    if (req.session.isAuth) {
      let user = await User.findOne({_id: req.session.userId})
        return res.send(`${user.name} already logged in`)
      }  
     next()
   }

app.get("/", authUser, async (req, res) => {
    console.log('req.headers/', req.headers);

    res.render("login")
});


app.post("/login",async(req, res) => {
  
    const {email,password } = req.body;

    if (!email ||!password) { 
      return res.redirect("/")
    }
    
    let user = await User.findOne({email})
      if (!user) {
        return res.redirect("/register")
      } 

      const ismatch = await bcrypt.compare(password, user.password);
      if (ismatch) {
        
        //req.session.cookie.maxAge = 1000*60*60
        req.session.userId = user._id
        req.session.email = user.email
        req.session.date = new Date().toISOString().split('T')[0]
        req.session.isAuth = true

        res.json({login:"success"}) 
      } else {
        res.redirect("/")
      }
});

app.get("/register",function(req, res) {
  res.render("register")
});

app.post("/register",async (req, res) => {
  
  const {name,email,password } = req.body;
  
  if (name && email && password) {

      const hashpwd = await bcrypt.hash(password,12);    
      user = new User({
        name,
        email,
        password:hashpwd
      })

      let newuser = await user.save();
      console.log("user saved: ",user)
      res.redirect("/") //login

    }else {
      res.redirect("/register")
    }
    
  });

app.get("/nasa",function(req, resp) {

  let hdUrl = "";

  https
  .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", res=>{
    let data = ""
    res.on("data", chunk => {
        data += chunk
    })

    res.on("end", () => {
        console.log('data received on end:', data)
        let url = JSON.parse(data).hdurl
        hdUrl = url
        resp.json({hdurl: hdUrl})
/*
        https.get(url, res =>{
          //response should be an image
          if (res.statusCode === 200 && res.headers['content-type'] === 'image/jpeg') {
            let img = new Stream()

            res.on("data", chunk => {
              img.push(chunk)
            })

            res.on("end", () => {
              let filename = __dirname + "/apod.jpg" 
              fs.writeFileSync(filename, img.read())
            })
          }
        })*/        
    })
  })
  .on("error", err => {
    console.log("error: " + err.mssage())
  })
});

app.get("/api",function(req, res) {
  res.render("api")
});

app.listen(PORT, () => {
    console.log('Server listening on ' + PORT);
});
