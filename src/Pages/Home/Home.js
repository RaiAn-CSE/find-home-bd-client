import React, { useEffect, useState } from "react";
import Banner from "../../component/Banner/Banner";
import Hero from "../../component/Hero/Hero";
import Category from "../../component/Category/Category";
import "./Home.css";
import useTitle from "../../hooks/useTitle";
import TopListingProperty from "../../component/TopListingProperty/TopListingProperty";
import Advertise from "./Advertise";
// import chatBot from "../../images/chatbot.png";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [add, setAdd] = useState([]);
  const [totalAdd, setTotalAdd] = useState(0);

  useEffect(() => {
    fetch("category.json")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);
  useTitle("Home");

  useEffect(() => {
    fetch(`http://localhost:5000/allProducts`)
      .then((res) => res.json())
      .then((data) => setAdd(data));
  }, []);


  return (
    <div>
      <Banner></Banner>
      <Hero></Hero>
      <Advertise />
      <section className="category-section h-auto w-auto py-5">
        <div className="container mt-5 mt-lg-0 mt-md-0">
          <div className="category-title mt-sm-5 mt-lg-0 mt-md-0">
            <p>Top Categories</p>
            <span>
              {category.length} categories {add.length} ads
            </span>
          </div>
          <div className="category">
            {category.map((categ) => (
              <Category
                // icon={categ.category_icon}s
                key={categ.id}
                // title={categ.title}
                // adds={categ.adds}
                categ={categ}
                setTotalAdd={setTotalAdd}
                totalAdd={totalAdd}
              ></Category>
            ))}
          </div>
        </div>
      </section>
      <TopListingProperty></TopListingProperty>

      {/* ChatBot */}
      {/* <a href="https://mediafiles.botpress.cloud/aaafa48d-b953-423b-ac65-289cab68e248/webchat/bot.html" target="_blank" rel="noopener noreferrer">
        <img
          src={chatBot}
          alt="Chat Bot PNG"
          height={50}
          width={50}
          className="position-fixed bottom-0 end-0 mb-3 me-3"
        />
      </a> */}
    </div>
  );
};

export default Home;
