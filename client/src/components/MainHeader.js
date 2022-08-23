import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../context";

const MainHeader = () => {
  const ctx = useContext(Context);

  const logout = () => {
    ctx.logout();
  };

  return (
    <header>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <img
        src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
        alt="Logo"
      />
      <nav>
        <Link className="manu" to="/">Home</Link>
        <Link className="manu" to="/about">About Us</Link>
        <Link className="manu" to="/contact">Contact</Link>
        {ctx.user && <Link className="manu" to="/dashboard">Dashboard</Link>}
        {ctx.user?.isAdmin && <Link className="manu" to="/admin">Admin Page</Link>}
        {ctx.user && (
          <span className="manu" onClick={logout}>
            Logout
          </span>
        )}
        {!ctx.user && <Link to="/login">Login</Link>}
      </nav>
    </header>
  );
};

export default MainHeader;
