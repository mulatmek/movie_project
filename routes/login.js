const express = require('express');
const { registerView, loginView, logoutView, registerUser, loginUser } = require('../controllers/loginController');
const { protectRoute } = require("../authentication/protect");
const { dashboardView } = require("../controllers/dashboardController");

const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.get('/logout', logoutView);
router.get("/dashboard", protectRoute, dashboardView);
router.post('/register', registerUser);
router.post('/login', loginUser);
  
module.exports = router;
