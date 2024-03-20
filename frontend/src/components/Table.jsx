import React, { useEffect, useState } from "react";

const Table = () => {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    //
  };
  useEffect(() => {
    fetchSubmissions();
  }, []);
  return (
    <>
      <div class="table-responsive">
        <table class="table table-striped table-hover table-borderless table-primary align-middle">
          <thead class="table-dark">
            <caption>Table Name</caption>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Code language</th>
              <th>standart input (stdin)</th>
              <th>standard output (stdout)</th>
              <th>source code</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {submissions.length > 0 ? (
              <tr class="table-primary">
                <td scope="row">1</td>
                <td>Item</td>
                <td>Item</td>
              </tr>
            ) : (
              <h3>Error fetching from db...</h3>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
};

export default Table;
