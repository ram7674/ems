import React from "react";
import "../../assets/styles/EmployeeAdd.css";
import { useEffect, useState } from "react";
import { Fetchdepartment } from "../../routes/EmployeeColumns.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeAdd = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id: "",
    designation: "",
    salary: "",
    email: "",
    dob: "",
    password: "",
    gender: "",
    role: "",
    marital_status: "",
    department: "",
  });

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  // Fetch departments data (using the input selection options )
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await Fetchdepartment();
      setDepartments(departments);
      // console.log(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      if (image) {
        submitData.append("image", image);
      }

      const res = await axios.post(
        "http://localhost:3000/employee/add",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log("errors", error);
      alert(error?.res?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid emp-mainCard">
      <div className="row justify-content-center">
        <div className="col-10 card shadow-sm p-3">
          <div className="col-12 text-center mb-3">
            <h4 className="fw-bold">Add New Employee</h4>
          </div>

          <form
            onSubmit={handleSubmit}
            className="row g-4 justify-content-center"
            encType="multipart/form-data"
          >
            {/* Left column */}
            <div className="col-sm-10 col-md-6 col-lg-6">
              <div className="mb-2">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="employee_name"
                  onChange={handleChange}
                  placeholder="Employee Name"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="employee_id"
                  onChange={handleChange}
                  placeholder="Employee ID"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  onChange={handleChange}
                  placeholder="Designation"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  onChange={handleChange}
                  placeholder="Salary"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">DOB</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Right column */}
            <div className="col-sm-10 col-md-6 col-lg-6">
              <div className="mb-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Gender</label>
                <select
                  className="form-select border-custom"
                  name="gender"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Role</label>
                <select
                  className="form-select border-custom"
                  name="role"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Marital Status</label>
                <select
                  className="form-select border-custom"
                  name="marital_status"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Department</label>
                <select
                  className="form-select border-custom"
                  name="department"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep.id} value={dep.id}>
                      {dep.department_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Add image upload field here */}
              <div className="mb-2">
                <label htmlFor="imageUpload" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
