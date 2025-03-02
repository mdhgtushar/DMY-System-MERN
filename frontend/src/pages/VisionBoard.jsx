import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const VisionBoard = () => {
    const [visionBoard, setVisionBoard] = useState("");
    
    useEffect(() => {
        getVisionBoard();
    }, []);
    
    const getVisionBoard = async () => {
        try {
            const response = await api.get('/vision');
            setVisionBoard(response.data.vision);  // Assuming response.data.vision contains HTML content
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
       <div className='container mx-auto my-10'>
      
         <div className='shadow border border-gray-300 p-4 mt-5' dangerouslySetInnerHTML={{ __html: visionBoard }} />
         <div>
        <Link to="/edit-vision-board" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block">Edit Vision Board</Link>
        </div>
       </div>
    );
};

export default VisionBoard;
