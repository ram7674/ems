import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="brand">EMS</div>
      <ul>
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/employees">👥 Employees</Link></li>
        <li><Link to="/departments">🏢 Departments</Link></li>
        <li><Link to="/leaves">📅 Leaves</Link></li>
        <li><Link to="/salary">💰 Salary</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;