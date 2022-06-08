const express = require("express");
const bodyParser= require("body-parser");
const { json } = require("express/lib/response");
const mongoose = require("mongoose");
var cors = require('cors');

const app = express();

app.use(express.static("public"));
app.use(cors({origin: 'http://localhost:3000'}));

app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb+srv://avivs:AvivS123@cluster0.xuj1qss.mongodb.net/DB',{useNewUrlParser:true});
const MovieSchema = {
    title: {type:String, unique: true},
    year: Number,
    genre: String,
    description: String,
    image_url: String,
    trailer_video: String,
    reviews: String
};


const Movie= mongoose.model("Movies",MovieSchema);
const Harrypotter = new Movie({
    title:"Harrypotter",
    year:"1991",
    genre:"mada bidiony",
    description:"undinfinde",
    image_url:"snjsf",
    trailer_video:"asdaafa",
    reviews:"kkfamf"
})


app.get("/",(req,res)=>{

    res.sendFile(__dirname+"//index.html");
})
app.post("/",function(req,res){
    const title = req.body.title;
    const year = req.body.year;
    const gener = req.body.gener;
    const desc = req.body.desc;
    const img = req.body.img;
    const trailer= req.body.trailer;
    const review = req.body.review;
    const movie = new Movie({
        title:title,
        year:year,
        genre:gener,
        description:desc,
        image_url:img,
        trailer_video:trailer,
        reviews:review
    })
    movie.save();
    console.log(title +"  sucssufully saved to db");
    res.redirect("/");
});

app.get("/home",(req,res)=>{
    Movie.find({},function(err,moviesArray){
        if(!err){
           res.json(moviesArray);
        }
    });
});
app.listen(3000);