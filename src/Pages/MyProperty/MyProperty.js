import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaBath, FaBed, FaSquare } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
import Loading from "../../Shared/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const MyProperty = () => {
  const { user } = useContext(AuthContext);
  useTitle("My Property");

  const [selectedProperty, setSelectedProperty] = useState(null); // State to hold selected property for updating
  const [updateData, setUpdateData] = useState({}); // State to hold update data
  const [show, setShow] = useState(false); // State to handle modal visibility

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products?email=${user?.email}`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    const agree = window.confirm(`Are you sure you want to delete :${id} `);
    if (agree) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
          }
        });
    }
  };

  const handleUpdate = (id) => {
    const updatedProperty = {
      title: updateData.title,
      rent: updateData.rent,
      room: updateData.room,
      // Add other fields as necessary
    };

    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          handleClose(); // Close the modal
          setSelectedProperty(null); // Clear the selected property
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const startUpdate = (property) => {
    setSelectedProperty(property);
    setUpdateData(property);
    handleShow(); // Show the modal
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card-content">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedProperty._id);
            }}
          >
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updateData.title}
                onChange={handleInputChange}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formRent" className="mt-3">
              <Form.Label>Rent</Form.Label>
              <Form.Control
                type="number"
                name="rent"
                value={updateData.rent}
                onChange={handleInputChange}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formRent" className="mt-3">
              <Form.Label>Room</Form.Label>
              <Form.Control
                type="number"
                name="room"
                value={updateData.room}
                onChange={handleInputChange}
                className="form-control"
              />
            </Form.Group>
            {/* Add other input fields as necessary */}
            <Button variant="primary" type="submit" className="mt-3">
              Update
            </Button>
            <Button variant="secondary" className="mt-3 ml-2" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {products.map((post) => (
        <div className="card" key={post._id}>
          <div className="card-image text-center">
            <img src={post.image} className="card-img-top" alt="..." />
          </div>
          <div className="card-info">
            <p className="fw-bold">{post.title}</p>
            <span>
              <ImLocation2 className="property-des-style" />
              {post.area}, {post.city}
            </span>
            <p>Property Type: {post.category}</p>
            <div className="d-flex justify-content-start gap-4">
              <span>
                <FaBed className="property-des-style" /> {post.room}
              </span>
              <span>
                <FaBath className="property-des-style" /> {post.bath}
              </span>
              <span>
                <FaSquare className="property-des-style" /> {post.propertySize} sqft.
              </span>
            </div>
            <div className="mt-2">
              <span>
                Available From: <b className="property-des-style">{post.month}</b>
              </span>
            </div>
            <div className="mt-2">
              <span>
                Rent: <span className="property-des-style">{post.rent}</span> TK
              </span>
            </div>
            <div className="text-center mt-2">
              <button
                className="dashboard-btn form-control"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>

              <button
                className="dashboard-btn form-control"
                onClick={() => startUpdate(post)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProperty;
