const History = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">History</span>
        </div>
        {/* <div>
          <button
            className="px-2 py-1 bg-primary-color rounded flex items-center justify-center gap-1 hover:opacity-80"
            type="button"
          >
            <i className="bx bx-plus text-white"></i>
            <span className="text-white">Create</span>
          </button>
        </div> */}
      </div>
      <div>
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="text-left p-4 border-b text-sm">1</td>
              <td className="text-left p-4 border-b text-sm">74L1-01589</td>
              <td className="text-left p-4 border-b text-sm">14:04AM</td>
              <td className="text-left p-4 border-b text-sm">
                <div className="w-full h-full flex items-center ">
                  <div className="rounded p-1 border border-[#8bcc6b] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75">
                    <i className="bx bx-show text-[#4dc015]"></i>
                  </div>
                  <span>Picture</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
