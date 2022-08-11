//Get request for Dashboard page
const dashboardView = (req, res) => {
    res.render("dashboard", {user: req.user});
};

const adminView = (req, res) => {
    res.render("admin", {user: req.user});
};

module.exports = {
    dashboardView,
    adminView
};
