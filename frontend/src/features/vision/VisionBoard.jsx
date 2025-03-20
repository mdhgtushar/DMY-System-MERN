import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVision } from "./visionSlice";

const VisionBoard = () => {
  const { vision, status, error } = useSelector((state) => state.vision);
  const dispetch = useDispatch();

  useEffect(() => {
    dispetch(fetchVision());
  }, [dispetch]);

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  
    return (
      <div className="container mx-auto my-10">
        <div
          className="shadow border border-gray-300 p-4 mt-5"
          dangerouslySetInnerHTML={{ __html: vision ? vision : "No vision Found" }}
        />
        <div>
          <Link
            to="/edit-vision-board"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block"
          >
            Edit Vision Board
          </Link>
        </div>
      </div>
    );
  
};

export default VisionBoard;
