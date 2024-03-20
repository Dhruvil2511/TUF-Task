import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Table from "../Table";
import axios from "axios";

const Result = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubmissions = async () => {
    
    axios
      .get(import.meta.env.VITE_BASE_URL + "api/v1/submissions/get-submissions")
      .then((res) => {
        console.log(res.data.submissions);
        setSubmissions(res.data.submissions);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchSubmissions();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-fluid w-100">
        <div className="mt-3">
          <h3 className="text-white text-center">Submissions</h3>
          <Table submissions={submissions} />
        </div>
      </div>
    </>
  );
};

export default Result;
