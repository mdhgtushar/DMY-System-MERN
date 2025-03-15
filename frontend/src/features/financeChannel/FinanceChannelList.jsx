import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const FinanceChannelList = () => {
  const [financeChannels, setFinanceChannels] = useState([]);

  const getList = async () => {
    try {
      const response = await api.get("/finance");
      setFinanceChannels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Finance Channel List <span role="img" aria-label="clipboard">📝</span>
      </h2>
      <Link
        to={"/finance-channel-create"}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md mb-6 inline-block text-lg"
      >
        Create Finance Channel <span role="img" aria-label="add">➕</span>
      </Link>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-300">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="py-3 px-4 text-sm font-semibold text-gray-700">Channel <span role="img" aria-label="channel">📡</span></th>              <th className="py-3 px-4 text-sm font-semibold text-gray-700">Balance <span role="img" aria-label="note">📝</span></th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-700">Expense <span role="img" aria-label="note">📝</span></th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-700">Input <span role="img" aria-label="note">📝</span></th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-700">Actions <span role="img" aria-label="action">⚙️</span></th>
            </tr>
          </thead>
          <tbody>
            {financeChannels.map((channel) => (
              <tr
                key={channel._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition ease-in-out"
              >
                <td className="py-3 px-4 text-sm text-gray-800">
                  <div className="font-semibold text-xl">{channel?.title}</div>
                  <p className="py-3 text-sm text-gray-600">{channel?.description}</p>
                </td>
                
                <td  className="py-3 text-sm text-gray-600 px-4">00</td>
                <td  className="py-3 text-sm text-gray-600 px-4">00</td>
                <td  className="py-3 text-sm text-gray-600 px-4">00</td>
                <td className="py-3 px-4 text-sm">
                  <Link
                    to={`/finance-channel-view/${channel._id}`}
                    className="text-blue-600 hover:underline bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                  >
                    View <span role="img" aria-label="eye">👁️</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceChannelList;
