//check if user is logged in, if he isn't - redirect to /login page
const protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Please log in to continue');
    res.redirect('/login');
}

const allowIf = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');      
}

module.exports = {
    protectRoute,
    allowIf,
};
