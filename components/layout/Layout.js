import { useMediaQuery } from "react-responsive";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  const isWidth = useMediaQuery({ query: `(min-width: 900px)` });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  if (!isWidth || isPortrait) {
    return (
      <div
        id="wrapper"
        className="min-vh-100 bg-dark d-flex flex-column justify-content-center align-items-center"
      >
        <img
          src="https://source.unsplash.com/400x400?error"
          alt="image error"
          className="w-25 h-25 mb-4 "
        />
        <p className="text-gray-700 fs-4">
          Oops! Looks like site doesn't fit the screen size
        </p>
        <p className="fs-6">
          Please use a landscape mode, with minimum width 900px
        </p>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

export default Layout;
