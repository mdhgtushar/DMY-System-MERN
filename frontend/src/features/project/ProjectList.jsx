import React from "react";
import { Link } from "react-router-dom"; // For Next.js, use next/link

const projects = [
  {
    id: 1,
    name: "Cherrfy Ecommerce",
    tagline: "Your One-Stop Global Shopping Destination",
    status: "In Progress",
  },
  {
    id: 2,
    name: "School Management System",
    tagline: "Modernize your school operations",
    status: "Planned",
  },
  {
    id: 3,
    name: "Annapurna Lottery System",
    tagline: "Fair & Fun Daily Lottery",
    status: "Planned",
  },
];

export default function ProjectsList() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📁 Projects</h1>
      <Link to="/projects/create" className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Create New Project
      </Link>
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Tagline</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{project.name}</td>
                <td className="px-6 py-4 text-gray-600">{project.tagline}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
