import React from "react";
import LoadingSpin from "react-loading-spin";

const Loading = () => {
  return (
    <div className={"ExampleOfUsage"}>
      <LoadingSpin
        primaryColor="blue"
        numberOfRotationsInAnimation={1}
      />
    </div>
  );
};

export default Loading;
