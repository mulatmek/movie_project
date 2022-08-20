const User = require("../models/User");

const countUsers = async () => {
  return await User.countDocuments({});
};

const getUsers = async () => {
  return await User.find({});
};

const getUserByName = async (firstName, lastName) => {
  return await User.find({ firstName: firstName, lastName: lastName });
};

const getUserByEmail = async (email) => {
  return await User.find({ email: email });
};

const updateUser = async (email, body) => {
  return await User.findOneAndUpdate({ email }, body);
};

const deleteUser = async (email) => {
  return await User.findOneAndDelete({ email: email });
};

module.exports = {
  countUsers,
  getUsers,
  getUserByName,
  getUserByEmail,
  updateUser,
  deleteUser,
};
