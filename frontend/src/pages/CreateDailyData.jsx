import React, { useState, useEffect } from "react";
import api from "../api/axios";

const CreateDailyData = () => {
  const today = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' }).split(',')[0].split('/').reverse().join('-');
  const [date, setDate] = useState(today);
  const [hour, setHour] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Fetch daily data
  const fetchDailyData = async (selectedDate) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/dailydata/${selectedDate}`);
      setDailyData(response.data || []);
    } catch (err) {
      setError("No data found for the selected date.");
      setDailyData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when date changes
  useEffect(() => {
    fetchDailyData(date);
  }, [date]);

  // Handle input changes
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTaskChange = (e) => setSearchQuery(e.target.value);

  // Add task to selected tasks
  const handleAddTask = (taskId) => {
    setSelectedTasks((prevTasks) => [...prevTasks, taskId]);
    setSearchQuery(""); // Clear search query after adding task
  };

  // Remove task from selected tasks
  const handleRemoveTask = (taskId) => {
    setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
  };

  // Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (hour === null || selectedTasks.length === 0) {
      setError("Please select an hour and at least one task.");
      return;
    }

    const newDailyData = {
      date,
      works: [{ hour: hour, tasks: selectedTasks }],
      finances: [],
    };

    try {
      await api.post("/dailydata", newDailyData);
      setSuccess("Daily data saved successfully!");
      setHour(null);
      setSelectedTasks([]);
      fetchDailyData(date);
    } catch (err) {
      setError("Failed to save daily data.");
    }
  };

  // Get task name by ID
  const getTaskName = (taskId) => {
    const task = tasks.find((t) => t._id === taskId); 
    return task ?  (task.priority === "low" ? "🔽 " : task.priority === "medium" ? "🟡 " : "🔥 ") + task.title : "Unknown Task";
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto my-10 flex gap-6">
      {/* Left Side: Form */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">📝 Create Daily Data</h2>
    
        <form onSubmit={handleSubmit}>
          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">📅 Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Hour Selector (12-hour format with emojis) */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">⏰ Select Hour:</label>
            <div className="grid grid-cols-2 gap-4">
              {/* AM Hours */}
              <div>
                <h3 className="font-bold text-center">AM</h3>
                {Array.from({ length: 12 }, (_, index) => {
                  const hourNum = index + 1;
                  const isHourDataAvailable = dailyData.some((data) =>
                    data.works.some((work) => work.hour_id === hourNum)
                  );
                  return (
                    <button
                      key={hourNum}
                      type="button"
                      className={`p-2 m-1 rounded-md cursor-pointer ${
                        hour === hourNum
                          ? "bg-green-500 text-white"
                          : isHourDataAvailable
                          ? "bg-sky-500 text-black" // Highlight if data is available
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => setHour(hourNum)}
                    >
                      {hourNum < 10 ? "0" + hourNum : hourNum} {getHourEmoji(
                        hourNum)}
                    </button>
                  );
                })}
              </div>

              {/* PM Hours */}
              <div>
                <h3 className="font-bold text-center">PM</h3>
                {Array.from({ length: 12 }, (_, index) => {
                  const hourNum = index + 13; // 13-24 for PM
                  const isHourDataAvailable = dailyData.some((data) =>
                    data.works.some((work) => work.hour_id === hourNum)
                  );
                  return (
                    <button
                      key={hourNum}
                      type="button"
                      className={`p-2 m-1 rounded-md cursor-pointer ${
                        hour === hourNum
                          ? "bg-green-500 text-white"
                          : isHourDataAvailable
                          ? "bg-blue-600 text-white" // Highlight if data is available
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => setHour(hourNum)}
                    >
                      {hourNum} {getHourEmoji(
                        hourNum)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Task Search and Selector */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">
            🔍 Search and Select Tasks:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleTaskChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Search tasks..."
            />
            {searchQuery && filteredTasks.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 max-h-60 overflow-y-auto z-10">
                {filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    onClick={() => handleAddTask(task._id)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Display selected tasks */}
          <div className="mb-4">
            {selectedTasks.map((taskId) => (
              <div
                key={taskId}
                className="flex items-center justify-between py-1 px-2 bg-gray-200 rounded-md my-1"
              >
                <span>{getTaskName(taskId)}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTask(taskId)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Work
          </button>

          {/* Error & Success Messages */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </div>

      {/* Right Side: Display Data */}
      <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Existing Data for 📅  {date}:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : dailyData.length > 0 ? (
          <div className="flex justify-between">
            {/* Morning (AM) */}
            <div className="mr-6 w-full">
              <h4 className="font-bold text-lg mb-5">🌅 Morning (1-12)</h4>
              {dailyData.map((data) =>
                data.works
                  .filter((work) => work.hour_id <= 12) // Filter AM hours (1-12)
                  .map((work) => (
                    <div
                      key={work._id}
                      className="bg-white p-4 rounded mb-2 shadow"
                    >
                      <h5 className="font-bold text-right absolute bg-white">{getHourEmoji(
                        work.hour_id)} {work.hour_id} </h5>
                      {work.task_ids.map((taskId) => (
                        <div
                          className="bg-gray-100 p-2 rounded mb-2"
                          key={taskId}
                        >
                          {" "}
                          {getTaskName(taskId)}
                        </div>
                      ))}
                    </div>
                  ))
              )}
            </div>

            {/* Afternoon (PM) */}
            <div className="w-full">
              <h4 className="font-bold text-lg mb-5">🌇 Afternoon (13-24)</h4>
              {dailyData.map((data) =>
                data.works
                  .filter((work) => work.hour_id > 12) // Filter PM hours (13-24)
                  .map((work) => (
                    <div
                      key={work._id}
                      className="bg-white p-4 rounded-lg mb-2 shadow"
                    >
                      <h5 className="font-bold text-right absolute bg-white">{getHourEmoji(
                        work.hour_id)}  {work.hour_id} </h5>
                      {work.task_ids.map((taskId) => (
                        <div
                          className="bg-gray-100 p-2 rounded mb-2"
                          key={taskId}
                        >
                          {" "}
                          {getTaskName(taskId)}
                        </div>
                      ))}
                    </div>
                  ))
              )}
            </div>
          </div>
        ) : (
          <p>No data found for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default CreateDailyData;
