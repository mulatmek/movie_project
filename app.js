const express = require("express");
const bodyParser= require("body-parser");
const { json } = require("express/lib/response");
const mongoose = require("mongoose");
const path = require("path");
const imdb = require('imdb-api')
const apiKey = "cab8d7cf"
var cors = require("cors");
var request = require("request");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.engine("html", require("ejs").renderFile);

connectionString = "mongodb+srv://avivs:AvivS123@cluster0.xuj1qss.mongodb.net/DB";
mongoose.connect(connectionString, {useNewUrlParser:true});

// imdb.get({name: "The Toxic Avenger"}, {apiKey: apiKey, timeout: 30000}).then(console.log).catch(console.log);

const MovieSchema = {
    title: {type:String, unique: true},
    year: Number,
    genre: String,
    description: String,
    image_url: String,
    trailer_video: String,
    reviews: String
};

const Movie = mongoose.model("Movies", MovieSchema);

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
    // var data = imdb.search({name: req.body.search}, {apiKey: apiKey});
    imdb.search({name: req.body.search}, {apiKey: apiKey}).then(console.log).then(data =>
        res.render(path.join(__dirname, "views", "results.html"), {data: data.json()})
    );
});
// app.post("/search", function(req, res) {
//     var url = "https://www.omdbapi.com/?s="+req.body.search+"&apikey=cab8d7cf";
//     request(url, function(error, response, body){
//             if (!error && response.statusCode == 200) {
//                 // console.log(body);
//                 var data = JSON.parse(body);
//                 res.render(path.join(__dirname, "views", "results.html"), {data: data});
//             }
//     });


app.get("/home", (req, res) => {
    Movie.find({}, function(err, moviesArray) {
        if (!err) {
           res.json(moviesArray);
        }
    });
});



//NOTE this should be the last get function
app.get("*", function(req, res) {
    res.render(path.join(__dirname, "views", "error.html"));
});

var port = 8080;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
