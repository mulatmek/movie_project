const UserServices = require("../services/User");

const getUsers = async (req, res) => {
  try {
    const Users = await UserServices.getUsers();
    res.send(Users);
  } catch (e) {
    res.status(401).send("Error");
  }
};


const countUsers = async (req, res) => {
  try {
    const result = await UserServices.countUsers();
    res.send({ "countUsers": result });
  } catch (e) {
    res.status(401).send("Error");
  }
};


module.exports = {
  getUsers,
  countUsers,
};
