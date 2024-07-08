import "./Login.css";
import loginBanner from "../../images/homeLogin2.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
// import useToken from '../../hooks/useToken';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, loginInWithGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  // const [token] = useToken(loginUserEmail);
  useTitle("Log in");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    loginInWithGoogle(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
        console.log(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div>
      <div className="login-section container mt-2">
        <div className="row align-content-center">
          <div className="col-md-7 col-lg-7 col-sm-12 image-container text-center">
            <img className="mt-0" src={loginBanner} alt="" />
          </div>
          <div className="col-md-5 col-lg-5 col-sm-12 p-2 ">
            <div className="  p-4  login-Form text-center mt-md-0 mt-lg-0 mt-sm-5">
              <div className="login-heading">
                <h4 className="fw-bold me-3 text-start">Welcome to Find Home BD</h4>
              </div>
              <div className="text-center">
                <h3 className="fw-bolder">Login</h3>
              </div>

              <div className="d-flex justify-content-center ">
                <button onClick={googleSignIn} className="px-3 py-2 rounded-1">
                  <FcGoogle className="me-2" />
                  Login with Google
                </button>
              </div>

              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="m-3">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label float-start"
                  >
                    Email address
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
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
                    placeholder="Enter password"
                    id="inputPassword"
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password?.message}</p>
                  )}
                  {/* <input
                    type="checkbox"
                    className=" m-3"
                    onclick="myFunction()"
                  />
                  Show Password */}
                </div>
                <div className="d-flex justify-content-center">
                  <input
                    className="login-btn form-control mb-2"
                    value="Login"
                    type="submit"
                  />
                </div>
                <p>
                  Don't have an account? <Link to="/signUp">SignUp</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
