import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaBed, FaBath, FaSquare } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./TopListingProperty.css";

const TopListingProperty = () => {
  const [property, setProperty] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/productCollection")
      .then((res) => res.json())
      .then((data) => setProperty(data.slice(0, 10)));
  }, []);


  return (
    <div className="container mt-5 mb-5">
      <div className="text-center top-listing-title">
        <p className="mb-4">Recent Post Property</p>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          0: {
            width: 0,
            slidesPerView: 1,
            spaceBetween: 10,
          },
          400: {
            width: 400,
            slidesPerView: 1,
            spaceBetween: 10,
          },
          520: {
            width: 520,
            slidesPerView: 2,
            spaceBetween: 10,
          },
          960: {
            width: 950,
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1290: {
            width: 1290,
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1110: {
            width: 1110,
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {property.map((pro) => (
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <div className="card">
                <div className="card-image text-center">
                  <img src={pro.image} className="card-img-top" alt="..." />
                </div>
                <div className="card-info">
                  <p className="fw-bold">{pro.title}</p>

                  <span>
                    <ImLocation2 className="property-des-style" />
                    {pro.area}, {pro.city}
                  </span>
                  <p> Property Type: {pro.category}</p>
                  <div className="d-flex justify-content-start gap-4">
                    <span>
                      <FaBed className="property-des-style" /> {pro.room}
                    </span>
                    <span>
                      <FaBath className="property-des-style" /> {pro.bath}
                    </span>
                    <span>
                      <FaSquare className="property-des-style" />{" "}
                      {pro.propertySize} sqft.
                    </span>
                  </div>
                  <div className="mt-2">
                    <span>
                      Available From:{" "}
                      <b className="property-des-style">{pro.month}</b>
                    </span>
                  </div>
                  <div className="mt-2">
                    <span>
                      Rent: <span className="property-des-style">{pro.rent}</span>{" "}
                      TK
                    </span>
                  </div>
                  <div className="text-center mt-2">
                    <Link to={`/details/${pro._id}`} className="details">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopListingProperty;
