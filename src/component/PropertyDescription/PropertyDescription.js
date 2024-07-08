import React from "react";
import { FaRegSquare, FaCar, FaBed, FaBath } from "react-icons/fa";
import { TbCurrencyTaka, TbToolsKitchen2 } from "react-icons/tb";
import { GiElevator } from "react-icons/gi";
import "../../Pages/PropertyDetails/PropertyDetails";
import { useLoaderData } from "react-router-dom";
const PropertyDescription = () => {
  const propertyData = useLoaderData();
  // console.log(propertyData);
  const {
    category,
    elevator,
    garage,
    gas,
    kitchen,
    bath,
    propertySize,
    rent,
    room,
  } = propertyData;
  return (
    <div>
      <p className="fs-4 border-bottom">Description</p>

      <div className="description-list">
        <div className="">
          <h5 className="fw-bold">Property Type</h5>
          <span>{category}</span>
        </div>
        <div className="">
          <h5 className="fw-bold">Property Size</h5>
          <span>
            <FaRegSquare className="font-awesome-icon me-2" /> {propertySize}{" "}
            sq.Ft
          </span>
        </div>
        <div className="">
          <h5 className="fw-bold">Rent</h5>
          <span>
            <TbCurrencyTaka className="font-awesome-icon me-2" /> {rent}
          </span>
        </div>
        <div className="">
          <h5 className="fw-bold">Garages</h5>
          <span>
            <FaCar className="font-awesome-icon me-2" /> {garage}
          </span>
        </div>

        <div className="">
          <h5 className="fw-bold">Room</h5>
          <span>
            <FaBed className="font-awesome-icon me-2" /> {room}
          </span>
        </div>
        <div className="">
          <h5 className="fw-bold">Bath</h5>
          <span>
            <FaBath className="font-awesome-icon me-2" /> {bath}
          </span>
        </div>
        <div className="">
          <h5 className="fw-bold">Kitchen</h5>
          <span>
            <TbToolsKitchen2 className="font-awesome-icon me-2" />
            {kitchen}
          </span>
        </div>
        <div className="">
          <h5 className="fw-bold">Gas</h5>
          <span>{gas}</span>
        </div>
        <div className="">
          <h5 className="fw-bold">Elevator</h5>
          <span>
            <GiElevator className="font-awesome-icon me-2" />
            {elevator}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;
