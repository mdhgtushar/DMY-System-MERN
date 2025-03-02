import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto my-5">
        {/* Logo */}
        <div className="md:flex justify-between items-center">
          <div className="text-center md:text-left">
            <div className="mb-5">
              <NavLink to="/" className="text-2xl font-bold">🚀 HOBAYER DMY SYSTEM</NavLink>
              <h3>📝 Documented Daily Life</h3>
            </div>

            {/* Menu Items */}
            <ul className="flex space-x-4 justify-center md:justify-start">
              {!token ? (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => 
                        `border px-4 py-2 rounded transition ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                      }
                    >
                      🔑 Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) => 
                        `border px-4 py-2 rounded transition ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                      }
                    >
                      📝 Signup
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {[
                    { path: "/dashboard", label: "🏠 Dashboard" },
                    { path: "/daily-data-create", label: "📅 Daily Data" },
                    { path: "/vision-board", label: "🎯 Vision" },
                    { path: "/task-list", label: "✅ Tasks" },
                    { path: "/finance-channel-list", label: "💰 Finance" },
                    { path: "/finance-view", label: "📊 Finance View" },
                    { path: "/view-daily-data", label: "📜 View Data" },
                  ].map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          `border px-4 py-2 rounded transition ${isActive ? "bg-blue-900" : "hover:bg-blue-900"}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <span
                      onClick={logout}
                      className="cursor-pointer border px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      🚪 Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="bg-gray-900 text-white px-8 py-6 rounded-lg shadow-lg text-center md:mt-0 mt-10">
            <h2 className="text-2xl font-bold">
              Developed by <br />
              <span className="text-xl text-blue-400">👨‍💻 Hobayer Golondaz Tushar</span>
            </h2>
            <p className="text-gray-300">
              CEO at <span className="text-blue-500">RubidSoft</span> 🚀
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
