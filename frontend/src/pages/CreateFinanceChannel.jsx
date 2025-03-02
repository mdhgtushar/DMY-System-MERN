import React, { useState } from 'react';
import api from '../api/axios'; // Make sure to import your axios API instance
import { Link } from 'react-router-dom';

const CreateFinanceChannel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input before making the API call
    if (!title || !description) {
      setMessage('Please fill in both fields.');
      setMessageType('error');
      return;
    }

    try {
      const response = await api.post('/finance', { title, description });
      setMessage('Finance Channel created successfully!');
      setMessageType('success');
      setTitle('');
      setDescription('');
      console.log('Created Finance Channel:', response);
    } catch (error) {
      setMessage('Error creating Finance Channel.');
      setMessageType('error');
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <Link to="/finance-channel-list" className="text-blue-500 hover:underline px-2 border mr-2 mb-4 ">Finance Channel List</Link>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Finance Channel</h2>

      {/* Show message if available */}
      {message && (
        <div
          className={`mb-4 p-3 text-white rounded-md ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter channel title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter channel description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateFinanceChannel;
