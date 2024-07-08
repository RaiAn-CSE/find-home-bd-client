import React from "react";

const UserList = () => {
  return (
    <div className="row mt-3">
      <div className="col-4 text-center">
        <p>Md. Robiul Hasan</p>
      </div>
      <div className="col-4 text-center">
        <p>robi1@gmail.com</p>
      </div>
      <div className="col-4 text-center">
        <button className=" delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default UserList;
