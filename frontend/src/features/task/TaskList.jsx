import React, { useEffect, useState } from "react";
import api from "../../api/axios"; // Your Axios API instance
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks"); // Your endpoint for fetching tasks
        setTasks(response.data); // Assuming the response is an array of tasks
      } catch (err) {
        setError("Error fetching tasks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty array to ensure the effect runs only once

  if (loading) {
    return (
      <div className="container mx-auto mt-10 flex justify-center">
        <span className="text-lg text-gray-700">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 flex justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }
  let i = 1;

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Task List <span role="img" aria-label="clipboard">📝</span>
      </h2>
      <Link
        to="/task-create"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg shadow-md mb-6 inline-block text-lg"
      >
        Create New Task <span role="img" aria-label="plus">➕</span>
      </Link>

      {tasks.length === 0 ? (
        <div className="text-lg text-gray-600">No tasks available.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded border border-gray-300">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Number</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Priority</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Type</th> 
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Hours spent</th> 
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition ease-in-out"
                >
                <td className="py-3 px-4 text-sm text-gray-800">
                  <span className="font-semibold">{i++}</span>
                </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    <span className="font-semibold">{task.title}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 w-96">{task.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                  {task.priority === "low" ? "🔽 Low" : task.priority === "medium" ? "🟡 Medium" : "🔥 High"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                  {task.type === "hourly" ? `${task.hoursNeeded} ⏰ hours` : task.type === "todo" ? "📋 To-Do" : "✅ Regular"}

                    </td> 
                  <td className="py-3 px-4 text-sm text-gray-600">00</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${task.status === "completed" ? "bg-green-500 text-white" : task.status === "in-progress" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      {task.status} <span role="img" aria-label={task.status === "completed" ? "check" : "hourglass"}>{task.status === "completed" ? "✅" : task.status === "in-progress" ? "⌛️" : "⏳"}</span>
                    </span>
                  </td>
                  <td className="py-1 px-4 text-sm">
                    <Link
                      to={`/task-view/${task._id}`}
                      className="text-blue-600 hover:underline inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                      View <span role="img" aria-label="eye">👁️</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskList;
