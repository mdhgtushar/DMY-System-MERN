import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const EditVisionBoard = () => {
  const [visionBoard, setVisionBoard] = useState("");
  const [updatedVisionBoard, setUpdatedVisionBoard] = useState("");
  const [message, setMessage] = useState(""); // To store the message
  const [messageType, setMessageType] = useState(""); // To determine message type: success or error

  useEffect(() => {
    getVisionBoard();
  }, []);

  // Fetch the current vision board content
  const getVisionBoard = async () => {
    try {
      const response = await api.get("/vision");
      setVisionBoard(response.data.vision); // Assuming response.data.vision contains the current HTML content
      setUpdatedVisionBoard(response.data.vision); // Set initial value in the input
    } catch (error) {
      setMessage("Error fetching vision board.");
      setMessageType("error");
      console.log(error);
    }
  };

  // Handle the change in the input field
  const handleChange = (e) => {
    setUpdatedVisionBoard(e.target.value);
  };

  // Submit the updated vision board content
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/vision", { vision: updatedVisionBoard });
      setMessage("Vision board updated successfully!");
      setMessageType("success");
      console.log("Vision board updated:", response);
    } catch (error) {
      setMessage("Error updating vision board.");
      setMessageType("error");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="mb-5">
        <Link
          to="/vision-board"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-5 inline-block"
        >
          View Vision Board
        </Link>
      </div>
      <h2>Edit Vision Board</h2>
      {/* Show message if available */}
      {message && (
        <div
          className={`mb-4 p-3 text-white rounded-md ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={updatedVisionBoard}
          onChange={handleChange}
          rows="10"
          cols="50"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Vision Board
        </button>
      </form>
    </div>
  );
};

export default EditVisionBoard;
