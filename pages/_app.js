import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core";
import "../styles/app.scss";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.title = "EDEN";
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
