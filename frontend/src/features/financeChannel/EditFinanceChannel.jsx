import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const EditFinanceChannel = () => {
  const { id } = useParams();  // Get the ID of the finance channel from the URL
  const [channel, setChannel] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch the finance channel details when the component mounts
  useEffect(() => {
    getFinanceChannel();
  }, [id]);

  const getFinanceChannel = async () => {
    try {
      const response = await api.get(`/finance/${id}`);
      setChannel(response.data);  // Assuming response.data contains channel details
    } catch (error) {
      setError('Failed to fetch channel data');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChannel(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/finance/${id}`, channel);
      setSuccessMessage('Finance channel updated successfully!');
      setTimeout(() => navigate('/finance-channel-list'), 2000);  // Redirect after 2 seconds
    } catch (error) {
      setError('Failed to update finance channel');
      console.error(error);
    }
  };

  return (
    <div className="p-10 w-96 mx-auto shadow h-screen">
      <h2 className="text-2xl font-bold mb-6">Edit Finance Channel</h2>

      {/* Show error message */}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-200 border border-red-500 rounded-md">
          {error}
        </div>
      )}

      {/* Show success message */}
      {successMessage && (
        <div className="mb-4 p-4 text-green-700 bg-green-200 border border-green-500 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Form for editing the finance channel */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={channel.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter channel title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={channel.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter channel description"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditFinanceChannel;
