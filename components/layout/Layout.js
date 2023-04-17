"use client";
import { useMediaQuery } from "react-responsive";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [isError, setError] = useState(false);
  const isWidth = useMediaQuery({ query: `(min-width: 900px)` });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  // const isError = !isPortrait || isWidth ? true : false;

  useEffect(() => {
    isWidth && !isPortrait ? setError(false) : setError(true);
  }, []);

  return (
    <>
      {!isError ? (
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <div
          id="wrapper"
          className="min-vh-100 bg-dark d-flex flex-column p-5 justify-content-center align-items-center"
        >
          <img
            src="/images/warning-icon.png"
            alt="image error"
            className="w-50 h-50 mb-4 "
          />
          <p className="text-gray-700 fs-4">
            Oops! Looks like site doesn't fit the screen size
          </p>
          <p className="fs-6">
            Please use a landscape mode, with minimum width 900px
          </p>
        </div>
      )}
    </>
  );
};

export default Layout;
