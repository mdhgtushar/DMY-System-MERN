import React from "react";
import { Link } from "react-router-dom"; // use next/link if in Next.js
const features = [
    {
      id: 1,
      name: "Authentication",
      status: "In Progress",
      estimatedDays: 3,
      deadline: "2025-05-12",
    },
    {
      id: 2,
      name: "Role Management",
      status: "Pending",
      estimatedDays: 2,
      deadline: "2025-05-14",
    },
    {
      id: 3,
      name: "Product Module",
      status: "Not Started",
      estimatedDays: 4,
      deadline: "2025-05-16",
    },
    {
      id: 4,
      name: "Order Module",
      status: "Not Started",
      estimatedDays: 3,
      deadline: "2025-05-18",
    },
  ];
  
const project = {
  name: "Cherrfy Ecommerce",
  tagline: "Your One-Stop Global Shopping Destination",
  status: "In Progress",
  description:
    "Cherrfy is a global ecommerce marketplace that connects users and sellers across borders.",
  features: [
    { id: 1, title: "Three Layouts", status: "Planned" },
    { id: 2, title: "Authentication (Auth)", status: "In Progress" },
    { id: 3, title: "Role Management", status: "Planned" },
    { id: 4, title: "Product Module", status: "Planned" },
    { id: 5, title: "Order Module", status: "Planned" },
    { id: 6, title: "Offer Module", status: "Planned" },
    { id: 7, title: "Campaign Module", status: "Planned" },
  ],
};

export default function ProjectView() {
  return (
    <div>
        <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4"> 📁 View Project</h1>  
        <Link to="/projects" className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Back to Projects
        </Link>
      </div>
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow rounded-2xl p-6 border">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-gray-600 italic mb-4">{project.tagline}</p>
        <p className="mb-6 text-gray-700">{project.description}</p> 
        <Link to={`/projects/edit/${project.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Project
        </Link>

      </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📌 Project Details - Cherrfy Ecommerce</h1>
        <Link to={`/projects/features/create/${project.id}`} className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Create New Feature
        </Link>
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-4">Feature</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Estimated Days</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{feature.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    feature.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : feature.status === "Pending"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {feature.status}
                  </span>
                </td>
                <td className="px-6 py-4">{feature.estimatedDays} days</td>
                <td className="px-6 py-4">{feature.deadline}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/projects/features/${feature.id}`} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-xs">
                    View Feature
                  </Link>
                </td>
              </tr>
            ))}
            {features.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No features added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
