import React from "react";
import "./Footer.css";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer">
      <div className="border-bottom">
        <div className="container">
          <div className="row w-100 d-flex pt-5">
            <Link to="/" className="col-lg-3 col-md-3 col-sm-12 text-start text-decoration-none">
              <h3 className="">Find Home BD</h3>
            </Link>
            <div className="col-lg-3 col-md-3 col-sm-12 text-start">
              <h3 className="mb-3">Rent a Home</h3>
              <p>Request an offer</p>
              <p>Pricing</p>
              <p>Reviews</p>
              <p>Stories</p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 text-start">
              <h3 className="mb-3">Terms & Privacy</h3>
              <p>Trust & Safety</p>
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 text-start">
              <h3 className="mb-3">About</h3>
              <p>Company</p>
              <p>How it Works</p>
              <p>Contact us: <br />+8801728432590 <br />+8801877380567</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-2">
        <div className="row py-2">
          <div className="col-6 text-start">
            <p>©2024. All rights reserved @Tausif Ahmed</p>{" "}
          </div>
          <div className="col-6 d-flex justify-content-end">

            <a href="https://www.facebook.com/tausif.ahmed.790" target="_blank" rel="noopener noreferrer">
              <span className="media-icon">
                <FaFacebookSquare />
              </span>
            </a>

            <a href="https://x.com/tausif8484?t=im82TNcZ9lRlWdlgbpkVpg&s=09" target="_blank" rel="noopener noreferrer">
              <span className="media-icon">
                <FaTwitter />
              </span>
            </a>

            <a href="https://www.instagram.com/tausif84tf?igsh=MTM1Ymp3bTd5aXo1bg==" target="_blank" rel="noopener noreferrer">
              <span className="media-icon">
                <FaInstagram />
              </span>
            </a>

          </div>
        </div>
      </div>
    </section >
  );
};

export default Footer;
