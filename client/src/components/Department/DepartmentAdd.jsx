import React, { useState } from "react";
import "../../assets/styles/DepartmentAdd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DepartmentAdd = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        Navigate("/admin-dashboard/departments");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="containerc py-5">
      <div className="row justify-content-center department-addcard">
        <div className="col-sm-10 col-md-8 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-4 fw-bold">Add New Department</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="dep_name"
                    placeholder="Department Name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  Add Department
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAdd;
