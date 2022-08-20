import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (ctx.user) navigate("/dashboard");
  });
  
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (isRegister) {
        const res = await axios.post(
          "http://localhost:8080/register",
          userData
        );
        const { email, firstName, lastName, isAdmin } = res.data;
        if (res.data.email) {
          ctx.login({ email, firstName, lastName, isAdmin });
          navigate("/dashboard");
        }
      } else {
        const res = await axios.post("http://localhost:8080/login", {
          email: userData.email,
          password: userData.password,
        });
        if (res.data.email) {
          ctx.login(res.data);
          navigate("/dashboard");
        }
      }
    } catch (e) {
      ctx.setUserMsg(e.response.data)
    }
  };

  const showPassword = isShowPassword ? "text" : "password";

  const inputHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="login-page">
      <div className="form-container">
        <h1>{isRegister ? "Register" : "Login"}</h1>
        <form onSubmit={submitHandler}>
          {isRegister && (
            <input
              type="text"
              name="firstName"
              onInput={inputHandler}
              placeholder="First Name"
            />
          )}
          {isRegister && (
            <input
              type="text"
              name="lastName"
              onInput={inputHandler}
              placeholder="Last Name"
            />
          )}
          <input
            type="text"
            onInput={inputHandler}
            name="email"
            placeholder="Email"
          />
          <input
            type={showPassword}
            onInput={inputHandler}
            name="password"
            placeholder="Password"
          />
          {isRegister && (
            <input
              type={showPassword}
              onInput={inputHandler}
              name="confirm"
              placeholder="Confirm Password"
            />
          )}
          <label>
            <input
              type="checkbox"
              onInput={(e) => setIsShowPassword(e.target.checked)}
            />
            <span>Show Password?</span>
          </label>

          <button>{isRegister ? "Register" : "Login"}</button>
        </form>
        <span onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Have an account? Login"
            : "Dont have an account? Register"}
        </span>
      </div>
    </section>
  );
};

export default Login;
