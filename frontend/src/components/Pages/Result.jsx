import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Table from "../Table";
import axios from "axios";

const Result = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchSubmissions = async () => {
    axios
      .get(
        import.meta.env.VITE_BASE_URL + "api/v1/submissions/get-submissions",
        {
          params: {
            page: currentPage,
            limit: 10,
          },
        }
      )
      .then((res) => {
        setTotalPages(res.data.totalPages);
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
  }, [currentPage]);
  return (
    <>
      <Navbar />
      <div className="container-fluid w-100">
        <div className="mt-3">
          <h3 className="text-white text-center">Submissions</h3>
          <Table
            submissions={submissions}
            currentPage={currentPage}
            limit={10}
          />
        </div>
        <nav aria-label="Page navigation" className="mt-5" style={{position:"absolute", left:"42%" ,top:"80%"}}>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                style={{ backgroundColor: "#CFE2FF" }}
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">
                Page {currentPage} of {totalPages}
              </span>
            </li>
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                style={{ backgroundColor: "#CFE2FF" }}
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Result;
