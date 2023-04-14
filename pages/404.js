import Link from "next/link";
import React from "react";

function ErrorPage() {
  return (
    <div className="main-content">
      <div className="row justify-content-center ">
        <div className="d-flex justify-content-center pt-5">
          <span className="error-page-404">404</span>
          <div className="ms-4 p-1">
            <p className="fs-3 mb-1">Page not found</p>
            <p>
              Navigate to{" "}
              <Link href="/" style={{ color: "gray", textDecoration: "none" }}>
                Home page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
