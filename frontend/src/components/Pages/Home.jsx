import React from "react";
import Navbar from "../Navbar";

import CodingIDE from "../CodeEditor/CodingIDE.jsx";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid w-100">
        <CodingIDE />
      </div>
    </>
  );
};

export default Home;
