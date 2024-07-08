import React, { useContext } from "react";
import "./AddProperty.css";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  useTitle("Add Property");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHostKey = "d7bc9eb1fc3dad76ed26f9bf8911706b";

  const navigate = useNavigate();

  const handleAddProduct = (data) => {
    const image = data.image[0];
    console.log(image);
    const formData = new FormData();
    console.log(formData);

    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log("imagedata :", imgData);
        if (imgData.success) {
          console.log(imgData.data.url);
          const product = {
            name: data.name,
            address: data.address,
            rent: parseInt(data.rent),
            month: data.month,
            area: data.area,
            bath: parseInt(data.bath),
            category: data.category,
            city: data.city,
            details: data.details,
            elevator: data.elevator,
            email: user.email,
            garage: parseInt(data.garage),
            gas: data.gas,
            kitchen: parseInt(data.kitchen),
            phone: data.phone,
            propertySize: parseInt(data.propertySize),
            room: parseInt(data.room),
            title: data.title,
            image: imgData.data.url,
          };

          // Save Products information to the database
          fetch(
            "http://localhost:5000/productCollection",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(product),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              // toast.success(`${data.name} is added successfully`);
              navigate("/allProperty");
            });
        }
      });
  };

  return (
    <div>
      <h3 className="text-center">Add Your Property For Rent</h3>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className=" d-flex justify-content-center">
          <div className="add-property-box">
            <h4>Personal Information</h4>
            <div className="row my-2">
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                      {...register("name", {
                        required: "Name is Required",
                      })}
                      type="text"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Phone No*</Form.Label>
                    <Form.Control
                      {...register("phone", {
                        required: "Phone Number is Required",
                      })}
                      type="number"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.phone.message}</p>
                    )}
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={user?.email}
                    disabled
                  />
                </Form>
              </div>
            </div>
            <h4> Rental information</h4>
            <Form>
              <Form.Group className="mb-2" controlId="">
                <Form.Label>Property Title*</Form.Label>
                <Form.Control
                  {...register("title", {
                    required: "Property title is Required",
                  })}
                  type="text"
                  placeholder="Enter property title"
                />
                {errors.name && (
                  <p className="text-danger">{errors.title.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="">
                <Form.Label>Property Details*</Form.Label>
                <Form.Control
                  {...register("details", {
                    required: "Property Details is Required",
                  })}
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="write details of a property"
                />
                {errors.name && (
                  <p className="text-danger">{errors.details.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <div className="row">
                  <div className="col-6">
                    <Form.Label>Rent*</Form.Label>
                    <Form.Control
                      {...register("rent", {
                        required: "Rent amount is Required",
                      })}
                      type="number"
                      placeholder="rent amount"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.rent.message}</p>
                    )}
                  </div>
                  <div className="col-6">
                    <Form>
                      <Form.Group>
                        <Form.Label>Available From*</Form.Label>
                        <Form.Select
                          {...register("month", {
                            required: "Available month is Required",
                          })}
                          aria-label="Default select example"
                        >
                          <option value="">Select Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </Form.Select>
                        {errors.name && (
                          <p className="text-danger">{errors.month.message}</p>
                        )}
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </Form.Group>
            </Form>

            <div className="row mb-2">
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Property Size*</Form.Label>
                    <Form.Control
                      {...register("propertySize", {
                        required: "Property size is Required",
                      })}
                      type="number"
                      placeholder="size of a property in sqft."
                    />
                    {errors.name && (
                      <p className="text-danger">
                        {errors.propertySize.message}
                      </p>
                    )}
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>City*</Form.Label>
                    <Form.Select
                      {...register("city", {
                        required: "city is Required",
                      })}
                      aria-label="Default select example"
                    >
                      <option value="">Choose City</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </Form.Select>
                    {errors.name && (
                      <p className="text-danger">{errors.city.message}</p>
                    )}
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Area*</Form.Label>
                    <Form.Select
                      {...register("area", {
                        required: "Area is Required",
                      })}
                      aria-label="Default select example"
                    >
                      <option value="">Choose Area</option>
                      <option value="Dhanmondi">Dhanmondi</option>
                      <option value="Mohammadpur">Mohammadpur</option>
                      <option value="Mirpur">Mirpur</option>
                      <option value="Uttara">Uttara</option>
                      <option value="Bashundhara">Bashundhara</option>
                      <option value="Badda">Badda</option>
                      <option value="Khilkhet">Khilkhet</option>
                      <option value="Farmgate">Farmgate</option>
                    </Form.Select>
                    {errors.name && (
                      <p className="text-danger">{errors.area.message}</p>
                    )}
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Rent Category*</Form.Label>
                    <Form.Select
                      {...register("category", {
                        required: "Category is Required",
                      })}
                      aria-label="Default select example"
                    >
                      <option value="">Choose</option>
                      <option value="Commercial Space">Commercial Space</option>
                      <option value="Office Space">Office Space</option>
                      <option value="Apartment Building">
                        Apartment Building
                      </option>
                      <option value="Flat Rent">Flat Rent</option>
                      <option value="Hostel Rent">Hostel Rent</option>
                      <option value="Only For Boys">Only For Boys</option>
                      <option value="Only For Girls">Only For Girls</option>
                      <option value="For Family">For Family</option>
                      <option value="Community Center">Community Center</option>
                      <option value="Shop & Restaurant Space">
                        Shop & Restaurant Space
                      </option>
                    </Form.Select>
                    {errors.name && (
                      <p className="text-danger">{errors.category.message}</p>
                    )}
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-8 col-sm-8 col-sm-12">
                <Form>
                  <Form.Group controlId="">
                    <Form.Label>Address*</Form.Label>
                    <Form.Control
                      {...register("address", {
                        required: "Address is Required",
                      })}
                      type="text"
                      as="textarea"
                      rows={3}
                      placeholder="Location / address of your property"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.address.message}</p>
                    )}
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Form.Control {...register("room", {})} type="number" />
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Bath</Form.Label>
                    <Form.Control {...register("bath", {})} type="number" />
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Label>Kitchen</Form.Label>
                  <Form.Control {...register("kitchen", {})} type="number" />
                </Form>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Garage</Form.Label>
                    <Form.Control {...register("garage", {})} type="number" />
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Label>Gas</Form.Label>
                    <Form.Select
                      {...register("gas", {})}
                      aria-label="Default select example"
                    >
                      <option></option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <Form>
                  <Form.Label>Elevator</Form.Label>
                  <Form.Select
                    {...register("elevator", {})}
                    aria-label="Default select example"
                  >
                    <option></option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </Form.Select>
                </Form>
              </div>
            </div>
            <Form.Group controlId="formFileLg" className="mb-2">
              <Form.Label>Upload Property Image 1</Form.Label>
              <Form.Control
                {...register("image", {
                  required: "Image is Required",
                })}
                type="file"
                size="lg"
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <input
                className="login-btn form-control mt-4"
                value="Submit"
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
