const express = require('express');
const { registerView, loginView, logoutView, registerUser, loginUser } = require('../controllers/loginController');
const { movieView } = require('../controllers/movieController');
const { homeView, errorView } = require('../controllers/defaultController');
const { protectRoute } = require("../authentication/protect");
const { dashboardView } = require("../controllers/dashboardController");

const router = express.Router();

//loginController routes
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/logout', logoutView);
router.post('/register', registerUser);
router.post('/login', loginUser);

//dashboardController routes
router.get("/dashboard", protectRoute, dashboardView);

//movieController routes
router.get('/movie=:id', movieView);

//defaultController routers
router.get('/', homeView);
router.get('*', errorView);

module.exports = router;
