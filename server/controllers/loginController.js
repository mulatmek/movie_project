const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

function registerValidation() {
  return [
    body("firstName")
      .isLength({ min: 1 })
      .withMessage("First name cannot be empty")
      .trim()
      .exists()
      .withMessage("First name is required")
      .matches(/^[A-Za-z0-9\_]+$/)
      .withMessage("First name must be alphanumeric only"),
    body("lastName")
      .isLength({ min: 1 })
      .withMessage("Last name cannot be empty")
      .trim()
      .exists()
      .withMessage("Last name is required")
      .matches(/^[A-Za-z0-9\_]+$/)
      .withMessage("Last name must be alphanumeric only"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid Email")
      .exists(),
  ];
}

//Post Request that handles Register
const registerUser = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { firstName, lastName, email, password, confirm } = req.body;
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!firstName || !lastName || !email || !password || !confirm) {
      res.status(401).send("Please fill all empty fields");
    }

    //Confirm Passwords
    else if (password !== confirm) {
      res.status(401).send("Password must match");
      res.render("register", { firstName, lastName, email });
    } else if (!strongRegex.test(password)) {
      res
        .status(401)
        .send(
          "Password must contain at least 8 characters and 1 special letter"
        );
    }

    //Validation
    else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          res.status(401).send("email already exists");
        } else {
          //creating user object for the new user
          const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            isAdmin: false,
          });

          //Password Hashing
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(res.send(newUser))
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  } else {
    res.status(401).send("Had an error registering");
  }
};

//Post Request that handles Login
const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please fill in all the fields");
  } else {
    passport.authenticate("local", (err, user, info) => {
      if (user) {
        const { firstName, lastName, email, isAdmin } = user;
        res.send({ firstName, lastName, email, isAdmin });
      } else {
        res.status(404).send(err);
      }
    })(req, res, () => {});
  }
};

module.exports = {
  registerValidation,
  registerUser,
  loginUser,
};
