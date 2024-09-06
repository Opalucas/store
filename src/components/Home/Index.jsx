import React, { useState } from "react";
import Filters from "./Filters/Index";
import Header from "./Header/Index";
import Catalog from "./Catalog/Catalgo";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="row py-5 px-5">
            <Filters />
            <Catalog />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
