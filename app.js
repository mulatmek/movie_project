const express = require("express");
const bodyParser= require("body-parser");
const { json } = require("express/lib/response");
const mongoose = require("mongoose");
const path = require("path");
var cors = require("cors");
var request = require("request");
var alert = require('alert');



const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.engine("html", require("ejs").renderFile);
app.set('view engine','ejs');

connectionString = "mongodb+srv://avivs:AvivS123@cluster0.xuj1qss.mongodb.net/DB";
mongoose.connect(connectionString, {useNewUrlParser:true});

//movie 
const MovieSchema = {
    title: {type:String, unique: true},
    year: Number,
    genre: String,
    description: String,
    image_url: String,
    trailer_video: String,
    reviews: String
};
//user
const userSchema = {
    firstName:{type:"String",requierd:true},
    lastName:{type:"String",requierd:true},
    email:{type:"String",requierd:true,unique:true},
    pass:{type:"String",requierd:true},
    repass:{type:"String",requierd:true},
}

const Movie = mongoose.model("Movies", MovieSchema);
const User = mongoose.model("User", userSchema);

app.get("/", (req, res)=> {
    res.render(path.join(__dirname, "index.html"));
})

app.post("/add_movie", function(req, res) {
    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        description: req.body.desc,
        image_url: req.body.img,
        trailer_video: req.body.trailer,
        reviews: req.body.review
    })

    movie.save();
    console.log(req.body.title + " movie succesfully saved to db");
    res.redirect("/");
});

app.post("/search", function(req, res) {
    var url = "https://www.omdbapi.com/?s="+req.body.search+"&apikey=cab8d7cf";
    request(url, function(error, response, body){
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var data = JSON.parse(body);
                res.render(path.join(__dirname, "views", "results.html"), {data: data});
            }
    });
});

app.get("/home", (req, res)=> {
    Movie.find({}, function(err, moviesArray) {
        if (!err) {
           res.json(moviesArray);
        }
    });
});
//user connection login logout 
app.route("/signUp")
.get(function(req,res){
    res.render("signUp.html");
})
.post(function(req,res){
   const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
   const firstName= req.body.firstName;
   const lastName= req.body.lastName;
   const email= req.body.email;
   const pass= req.body.pass;
   const repass= req.body.repass;
   if (pass!=repass){
    alert("Passwords do NOT match");
    res.redirect("/signUp")
   }
   if(!strongRegex.test(pass)){
    alert("Passwords must contains at list 8 characters and 1 speacieal letter");
    res.redirect("/signUp")
   }
   const user = new User({
    firstName:firstName,
     lastName:lastName,
     email:email,
     pass:pass,
     repass:repass
   });
   user.save();
   alert("sign up successfully ");
   res.redirect("/login");
});
app.route("/login")
.get(function(req,res){
    res.render("logIn.html");
})
.post(function(req,res){
    const mail = req.body.mail;
    const pass = req.body.pass;
    User.findOne({email:mail},function(err,foundUser){
        console.log(foundUser);
        if(foundUser){
            if(foundUser.pass===pass){
                res.redirect("home");
            }
            else{
                alert("Wrong Password");
                res.redirect("/login");
            }

        }
        else{
            alert("User does not exist");
            res.redirect("/login");
        }
    })

});

//NOTE this should be the last get function
app.get("*", function(req, res){
    res.render(path.join(__dirname, "views", "error.html"));
});

var port = 8080;
app.listen(port, function() {
    console.log("Server listening on port " + 8080);
});
