import React, { useEffect, useState } from "react";
import "./Login.css";
import showToast from "crunchy-toast";
import LoginImg from "./loginImg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function LoginUser() {
    const response = await axios.post("/login", {
      email: email,
      password: password,
    });
    showToast(response?.data?.message, "success", 3000);

    if (response?.data?.success) {
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      window.location.href = "/";
    }
  }

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(storageUser);

    if (storageUser?.email) {
      showToast('You are already logged in!', 'alert', 4000);
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="login">
          <div className="row">
            <h2 className="text-center mt-3">Login</h2>
            <div className="col-md-6">
              <img
                src={LoginImg}
                alt="login-img"
                className="login-img mx-auto d-block"
              />
            </div>
            <div className="col-md-6 mt-5">
              <div className="mt-5 ">
                <form>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark w-100 mt-3"
                    onClick={LoginUser}
                  >
                    <b>Login</b>
                  </button>
                  <div className="mt-3 text-center">
                    <Link to="/signup" className="signup-link">
                      Create new Account, Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
