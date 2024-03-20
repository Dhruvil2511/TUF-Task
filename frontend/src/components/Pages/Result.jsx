import React from "react";
import Navbar from "../Navbar";
import Table from "../Table";

const Result = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid w-100">
        <div className="mt-3">
          <h3 className="text-white text-center">Submissions</h3>
          <Table />
        </div>
      </div>
    </>
  );
};

export default Result;
