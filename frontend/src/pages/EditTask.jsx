import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
    type: "todo",
    priority: "low",
    hoursNeeded: "",
    dueDate: "",
    executionDate: "", 
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams(); // Getting task id from the URL
  const navigate = useNavigate();

  // Fetch task data when the component mounts or when task ID changes
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTaskData(response.data);
      } catch (error) {
        setError("❌ Failed to load task data");
        console.error(error);
      }
    };
    
    fetchTaskData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/tasks/${id}`, taskData);
      setSuccessMessage("✅ Task updated successfully!");
      setError("");

      setTimeout(() => navigate("/task-list"), 2000);
    } catch (error) {
      setError("❌ Failed to update task");
      setSuccessMessage("");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Task ✨</h2>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-500 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-500 rounded-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700">Title 📝</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter task title"
            required
          />
        </div>
 

        <div>
          <label className="block text-lg font-semibold text-gray-700">Description 📜</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter task description"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Status ⏳</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Priority 🚨</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Type 📌</label>
          <select
            name="type"
            value={taskData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          >
            <option value="regular">Regular</option>
            <option value="todo">To-Do</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>

        {/* Hours Needed field only shows when type is "hourly" */}
        {taskData.type === "hourly" && (
          <div>
            <label className="block text-lg font-semibold text-gray-700">Hours Needed ⏰</label>
            <input
              type="number"
              name="hoursNeeded"
              value={taskData.hoursNeeded}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter estimated hours"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-lg font-semibold text-gray-700">Due Date 📅</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">Execution Date ⏳</label>
          <input
            type="date"
            name="executionDate"
            value={taskData.executionDate}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Update Task ✨
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
