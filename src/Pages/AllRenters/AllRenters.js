import { useQuery } from "@tanstack/react-query";
import React from "react";
import Table from "react-bootstrap/Table";
import useTitle from "../../hooks/useTitle";
import Loading from "../../Shared/Loading/Loading";

const AllRenters = () => {
  useTitle("All Renters");

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://find-home-bd-server.vercel.app/dashboard/allbuyers?role=buyer",
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
      fetch(`https://find-home-bd-server.vercel.app/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            // toast.success('Make admin successful.')
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
      <h2 className="text-center mt-3">All Renters List</h2>
      <Table striped bordered hover>
        <thead>
          <tr style={{ backgroundColor: "#7065f0", color: "white" }}>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="form-control dashboard-btn w-100"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllRenters;
