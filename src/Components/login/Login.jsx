import React, { useEffect, useState } from "react";
import "./logincss.css";
import logo from "../../Assets/images/Goolok Final Logo.png";
import logo1 from "../../Assets/images/LOGO1.png";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "./auth";
import { Button, Input, Space } from 'antd';
import { ThreeDots } from "react-loader-spinner";

function Login() {
  //..................................
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationResult = await validateLogin(formData);
    setLoading(false);
    if (validationResult.isValid) {
      setErrorMessage("");
      let path = "/dashboard";
      navigate(path);
    } else {
      setErrorMessage(validationResult.errorMessage);
    }
  };

  return (
    <div>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4"></div>
                  </div>

                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src={logo} style={{ width: 185 }} alt="logo" />
                        <h4 className="mt-5 mb-3 pb-1" >Login</h4>
                      </div>
                      <form autoComplete="off">
                        {/* <p>Please login to your account</p> */}
                        <div className="form-outline mb-4 mt-3">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Username
                          </label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                          {/* <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          /> */}
                          <Input.Password
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{height:"34px"}}
                          />

                        </div>
                        {errorMessage && (
                          <div className="alert alert-danger" role="alert">
                            {errorMessage}
                          </div>
                        )}
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            type="submit"
                            className="btn1 ps-4 pe-4"
                            onClick={handleSubmit}
                            disabled={loading}
                          >
                            {loading ? (
                              <ThreeDots
                                visible={true}
                                height="20"
                                width="45"
                                color="#ffffff"
                                radius="18"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{
                                  justifyContent: "center",
                                  fontSize: "12px",
                                }}
                                wrapperClass=""
                              />
                            ) : (
                              "Login "
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
