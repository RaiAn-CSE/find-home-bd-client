import React, { useContext, useState } from "react";
import "../Login/Login.css";
import loginBanner from "../../images/homeLogin2.jpg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUpError, setSignUPError] = useState("");
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useTitle("SignUp");

  const handleSignUp = (data) => {
    // setSignUPError('');
    console.log(data);
    createUser(data.email, data.password, data.userType)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            navigate("/");
            saveUser(data.name, data.email, data.userType);
          })
          .catch((err) => console.log(err));
      })

      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
      });
  };

  const saveUser = (name, email, userType) => {
    const user = { name, email, role: userType };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <div className="login-section  container mt-2">
        <div className="row align-content-center">
          <div className="col-md-7 col-lg-7 col-sm-12 image-container text-center">
            <img className="mt-0" src={loginBanner} alt="" />
          </div>
          <div className="col-md-5 col-lg-5 col-sm-12 p-2 ">
            <div className="p-3 login-Form text-center mt-md-0 mt-lg-0 mt-sm-5">
              <div className="login-heading">
                <h4 className="fw-bold me-2 text-start">Welcome to Find Home BD</h4>
              </div>
              <div className="text-center">
                <h3 className="fw-bolder">Sign Up</h3>
              </div>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="m-3">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label float-start"
                  >
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your name"
                  />
                  <label
                    for="exampleFormControlInput2"
                    className="form-label float-start"
                  >
                    Email address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email Address is required",
                    })}
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email?.message}</p>
                  )}
                  <label
                    for="exampleFormControlInput3"
                    className="form-label float-start"
                  >
                    Phone Number
                  </label>
                  <input
                    {...register("number", { required: true })}
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Phone"
                  />
                  <label
                    for="inputPassword"
                    className="form-label float-start mt-2"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 characters or longer",
                      },
                    })}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password?.message}</p>
                  )}
                  {/* User :  */}

                  <label className="float-start"> User Type</label>
                  <select className="form-select" {...register("userType")}>
                    <option value="">Choose</option>
                    <option value="buyer">Renter</option>
                    <option value="seller">Property Owner</option>
                    {/* <option value="admin">admin</option> */}
                  </select>
                  {errors.userType && (
                    <p className="text-red-500">{errors.userType.message}</p>
                  )}
                </div>
                {signUpError && <p className="text-danger">{signUpError}</p>}
                <div className="d-flex justify-content-center mb-3">
                  <input
                    className=" form-control login-btn"
                    value="Sign Up"
                    type="submit"
                  />
                </div>
                <p>
                  Have an account? <Link to="/logIn">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
