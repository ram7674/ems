import React from "react";
import { Link } from "react-router-dom";

const Leaves = () => {
  return (
    <>
      (
      <div className="container-fluid mt-4">
        <div className="department-container">

          {/* Header section */}
          <div className="row mb-3">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h3 className="text-primary">Manage Leaves</h3>
              {/* Button to navigate to add department form */}
              <Link to="/admin-dashboard/employees/add-employees">
                <button className="btn btn-success">Approved</button>
                <button className="btn btn-warning m-2">Pending</button>
                <button className="btn btn-danger">Rejected</button>
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div className="row mb-4">
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search by employees"
              />
            </div>
          </div>
          
        </div>
      </div>
      )
    </>
  );
};

export default Leaves;
