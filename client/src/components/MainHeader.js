import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../context";

const MainHeader = () => {
    const ctx = useContext(Context);

    const logout = () => {
        ctx.logout();
    }

    return (
        <header>
            <div>
                <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="Logo" />
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                { ctx.user &&
                    <Link to="/dashboard">Dashboard</Link>
                    }
                { ctx.user?.isAdmin &&
                    <Link to="/admin">Admin Page</Link>
                    }
                { ctx.user &&
                    <span onClick={logout}>Logout</span>
                    }
                { !ctx.user &&
                    <Link to="/login">Login</Link>
                 }
            </nav>
        </header>
    )
}

export default MainHeader;
