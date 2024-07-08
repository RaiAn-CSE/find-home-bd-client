import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Shared/Loading/Loading";
import { BsPersonCircle } from "react-icons/bs";
import "./FeedBack.css";

const FeedBack = () => {
  const {
    data: allFeedback = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/feedback",
          {
            headers: {},
          }
        );
        const data = await res.json();
        return data;
      } catch (error) { }
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    const agree = window.confirm(`Are you sure you want to delete :${id} `);
    if (agree) {
      console.log("Deleting user with id:", id);
      fetch(`http://localhost:5000/feedback/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
          }
          console.log(data);
        });
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-center mt-3">All Feedback from users</h2>
      {allFeedback.map((feedback, i) => (
        <div className="feedback-container mb-4">
          <div className="contact-info mb-3 border-bottom">
            <h3>
              <BsPersonCircle /> {feedback.name}
            </h3>
            <span>Email: {feedback.email}</span>
          </div>
          <div className="feedback">
            <p className="fs-4">{feedback.message}</p>
          </div>
          <div className="delete-btn">
            <button
              className="btn btn-outline  form-control dashboard-btn w-25 "
              onClick={() => handleDelete(feedback._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedBack;
