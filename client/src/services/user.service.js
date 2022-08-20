import axios from "axios";

const getUserList = async () => {
  try {
    const res = await axios.get("http://localhost:8080/user");
    return res.data;
  } catch (err) {}
};

const getCountUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8080/countUsers");
    return res.data;
  } catch (err) {}
};

export const userService = {
  getUserList,
  getCountUsers,
};
