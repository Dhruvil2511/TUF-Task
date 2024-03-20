import React, { useEffect, useState } from "react";

const Table = ({ submissions,currentPage,limit }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-borderless table-primary align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "10%" }}>No.</th>
              <th style={{ width: "15%" }}>Username</th>
              <th style={{ width: "15%" }}>Language</th>
              <th style={{ width: "20%" }}>Stdin</th>
              <th style={{ width: "20%" }}>Stdout</th>
              <th style={{ width: "20%" }}>Source code</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {submissions?.length > 0 &&
              submissions.map((submission, index) => (
                <tr key={index} className="table-primary">
                  <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                  <td>{submission?.username}</td>
                  <td>{submission?.code_language}</td>
                  <td>{submission?.standard_input}</td>
                  <td>
                    {submission?.standard_output?.length > 100
                      ? submission?.standard_output.slice(0, 100) + "..."
                      : submission?.standard_output}
                  </td>
                  <td>
                    {submission?.source_code?.length > 100
                      ? submission?.source_code.slice(0, 100) + "..."
                      : submission?.source_code}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
};

export default Table;
