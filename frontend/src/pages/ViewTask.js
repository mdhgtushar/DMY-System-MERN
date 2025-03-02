import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from '../api/axios';

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tasks/' + id);
        if (!response) throw new Error("Failed to fetch task");
        setTask(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      alert("Task deleted successfully!");
      navigate("/task-list");
    } catch (err) {
      alert("Failed to delete task: " + err.message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading task...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!task) return <p className="text-center text-gray-500">No task found.</p>;

  return (
    <div className="container mx-auto bg-white my-10">
      <Link to={`/task-list`} className="text-blue-500 hover:underline mr-2 px-2 border">Go Back</Link>
      
      <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
      <p className="text-gray-500 text-sm mt-1">📅 Due: {task.dueDate || "No deadline"}</p>
      <p className="text-gray-500 text-sm">📌 Priority: <strong>{task.priority}</strong></p>
      <p className="text-gray-700 mt-3">{task.description || "No description available."}</p>

      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            task.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-500 text-sm mt-2">🛠 Type: {task.type}</p>

      {task.type === "hourly" && (
        <p className="text-gray-500 text-sm">⏳ Hours Needed: {task.hoursNeeded || "Not specified"}</p>
      )}

      <p className="text-gray-500 text-sm">📆 Execution Date: {task.executionDate || "Not set"}</p>
      <p className="text-gray-500 text-sm">👤 Assigned to: {task.user || "Unknown"}</p>

      <div className="mt-4">
        <Link to={`/task-edit/${task._id}`} className="text-blue-500 hover:underline mr-2 px-2 border">
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline mr-2 px-2 border"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewTask;
