import React, { useState } from "react";
import Filters from "./Filters/Index";
import Catalog from "./Catalog/Catalgo";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="row py-5 px-5">
            <div className="col-md-3">
              <Filters />
            </div>
            <div className="col-md-9">
              <Catalog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
