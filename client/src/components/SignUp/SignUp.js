import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import showToast from 'crunchy-toast';
import SignupImg from './signup.png'

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  async function signupUser() {
    if(!name){
        showToast('name is required', 'alert', 4000);
        return;
    }
    if(!email){
        showToast('email is required', 'alert', 4000);
        return;
    }
    if(!password){
        showToast('password is required', 'alert', 4000);
        return;
    }
    if(!mobile){
        showToast('mobile number is required', 'alert', 4000);
        return;
    }
    if(!address){
        showToast('address is required', 'alert', 4000);
        return;
    }
    const response = await axios.post("/signup", {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      address: address,
      gender: gender,
    });
    console.log(response.data);
    if (response.data.success) {
      showToast(response.data.message, 'success', 3000);
      window.location.href = "/login";
    } else {
    showToast(response.data.message, 'alert', 3000);

      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setAddress("");
    }
  }
  return (
    <>
      <div className="container">
        <div className="signup">
          <div className="row">
            {/* <h4 className="text-center signup-quote">
              <u>“Make a customer, not a sale.🤩”</u>
            </h4> */}
            <h2 className="text-center mt-3">Aapna Mart🥋🍸</h2>
            <div className="col-md-6">
              <div className="mt-5 ">
                <form>
                  <div className="mb-3 mt-5">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="enter your fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
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
                  <div className="mb-3">
                    <input
                      type="phone"
                      className="form-control"
                      id="mobile"
                      placeholder="enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-evenly">
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      className="gender"
                      checked={gender === "male"}
                      onClick={() => {
                        setGender("male");
                      }}
                    />
                    <label htmlFor="male">Male</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      className="gender"
                      checked={gender === "female"}
                      onClick={() => {
                        setGender("female");
                      }}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary w-100 mt-3"
                    onClick={signupUser}
                  >
                    <b>Signup</b>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6 mt-3 ">
              <img
                src={SignupImg}
                alt=""
                className="signup-restro-img mx-auto d-block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
