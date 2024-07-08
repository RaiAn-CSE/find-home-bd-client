import React from 'react';
import "./Home.css";
import add1 from "../../images/add1.jpeg"
import add2 from "../../images/add2.jpg"
import add3 from "../../images/add3.jpg"
import add4 from "../../images/add4.png"

const Advertise = () => {
    return (
        <>
            <section className="category-section h-auto w-auto py-4 bg-light">
                <div className="container mt-5 mt-lg-0 mt-md-0">
                    <div className="category-title text-center mt-5 mb-4">
                        <h2 className="fw-bold">Advertise</h2>
                    </div>
                    <div className="row g-4 justify-content-center align-items-center">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <a href="https://study.com/academy/lesson/what-is-product-advertising-definition-methods-examples.html" className="d-block" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={add4}
                                    alt="Product Advertise"
                                    className="img-fluid rounded shadow-sm card-img-hover"
                                />
                            </a>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <a href="https://www.upmenu.com/blog/food-advertisements/" className="d-block" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={add1}
                                    alt="Food Advertise"
                                    className="img-fluid rounded shadow-sm card-img-hover"
                                />
                            </a>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <a href="https://www.postermywall.com/index.php/l/shoe-advertisement-poster" className="d-block" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={add2}
                                    alt="Shoe Advertise"
                                    className="img-fluid rounded shadow-sm card-img-hover"
                                />
                            </a>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <a href="https://www.postermywall.com/index.php/l/shoe-advertisement-poster" className="d-block" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={add3}
                                    alt="Shoe Advertise"
                                    className="img-fluid rounded shadow-sm card-img-hover"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Advertise;