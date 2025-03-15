import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ViewDailyData = () => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month (1-12)
  const [selectedWeek, setSelectedWeek] = useState(""); // Default: No week selected

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dailydata");
        const data = response.data;

        const yearData = [];
        const startDate = new Date("2025-01-01");
        const endDate = new Date("2025-12-31");

        // Loop through the entire year
        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          const dateStr = date.toISOString().split("T")[0]; // Get date in 'YYYY-MM-DD' format
          const dataForTheDay = data.find((item) => item.date === dateStr);

          // If data exists for this date, push it to yearData, otherwise push an empty object
          if (dataForTheDay) {
            yearData.push({ date: dateStr, data: dataForTheDay });
          } else {
            yearData.push({ date: dateStr, data: null });
          }
        }
        setDailyData(yearData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data by month
  const filteredDataByMonth = dailyData.filter((day) => {
    const month = new Date(day.date).getMonth() + 1; // Get month from date (1-12)
    return month === parseInt(selectedMonth);
  });

  // Filter data by week (if week is selected)
  const filteredDataByWeek = selectedWeek
    ? filteredDataByMonth.filter((day) => {
        const date = new Date(day.date);
        const weekNumber = Math.ceil((date.getDate() - date.getDay()) / 7); // Get week number
        return weekNumber.toString() === selectedWeek;
      })
    : filteredDataByMonth;

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }
  const getHourEmoji = (hour) => {
    if (hour >= 1 && hour <= 4) return "🌙"; // Late Night
    if (hour === 5) return "🌄"; // Early Morning
    if (hour === 6) return "🌅"; // Sunrise
    if (hour >= 7 && hour <= 11) return "🌞"; // Morning
    if (hour === 12) return "☀️"; // Noon
    if (hour >= 13 && hour <= 15) return "☀️"; // Afternoon
    if (hour === 16) return "🌤️"; // Late Afternoon
    if (hour === 17) return "🌆"; // Early Evening
    if (hour === 18) return "🌇"; // Sunset
    if (hour >= 19) return "🌙"; // Night
  };

  return (
    <div className="p-10 text-sm">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        View Daily Data (2025)
      </h2>
      <div className="flex justify-between items-center mb-4 bg-blue-100 p-6 rounded shadow">
        {/* বাম পাশে টেক্সট */}
        <h2 className="text-xl font-semibold text-gray-700">📊 Filter Data </h2>

        {/* ডান পাশে ড্রপডাউন */}
        <div className="flex space-x-4">
          {/* মাস নির্বাচন */}
          <div className="flex items-center space-x-2">
            <label className="text-gray-600">📅 Month:</label>
            <select
              name="months"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              <option value="1">🌱 January</option>
              <option value="2">💖 February</option>
              <option value="3">🌸 March</option>
              <option value="4">🌿 April</option>
              <option value="5">☀️ May</option>
              <option value="6">🌊 June</option>
              <option value="7">🎆 July</option>
              <option value="8">🌻 August</option>
              <option value="9">🍂 September</option>
              <option value="10">🎃 October</option>
              <option value="11">🍁 November</option>
              <option value="12">❄️ December</option>
            </select>
          </div>

          {/* সপ্তাহ নির্বাচন */}
          <div className="flex items-center space-x-2">
            <label className="text-gray-600">📆 Week:</label>
            <select
              name="weeks"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              <option value="">📅 All Weeks</option>
              <option value="1">1️⃣ Week 1</option>
              <option value="2">2️⃣ Week 2</option>
              <option value="3">3️⃣ Week 3</option>
              <option value="4">4️⃣ Week 4</option>
            </select>
          </div>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 text-left border-b border-gray-400 py-4">
              Date
            </th>
            {[...Array(24)].map((_, index) => (
              <th key={index} className="text-left border-b text-left">
                {`${getHourEmoji(index + 1)}${index + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredDataByWeek.map((day, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 border-b border-gray-200 py-0">{day.date}</td>
              {[...Array(24)].map((_, hourIndex) => {
                const workForHour = day.data
                  ? day.data.works.find(
                      (work) => work.hour_id === hourIndex + 1
                    )
                  : null;

                const colors = [
                  "bg-red-100",
                  "bg-blue-100",
                  "bg-purple-100",
                  "bg-green-100",
                  "bg-yellow-100",
                  "bg-pink-100",
                  "bg-cyan-100",
                  "bg-indigo-100",
                  "bg-gray-100",
                  "bg-orange-100",
                  "bg-teal-100",
                  "bg-lime-100",
                ];

                return (
                  <td
                    key={hourIndex}
                    className={`px-4 border-b border-gray-200 ${
                      colors[hourIndex % colors.length]
                    }`}
                  >
                    {workForHour ? (
                      <div>
                        {workForHour.task_ids.map((task) => (
                          <span key={task._id}>
                            <span className="text-gray-800">
                              {task.priority === "low"
                                ? "🔽"
                                : task.priority === "medium"
                                ? "🟡"
                                : "🔥"}
                            </span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDailyData;
