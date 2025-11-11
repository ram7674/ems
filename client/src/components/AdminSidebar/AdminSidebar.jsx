import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-3 vh-100">
      <div className="brand mb-4 fs-4 fw-bold">EMS</div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            🏠 Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="employees"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            👥 Employees
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="departments"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            🏢 Departments
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="leaves"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            📅 Leaves
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin-dashboard/salary/add"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            💰 Salary
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            ⚙️ Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
