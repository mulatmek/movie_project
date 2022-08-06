//Get request for Home page
const homeView = (req, res) => {
    res.render("home", {});
};

//Get request for Error page
const errorView = (req, res) => {
    res.render("error", {});
}

module.exports = {
    homeView,
    errorView,
};
