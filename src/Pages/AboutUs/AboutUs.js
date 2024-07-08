import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import useTitle from "../../hooks/useTitle";
const AboutUs = () => {
  useTitle("About Us");

  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/feedback")
      .then((res) => res.json())
      .then((data) => setFeedback(data));
  }, []);

  console.log(feedback);


  return (
    <>
      <div className="banner py-5">
        <p>Our mission is to find the best </p>
        <p>property for you.</p>
      </div>
      <div className="d-flex justify-content-center mt-5 mb-2">
        <div className="style"></div>
        <p className="text-center about-header px-2">Reason to Choose us</p>
        <div className="style"></div>
      </div>
      <p className="text-center about-header px-2">Feedback</p>
      <div className="mx-5">
        {
          feedback.map((feed) => (
            <div class="card">
              <div class="card-header">
                {feed.name}
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>{feed.message}</p>
                  <footer class="blockquote-footer">{feed.email} <cite title="Source Title">(User mail)</cite></footer>
                </blockquote>
              </div>
            </div>
          ))
        }
      </div>

    </>
  );
};

export default AboutUs;
