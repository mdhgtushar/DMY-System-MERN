import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVision, updateVision } from "./visionSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const EditVisionBoard = () => {
  const dispatch = useDispatch();
  const { vision, status, error } = useSelector((state) => state.vision);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVision());
    }
    if (status === "success") {
      setEditData(vision);
    }
  }, [dispatch, status, vision]);

  // ✅ Form Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateVision({vision: editData})); // Redux thunk action call

    if (updateVision.fulfilled.match(result)) {
      // 🔹 Success হলে Toast দেখাবে
      toast.success("Vision Board updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    } else if (updateVision.rejected.match(result)) {
      // 🔹 Error হলে Toast দেখাবে
      toast.error("Failed to update Vision Board!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  };

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10">
      <ToastContainer /> {/* 🔹 Toast Container এখানে রাখুন */}
      
      <div className="mb-5">
        <Link
          to="/vision-board"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-5 inline-block"
        >
          View Vision Board
        </Link>
      </div>
      
      <h2>Edit Vision Board</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={editData}
          onChange={(e) => setEditData(e.target.value)}
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
