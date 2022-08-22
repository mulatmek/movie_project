import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const Dashboard = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctx.user) navigate("/login");
  });

  return (
    <div className="dashboard-page">
      <h2>Hello!</h2>
      <ul>
        <li>
          <h4>You are logged in with the following details:</h4>
        </li>
        <li>First Name: {ctx.user?.firstName}</li>
        <li>Last Name: {ctx.user?.lastName}</li>
        <li>Email: {ctx.user?.email}</li>
      </ul>
    </div>
  );
};

export default Dashboard;
