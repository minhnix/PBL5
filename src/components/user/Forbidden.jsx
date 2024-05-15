import React from "react";
import { Link } from "react-router-dom";

const Forbidden = ({ text, navigate, title, nameButton }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img
        src="https://i.pinimg.com/originals/91/22/07/912207f3b7e2120c417d73ebc411f949.png"
        alt=""
        className="w-[320px] h-[320px]"
      />
      <span className="mt-2 block text-3xl font-semibold">{title}</span>
      <span className="block mt-2">{text}</span>
      <Link
        to={navigate}
        className="py-2 px-4 rounded-full bg-primary-color text-white font-semibold mt-4"
      >
        {nameButton}
      </Link>
    </div>
  );
};

export default Forbidden;
