import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const History = () => {
  let query = useQuery();

  let [history, setHistory] = useState([]);

  let [start, setStart] = useState(0);

  let [historyId, setHistoryId] = useState("");

  let [page, setPage] = useState(0);

  let [totalHistory, setTotalHistory] = useState(0);

  useEffect(() => {
    let url = `http://localhost:3000/api/history?limit=7&page=${page + 1}`;
    if (query.get("search")) {
      url += `&search=${query.get("search")}`;
    }
    if (query.get("searchDate")) {
      url += `&searchDate=${query.get("searchDate")}`;
    }
    console.log(url);
    axios.get(url).then((response) => {
      setHistory(response.data.data.history);
      console.log(response.data.data.history);
      setTotalHistory(response.data.total);
      setStart(response.data.start);
    });
  }, [page]);

  function handleDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDateTime = dateTime.toLocaleDateString("en-US", options);

    const optionsHour = { hour: "2-digit", minute: "2-digit" };
    const formatHour = dateTime.toLocaleTimeString("en-US", optionsHour);
    return formatHour + " " + formattedDateTime;
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">History</span>
        </div>
        <div className="flex flex-row gap-4">
          <Link
            className="px-2 py-1 bg-success-color rounded flex items-center justify-center gap-1 hover:opacity-80"
            type="button"
            to={"/searchHistory"}
          >
            <i className="bx bx-search-alt-2 text-white"></i>
            <span className="text-white">Search</span>
          </Link>
        </div>
      </div>
      <div className="min-h-[450px]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                STT
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Number Plate
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Time
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Type
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {history.map((his, index) => {
              return (
                <tr key={his.id}>
                  <td className="text-left p-4 border-b text-sm">
                    {start + index + 1}
                  </td>
                  <td className="text-left p-4 border-b text-sm">
                    {his.__vehicle__?.numberPlate}
                  </td>

                  <td className="text-left p-4 border-b text-sm">
                    {handleDate(his.createdAt)}
                  </td>
                  <td className="text-left p-4 border-b text-sm">{his.type}</td>
                  <td className="text-left p-4 border-b text-sm">
                    <div className="w-full h-full flex items-center ">
                      <div className="rounded p-1 border border-[#8bcc6b] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75">
                        <Link className="block" to={`/view-history/${his.id}`}>
                          <i className="bx bx-show text-[#4dc015]"></i>
                        </Link>
                      </div>
                      {/* <span>Picture</span> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex items-center justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(it) => {
            setPage(it.selected);
          }}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(totalHistory / 7)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="flex gap-2 items-center justify-center"
          pageClassName="border border-[#b5b5b5] min-w-[34px] min-h-[34px] rounded flex items-center justify-center"
          activeClassName="bg-primary-color text-white"
          previousClassName="border border-[#b5b5b5] px-2 py-1 rounded"
          nextClassName="border border-[#b5b5b5] px-2 py-1 rounded"
          pageLinkClassName="w-full h-full  px-2 py-1 text-center"
          initialPage={page}
        />
      </div>
    </>
  );
};

export default History;
