import React from "react";

const Camera = () => {
  return (
    // <div className="w-full h-full ">
      <img
        src="http://192.168.35.236:81/stream"
        alt=""
        // style="display: block;-webkit-user-select: none; "
        className="w-[600px] h-[400px]"
      />
    // </div>
  );
};

export default Camera;
