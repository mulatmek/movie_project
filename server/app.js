const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./authentication/passport");
loginCheck(passport);

//mongodb connection
connectionString =
  "mongodb+srv://aviv:Aa123456@cluster0.xuj1qss.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("connected MongoDB database"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "oneboy",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//indicate whether or not a user is logged in for templates
app.use(function (req, res, next) {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

//routes
app.use("/", require("./routes/router"));

const port = 8080;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
