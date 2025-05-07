import React, { useState } from "react";

export default function ProjectCreate() {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    status: "Planned",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔗 Submit the form to backend or state handler
    console.log("New Project:", form);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow border">
      <h1 className="text-2xl font-bold mb-6">🚀 Create New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="e.g. Cherrfy Ecommerce"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="e.g. All-in-one shopping platform"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            rows={4}
            placeholder="Short summary of the project..."
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
            <label className="block font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Estimated Completion</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
