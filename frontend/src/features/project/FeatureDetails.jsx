import React from "react";
import { Link, useParams } from "react-router-dom"; // useRouter for Next.js

export default function FeatureDetails() {
  const { id } = useParams(); // e.g., /features/1

  // Simulated data — replace with API or context call
  const featureData = {
    1: {
      title: "Three Layouts",
      status: "Planned",
      description:
        "Three separate layouts: User, Seller, Admin, each with unique dashboards and views.",
      tasks: [
        "Create layout wrappers",
        "Route protection",
        "Sidebar & header components",
      ],
    },
    2: {
      title: "Authentication (Auth)",
      status: "In Progress",
      description: "Login, registration, JWT-based session management.",
      tasks: ["Login UI", "JWT logic", "Role-based redirection"],
    },
    // Add more...
  };

  const feature = featureData[id];

  if (!feature)
    return (
      <div className="p-6">
        Feature not found{" "}
        <Link
          to={`/projects/${id}`}
          className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Project
        </Link>
      </div>
    );

  return (
    <div>
      <div>
        <div className="p-6 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-4"> 📌 View Feature</h1>
          <Link
            to={`/projects/${id}`}
            className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Project
          </Link>
        </div>
      </div>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border p-6 shadow">
          <h1 className="text-2xl font-bold">{feature.title}</h1>
          <Link
            to={`/projects/features/edit/${id}`}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Feature
          </Link>
          <p className="mt-1 text-sm text-gray-500">{feature.status}</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">📝 Description</h2>
            <p className="text-gray-700">{feature.description}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">📌 Tasks</h2>
            <ul className="list-disc list-inside text-gray-800">
              {feature.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
