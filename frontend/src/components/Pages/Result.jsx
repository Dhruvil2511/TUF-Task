import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Table from "../Table";
import axios from "axios";
import "../../App.css";
const Result = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const fetchSubmissions = async () => {
    setIsLoading(true);
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
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
            zIndex: 9999, // higher z-index to ensure it's above other elements
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="container-fluid w-100">
        <div className="mt-3">
          <h3 className="text-white text-center">Submissions</h3>
          <Table
            submissions={submissions}
            currentPage={currentPage}
            limit={10}
          />
        </div>
        <nav
        aria-label="Page navigation"
        className="mt-5 paginate"
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button 
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
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
            style={{backgroundColor:"blue", color:"white"}}
              className="page-link "
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
