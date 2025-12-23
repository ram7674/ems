import { NavLink } from "react-router-dom";
import "./EmployeeSidebar.css";
import { useAuth } from "../../context/AuthContext";

const EmployeeSidebar = () => {
  const {user} = useAuth();

  return (
    <div className="sidebar bg-dark text-white p-3 vh-100">
      <div className="brand mb-4 fs-4 fw-bold">EMS</div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="."
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
            to={`emp-profile/${user.id}`}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            👥 My Profile
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="emp-leave"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            🏢 Leave
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="salary"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-primary fw-bold" : "text-white"}`
            }
          >
            📅 Salary
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

export default EmployeeSidebar;
