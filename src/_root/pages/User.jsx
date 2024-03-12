const User = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">User</span>
        </div>
        <div>
          <button
            className="px-2 py-1 bg-primary-color rounded flex items-center justify-center gap-1 hover:opacity-80"
            type="button"
          >
            <i className="bx bx-plus text-white"></i>
            <span className="text-white">Create</span>
          </button>
        </div>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                STT
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Name
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Phone
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Vehicle
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="text-left p-4 border-b text-sm">1</td>
              <td className="text-left p-4 border-b text-sm">NQD</td>
              <td className="text-left p-4 border-b text-sm">0369394745</td>
              <td className="text-left p-4 border-b text-sm">3</td>
              <td className="text-left p-4 border-b text-sm">
                <div className="w-full h-full flex items-center ">
                  <div className="rounded p-1 border border-[#8bcc6b] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75">
                    <i className="bx bx-show text-[#4dc015]"></i>
                  </div>
                  <div className="rounded p-1 border border-[#d9d9d9]  hover:border-primary-color max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer ">
                    <i className="bx bx-edit-alt hover:text-primary-color"></i>
                  </div>
                  <div className="rounded p-1 border border-[#ff4d4f] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75">
                    <i className="bx bx-trash-alt text-[#ff4d4f]"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
