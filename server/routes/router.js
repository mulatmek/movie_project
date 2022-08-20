const express = require('express');
const { registerValidation, registerUser, loginUser } = require('../controllers/loginController');
const { getMovies,  movieValidation} = require("../controllers/databaseController");

const router = express.Router();

//movies routes
router.get('/movie', getMovies);

//loginController routes
router.post('/login', loginUser);
router.post('/register', registerValidation(), registerUser);

module.exports = router;
