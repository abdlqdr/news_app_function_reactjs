import React from "react";
import spinner from "./spinner.webp";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-centertext-center">
      <img
        className="my-3"
        src={spinner}
        alt="loading"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default Spinner;
