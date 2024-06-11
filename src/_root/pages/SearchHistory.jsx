import { useState } from "react";
import { Link } from "react-router-dom";

const SearchHistory = () => {
  let [textSearch, setTextSearch] = useState("");
  let [dateSearch, setDateSearch] = useState("");

  function handleTextChange(e) {
    setTextSearch(e.target.value);
  }
  function handleDateChange(e) {
    setDateSearch(e.target.value);
  }
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">Search History</span>
        </div>
      </div>
      <div className="min-h-[450px]">
        <div className="flex items-center gap-2 mt-8  w-fit  overflow-hidden">
          <span className="w-[40px]">Text:</span>
          <input
            onChange={handleTextChange}
            value={textSearch}
            className="w-[320px] py-2 px-4 border-none outline-none rounded-full bg-white"
            type="text"
            name=""
            id=""
          />
          {/* <Link
            to={`/owner?search=${textSearch}`}
            className="bx bx-search-alt-2 border py-1 px-2 text-xl rounded-full mr-1 cursor-pointer bg-primary-color text-white"
          ></Link> */}
        </div>
        <div className="flex items-center gap-2 mt-8  w-fit overflow-hidden">
          <span className="w-[40px]">Date: </span>
          <input
            onChange={handleDateChange}
            value={dateSearch}
            className="w-[320px] py-2 px-4 border-none  rounded-full outline-none bg-white"
            type="date"
            name=""
            id=""
          />
        </div>
        <div className="flex items-center gap-2 mt-8  w-fit overflow-hidden justify-center">
          <Link
            to={`/history?search=${textSearch}&searchDate=${dateSearch}`}
            className=" border py-1 px-2 text-xl  cursor-pointer bg-success-color text-white"
          >
            Search
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchHistory;
