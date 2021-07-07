const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require("../models/user");


const authUser = async(req,res,next) => {
    /*console.log("req.cookie.sid:",req.cookies["connect.sid"]);
    console.log("req.sessionID:",req.sessionID);
    console.log("req.session:",req.session);*/
    if (req.session.isAuth) {
      let user = await User.findOne({_id: req.session.userId})
        return res.redirect("/home")

      }  
     next()
   }

router.get("/", authUser, async (req, res) => {
    res.render("login")
});

router.post("/login",async(req, res) => {
  
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
        req.session.userId = user._id
        req.session.email = user.email
        req.session.date = new Date()
        req.session.isAuth = true
        res.redirect("/home")
      } else {
        res.redirect("/")
      }
});

router.get("/register",function(req, res) {
  res.render("register")
});

router.post("/register",async (req, res) => {
  
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

module.exports = router;
