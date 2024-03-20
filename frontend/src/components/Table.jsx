import React, { useEffect, useState } from "react";

const Table = ({ submissions }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-borderless table-primary align-middle">
          <thead className="table-dark">
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Code language</th>
              <th>standart input (stdin)</th>
              <th>standard output (stdout)</th>
              <th>source code</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {submissions?.length > 0 &&
              submissions.map((submission, index) => (
                <tr key={index} className="table-primary">
                  <th scope="row">{index + 1}</th>
                  <td>{submission?.username}</td>
                  <td>{submission?.code_language}</td>
                  <td>{submission?.standard_input}</td>
                  <td>{submission?.standard_output}</td>
                  <td>
                    {submission?.source_code?.length > 100
                      ? submission?.source_code.trim(0, 100) + "..."
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
