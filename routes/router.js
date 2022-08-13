const express = require('express');
const { registerView, loginView, logoutView, registerUser, loginUser } = require('../controllers/loginController');
const { movieView } = require('../controllers/movieController');
const { homeView, errorView } = require('../controllers/defaultController');
const { protectRoute, isAdmin } = require("../authentication/protect");
const { dashboardView, adminView } = require("../controllers/dashboardController");
const { addMovie } = require("../controllers/databaseController");

const router = express.Router();

//databaseController routes
router.post('/add-movie', isAdmin, addMovie); //change this to be only for admins when done

//loginController routes
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/logout', logoutView);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/admin', isAdmin, adminView)

//dashboardController routes
router.get("/dashboard", protectRoute, dashboardView);

//movieController routes
router.get('/movie=:id', movieView);

//defaultController routers
router.get('/', homeView);
router.get('*', errorView);

module.exports = router;
