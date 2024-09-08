import React from "react";
import LoadingSpin from "react-loading-spin";

const Loading = () => {
  return (
    <div className="loading p-5">
      <LoadingSpin
        primaryColor="blue"
        numberOfRotationsInAnimation={1}
      />
    </div>
  );
};

export default Loading;
