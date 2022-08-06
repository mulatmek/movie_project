const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
const passport = require("passport");
const {loginCheck} = require("./authentication/passport");
loginCheck(passport);

//mongodb connection
connectionString = "mongodb+srv://avivs:AvivS123@cluster0.xuj1qss.mongodb.net/DB";
mongoose.connect(connectionString, {useNewUrlParser:true})
.then(() => console.log('connected MongoDB database'))
.catch(err => console.log(err));

app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

//indicate whether or not a user is logged in for templates
app.use(function (req, res, next) {
    res.locals.loggedIn = req.isAuthenticated();
    next();
});

//routes
app.use('/', require('./routes/login'));

//default home page
app.get("/", (req, res)=> {
    res.render(path.join(__dirname, "views", "home.ejs"));
})

app.get("*", function(req, res){
    res.render(path.join(__dirname, "views", "error.ejs"));
});

const port = 8080;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
