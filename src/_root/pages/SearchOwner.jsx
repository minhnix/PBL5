import { useState } from "react";
import { Link } from "react-router-dom";

const SearchOwner = () => {
  let [textSearch, setTextSearch] = useState("");
  function handleTextChange(e) {
    setTextSearch(e.target.value);
  }
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">Search Owner</span>
        </div>
      </div>
      <div className="min-h-[450px]">
        <div className="flex items-center gap-2 mt-8 bg-white w-fit rounded-full overflow-hidden">
          <input
            onChange={handleTextChange}
            value={textSearch}
            className="w-[320px] py-2 px-4 border-none outline-none "
            type="text"
            name=""
            id=""
          />
          <Link
            to={`/owner?search=${textSearch}`}
            className="bx bx-search-alt-2 border py-1 px-2 text-xl rounded-full mr-1 cursor-pointer bg-primary-color text-white"
          ></Link>
        </div>
      </div>
    </>
  );
};

export default SearchOwner;
