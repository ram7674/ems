import "./AdminSummary.css";
import { FaUsers, FaBuilding, FaMoneyBill, FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="admin-summary-container">
      <h2>Dashboard Overview</h2>
      <div className="summary-cards">
        <div className="card card-green">
          <FaUsers className="card-icon" />
          <div>
            <p>Total Employees</p>
            <h3>4</h3>
          </div>
        </div>

        <div className="card card-yellow">
          <FaBuilding className="card-icon" />
          <div>
            <p>Total Departments</p>
            <h3>3</h3>
          </div>
        </div>

        <div className="card card-red">
          <FaMoneyBill className="card-icon" />
          <div>
            <p>Monthly Pay</p>
            <h3>$1900</h3>
          </div>
        </div>
      </div>

      <h2>Leave Details</h2>
      <div className="summary-cards">
        <div className="card card-blue">
          <FaFileAlt className="card-icon" />
          <div>
            <p>Leave Applied</p>
            <h3>2</h3>
          </div>
        </div>

        <div className="card card-success">
          <FaCheckCircle className="card-icon" />
          <div>
            <p>Leave Approved</p>
            <h3>2</h3>
          </div>
        </div>

        <div className="card card-warning">
          <FaClock className="card-icon" />
          <div>
            <p>Leave Pending</p>
            <h3>1</h3>
          </div>
        </div>

        <div className="card card-danger">
          <FaTimesCircle className="card-icon" />
          <div>
            <p>Leave Rejected</p>
            <h3>1</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;