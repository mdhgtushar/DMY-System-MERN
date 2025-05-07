import React, { useState, useEffect } from "react";

// `featureData` should be passed as a prop or fetched via API by ID
export default function FeatureEdit({ featureData, onSave }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planned",
    estimatedDays: "",
    deadline: "",
  });

  useEffect(() => {
    if (featureData) {
      setForm({ ...featureData });
    }
  }, [featureData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSave handler or API request here
    console.log("Updated Feature:", form);
    if (onSave) onSave(form);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow border">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Feature</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Feature Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Estimated Days</label>
            <input
              type="number"
              name="estimatedDays"
              value={form.estimatedDays}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Deadline Date</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
