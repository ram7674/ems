import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Fetchdepartment, getEmployees } from "../../routes/EmployeeColumns";

const AddSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    allowances: "",
    basicSalary: "",
    employeeId: "",
    deductions: "",
    payDate: "",
    department: "",
  });

  const [showDepartments, setShowDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  // fetch departments once
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await Fetchdepartment();
        setShowDepartments(departments);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      }
    };
    getDepartments();
  }, []);

  // fetch employee if editing existing salary
  useEffect(() => {
    if (!id) return;
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          // pre-fill form with employee details if needed
          setEmployee((prev) => ({
            ...prev,
            ...res.data.employee,
          }));
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Failed to fetch employee");
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  // handle all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  // when department changes, fetch employees in that dept
  const handleDepartment = async (e) => {
    const depId = e.target.value;
    setEmployee((prev) => ({ ...prev, department: depId }));
    const emps = await getEmployees(depId);
    setEmployees(emps);
  };

  // submit salary
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/salary/add`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert("Salary added successfully");
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message);
    }
  };

  if (empLoading) return <div>Loading employee...</div>;

  return (
    <div className="container-fluid emp-mainCard">
      <div className="row justify-content-center">
        <div className="col-10 card shadow-sm p-3">
          <div className="col-12 text-center mb-3">
            <h4 className="fw-bold">Add Salary</h4>
          </div>

          <form
            onSubmit={handleSubmit}
            className="row g-4 justify-content-center"
          >
            {/* Left Column */}
            <div className="col-sm-10 col-md-6 col-lg-6">
              <div className="mb-2">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  name="department"
                  value={employee.department}
                  onChange={handleDepartment}
                  required
                >
                  <option value="">Select Department</option>
                  {showDepartments.map((dep) => (
                    <option key={dep.id} value={dep.id}>
                      {dep.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Basic Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="basicSalary"
                  value={employee.basicSalary}
                  onChange={handleChange}
                  placeholder="Basic Salary"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Allowances</label>
                <input
                  type="number"
                  className="form-control"
                  name="allowances"
                  value={employee.allowances}
                  onChange={handleChange}
                  placeholder="Allowances"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-sm-10 col-md-6 col-lg-6">
              <div className="mb-2">
                <label className="form-label">Employee</label>
                <select
                  className="form-select"
                  name="employeeId"
                  value={employee.employeeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Deductions</label>
                <input
                  type="number"
                  className="form-control"
                  name="deductions"
                  value={employee.deductions}
                  onChange={handleChange}
                  placeholder="Deductions"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Pay Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="payDate"
                  value={employee.payDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Save Salary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSalary;