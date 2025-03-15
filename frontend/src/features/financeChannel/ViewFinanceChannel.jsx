import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from '../../api/axios'; // Assuming you've set up axios API calls in this file

const ViewFinanceChannel = () => {
  const { id } = useParams(); // Extract the channel id from URL
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchChannel = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/finance/${id}`); // Fetch data from the API
        if (!response) throw new Error("Failed to fetch channel data");
        const data = await response.data;
        setChannel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id]);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this finance channel?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/finance/${id}`); // Delete data from the API
        navigate("/finance-channel-list");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  if (loading) return <p className="text-center text-gray-500">Loading finance channel...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!channel) return <p className="text-center text-gray-500">No channel found.</p>;

  return (
    <div className="container mx-auto max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 mt-5">
      <Link to="/finance-channel-list" className="text-blue-500 hover:underline mr-2 px-2 border">Go Back</Link>
      <h2 className="text-2xl font-bold text-gray-800">{channel.name}</h2>
      <p className="text-gray-500 text-sm mt-1">💰 Balance: ${channel.balance}</p>
      <p className="text-gray-700 mt-3">{channel.description || "No description available."}</p>
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            channel.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {channel.status}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        {channel.transactions && channel.transactions.length > 0 ? (
          <ul>
            {channel.transactions.map((transaction) => (
              <li key={transaction.id} className="border-b py-2">
                <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ${transaction.amount}</p>
                <p><strong>Type:</strong> {transaction.type}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions available.</p>
        )}
      </div>

      <Link to={`/finance-channel-edit/${channel._id}`} className="text-blue-500 hover:underline mr-2 px-2 border">Edit</Link>
            <button
              onClick={() => handleDelete(channel._id)}
              className="mt-2 text-red-500 hover:underline px-2 border"
            >
              Delete
            </button>
    </div>
  );
};

export default ViewFinanceChannel;
