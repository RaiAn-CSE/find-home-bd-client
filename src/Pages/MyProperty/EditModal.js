import React, { useState } from "react";

const EditModal = ({ post, onUpdate }) => {
    const [formData, setFormData] = useState({ ...post });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="modal fade" id={`editModal${post._id}`} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Edit Property</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="area" className="form-label">Area</label>
                                <input type="text" className="form-control" id="area" name="area" value={formData.area} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rent" className="form-label">Rent</label>
                                <input type="number" className="form-control" id="rent" name="rent" value={formData.rent} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
