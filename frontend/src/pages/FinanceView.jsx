import React, { useEffect, useState } from "react";
import api from "../api/axios";

const FinanceView = () => {
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const fetchFinanceData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`dailydata?month=${selectedMonth}`);
        setFinanceData(response.data);
      } catch (err) {
        setError("❌ Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchFinanceData();
  }, [selectedMonth]);

  const getFinancesByDate = (date) => {
    const financeInfo = financeData.find((entry) => entry.date === date);
    if (!financeInfo || financeInfo.finances.length === 0) {
      return <span className="text-gray-500">🚫 No transactions</span>;
    }

    return financeInfo.finances.map((finance) => (
      <div key={finance._id} className="p-2 border-b flex items-center gap-2">
        {finance.inOrOut === "in" ? "💰 Income:" : "💸 Expense:"}
        <span
          className={
            finance.inOrOut === "in" ? "text-green-500" : "text-red-500"
          }
        >
          {finance.amount} BDT
        </span>
      </div>
    ));
  };

  return (
    <div className="container mx-auto my-10">
    <h1 className="text-3xl font-semibold mb-4 text-center mb-4">
      📊 Finance Overview -{" "}
      {new Date(2025, selectedMonth - 1).toLocaleString("en-US", {
        month: "long",
      })}{" "}
      2025
    </h1>
      <div className=" p-4 bg-blue-100 shadow rounded mb-4">
        <div className="flex items-center gap-4">
          <label className="text-lg font-medium">📅 Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="p-2 border rounded bg-white shadow-sm"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2025, i).toLocaleString("en-US", { month: "long" })}{" "}
                📆
              </option>
            ))}
          </select>
        </div>
      </div>


      {loading && (
        <div className="flex justify-center py-4">
          <span className="animate-spin text-3xl">⏳</span>
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto text-sm">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="px-4 py-2 text-left border-b">📅 Date</th>
                <th className="px-4 py-2 text-left border-b">
                  💰 Finance Info
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(31)].map((_, index) => {
                const date = new Date(2025, selectedMonth - 1, index + 1);
                if (date.getMonth() + 1 !== selectedMonth) return null;

                const dateStr = date.toISOString().split("T")[0];

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200">
                      📆 {dateStr}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {getFinancesByDate(dateStr)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FinanceView;
