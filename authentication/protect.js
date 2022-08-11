//check if user is logged in, if he isn't - redirect to /login page
const protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Please log in to continue');
    res.redirect('/login');
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.isAdmin)) {
        return next();
    }
    console.log('Only admins allowed');
    res.redirect('/dashboard');
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
    isAdmin
};
