import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import NavSection from "../Shared/Navbar/NavSection";

const Main = () => {
  return (
    <div>
      <NavSection></NavSection>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
