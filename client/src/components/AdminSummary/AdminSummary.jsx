import SummaryCard from "../SummaryCard/SummaryCard";
import "./AdminSummary.css";
import { FaUsers, FaBuilding, FaMoneyBill, FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="admin-summary-container">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-topCard">
        <SummaryCard icon={<FaUsers />} text="total employees" number={24} />
        <SummaryCard icon={<FaBuilding />} text="total department" number={5} />
        <SummaryCard icon={<FaMoneyBill />} text="monthly pay" number={50000} />
      </div>
      <h2>Leave details</h2>
      <div className="leave-detailsCard">
        <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={20} />
        <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={9} />
        <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={6} />
        <SummaryCard icon={<FaClock />} text="Leave Pending" number={4} />
      </div>
      {/* <div className="summary-cards">
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
      </div> */}
    </div>
  );
};

export default AdminSummary;