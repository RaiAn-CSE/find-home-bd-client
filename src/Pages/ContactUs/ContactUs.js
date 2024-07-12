import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
import loginBanner from "../../images/homeLogin2.jpg";
import "./ContactUs.css";

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useTitle("Contact Us");

  const handleForm = data => {
    console.log(data);
    const product = {
      name: data.name,
      phone: data.phone,
      email: user.email,
      message: data.message,
    };
    fetch("https://find-home-bd-server.vercel.app/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        navigate('/aboutUs')
      });
  };

  return (
    <div className="container">
      <div className="row p-2">
        <div className="col-12 col-md-6 col-lg-6 p-4 text-center">
          {" "}
          {/* <h3 className="my-5">We'd Love to Hear From You :-</h3>{" "} */}
          <img className="w-75" src={loginBanner} alt="" />
        </div>
        <div className="col-12 col-md-6 col-lg-6  my-0 my-md-5 my-lg-5 p-4 login-Form">
          <h3 className="">Feedback & Contact us:</h3>
          <Form onSubmit={handleSubmit(handleForm)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name", {
                  required: "Phone Number is Required",
                })}
                type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={user?.email}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                {...register("phone", {
                  required: "Phone Number is Required",
                })}
                type="number"
                placeholder="Enter your phone number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Feedback message</Form.Label>
              <Form.Control
                {...register("message", {
                })}
                type="text"
                as="textarea"
                rows={3}
                placeholder="Enter your message"
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <input
                className="form-control text-center contact-pageBtn"
                value="SEND FEEDBACK"
                type="submit"
              />
            </Form.Group>
          </Form>
          <p class="divider-text"><span class="bg-light">OR</span></p>
          <div className="d-flex justify-content-center">
            <a
              className="text-decoration-none form-control text-center contact-pageBtn"
              href="mailto:tausif15-14530@diu.edu.bd"
            >
              EMAIL US
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
