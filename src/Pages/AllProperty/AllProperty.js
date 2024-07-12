import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyBanner from "../../component/PropertyBanner/PropertyBanner";
import PropertySorting from "../../component/PropertySorting/PropertySorting";
import Posts from "../../component/Posts/Posts";
import Pagination from "../../component/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const AllProperty = () => {
  useTitle("All Property");
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const location = useLocation();
  const homeSearch = location?.state?.data;

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //handle form
  const handleForm = (event) => {
    event.preventDefault();

    const price = event.target.price.value;
    const city = event.target.city.value;
    const area = event.target.area.value;
    const rentType = event.target.rentType;

    const rentCheck = Object.values(rentType).filter(
      (rent) => rent.checked === true
    );
    const rentCheckValue = rentCheck.map((check) => {
      return check.value;
    });

    const month = event.target.month.value;
    const bedAmount = event.target.bed;

    const bedCheck = Object.values(bedAmount).filter(
      (bed) => bed.checked === true
    );
    const bedCheckValue = bedCheck.map((check) => {
      return check.value;
    });

    // wash
    const washAmount = event.target.wash;

    const washCheck = Object.values(washAmount).filter(
      (wash) => wash.checked === true
    );
    const washCheckValue = washCheck.map((check) => {
      return check.value;
    });

    fetch(
      `https://find-home-bd-server.vercel.app/productCollection?price=${price}&city=${city}&area=${area}&rentType=${rentCheckValue}&bedAmount=${bedCheckValue}&washAmount=${washCheckValue}&month=${month}`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const city = event.target.city.value;
    const area = event.target.area.value;
    const rent = event.target.rent.value;
    console.log(city, area, rent);

    fetch(
      `https://find-home-bd-server.vercel.app/sortProducts?city=${city}&area=${area}&rent=${rent}`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };


  useEffect(() => {
    if (homeSearch?.city) {

      fetch(
        `https://find-home-bd-server.vercel.app/sortProducts?city=${homeSearch?.city}&area=${homeSearch?.area}&rent=${homeSearch?.rent}`
      )
        .then((res) => res.json())
        .then((data) => setPosts(data));
    } else {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get("https://find-home-bd-server.vercel.app/productCollection");
        setPosts(res.data);
        setLoading(false);
      };

      fetchPosts();
    }
  }, [homeSearch?.city, homeSearch?.area, homeSearch?.rent]);



  return (
    <div>
      <div className="banner-section">
        <PropertyBanner handleSearch={handleSearch}></PropertyBanner>
      </div>
      <div className="container">
        <h3 className="mt-5 fw-bolder">Search results:</h3>
        <div className="row">
          <div className="col-md-3 col-lg-3 col-sm-12">
            <PropertySorting handleForm={handleForm}></PropertySorting>
          </div>
          <div className="col-md-9 col-lg-9 col-sm-12">
            <div className="ms-4">
              <h3 className="fw-bolder">Property For Rent</h3>
              <span>{posts.length} results</span>
            </div>
            <div className="all-property-card">
              <Posts posts={currentPosts} loading={loading}></Posts>

              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProperty;
