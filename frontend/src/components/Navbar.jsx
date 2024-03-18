import React from "react";
import logo from "../assets/image.png";
const Navbar = () => {
  return (
    <>
      <nav className="navbar sticky-top    bg-secondary bg-gradient">
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center">
            <a className="navbar-brand  " href="#">
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="24"
                style={{ borderRadius: "50%" }}
                className="d-inline-block align-text-top"
              />
            </a>
            <span className="text-white"> takeUforward Task</span>
          </div>
          <a href="https://github.com/Dhruvil2511/TUF-Task">Github</a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
