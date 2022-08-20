import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const Dashboard = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctx.user) navigate("/login");
  });
  return <div>Dashboard</div>;
};

export default Dashboard;
