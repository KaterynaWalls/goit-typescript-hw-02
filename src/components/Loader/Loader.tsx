import React from "react";
import s from "./Loader.module.css";
import { MagnifyingGlass } from "react-loader-spinner";
const Loader: React.FC = () => {
  return (
    <div className={s.loaderContainer}>
      {" "}
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loader;
