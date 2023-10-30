import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function LoginUser() {}
  return (
    <>
      <div className="container">
        <div className="login">
          <div className="row">
            <h2 className="text-center mt-3">Login</h2>
            <div className="col-md-6">
              {/* <img
                src={LoginImg}
                alt=""
                className="login-img mx-auto d-block"
              /> */}
            </div>
            <div className="col-md-6 mt-3 ">
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
                    className="btn btn-primary w-100 mt-3"
                    onClick={LoginUser}
                  >
                    <b>Login</b>
                  </button>
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
