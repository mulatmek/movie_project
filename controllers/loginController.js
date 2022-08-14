const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

function registerValidation() {
    return [
        body('firstName').isLength({ min: 1 }).withMessage('First name cannot be empty')
        .trim()
        .exists()
        .withMessage('First name is required')
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage('First name must be alphanumeric only'),
        body('lastName').isLength({ min: 1 }).withMessage('Last name cannot be empty')
        .trim()
        .exists()
        .withMessage('Last name is required')
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage('Last name must be alphanumeric only'),
        body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email')
        .exists(),
    ];
}

//Get request for Register page
const registerView = (req, res) => {
    res.render("register", {});
}

//Post Request that handles Register
const registerUser = (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { firstName, lastName, email, password, confirm } = req.body;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!firstName || !lastName || !email || !password || !confirm) {
            console.log("Please fill all empty fields");
            res.render("register", {firstName, lastName, email, password, confirm});
        }

        //Confirm Passwords
        else if (password !== confirm) {
            console.log("Password must match");
            res.render("register", {firstName, lastName, email});
        }

        else if (!strongRegex.test(password)) {
            console.log("Password must contain at least 8 characters and 1 special letter");
            res.render("register", {firstName, lastName, email});
        }

        //Validation
        else {
            User.findOne({ email: email }).then((user) => {
                if (user) {
                    console.log("email already exists");
                    res.render("register", {firstName, lastName, email, password});
                }
                else {
                    //creating user object for the new user
                    const newUser = new User({
                        firstName,
                        lastName,
                        email,
                        password,
                        isAdmin: false
                    });
            
                    //Password Hashing
                    bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(res.redirect("/login")).catch((err) => console.log(err));
                    })
                    );
                }
            });
        }
    }
    else {
        console.log(errors);
        res.redirect('/register');
    }
};

//Get request for login page
const loginView = (req, res) => {
    res.render("login", {});
}

//Post Request that handles Login
const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Please fill in all the fields");
        res.render("login", {email, password});
    
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res);
    }
};

//Get request for logout page
const logoutView = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

module.exports = {
    registerView,
    registerValidation,
    loginView,
    registerUser,
    loginUser,
    logoutView,
};
