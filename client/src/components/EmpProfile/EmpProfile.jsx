import React, { useState } from "react";
import "../../assets/styles/viewEmp.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const EmpProfile = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const FetchEmployees = async () => {
      console.log("Starting fetch...");
      try {
        const res = await axios.get(`http://localhost:3000/employee/emp-profile/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("Fetched ID from params:", id);
        if (res.data.success) {
          setEmployees(res.data.employee);
        }
      } catch (error) {
        if (error.res && !error.res.data.success) {
          alert(error.res.data.error);
        }
      }
    };

    FetchEmployees();
  }, [id]);

  return (
    <>
      {employees ? (
        <div className="container-fluid emp-container">
          <div className="employee-table">
            <h3 className="mb-4 text-center">Employee Details</h3>
            <table className="table table-bordered ">
              <tbody>
                <tr className="row-pink">
                  <th>Name</th>
                  <td>{employees.employee_name}</td>
                  <th>Employee ID</th>
                  <td>{employees.employeeId}</td>
                </tr>
                <tr className="row-green">
                  <th>Designation</th>
                  <td>{employees.designation}</td>
                  <th>Salary</th>
                  <td>{employees.salary}</td>
                </tr>
                <tr className="row-yellow">
                  <th>Email</th>
                  <td>{employees.email}</td>
                  <th>DOB</th>
                  <td>{new Date(employees.dob).toLocaleDateString("en-GB")}</td>
                </tr>
                <tr className="row-blue">
                  <th>Password</th>
                  <td>{employees.password}</td>
                  <th>Gender</th>
                  <td>{employees.gender}</td>
                </tr>
                <tr className="row-purple">
                  <th>Role</th>
                  <td>{employees.role}</td>
                  <th>Marital Status</th>
                  <td>{employees.maritalStatus}</td>
                </tr>
                <tr className="row-orange">
                  <th>Department</th>
                  <td>{employees.depart_name}</td>
                  <th>Uploaded Image</th>
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/${employees?.profile_img}`}
                      alt="Uploaded"
                      className="img-thumbnail"
                      style={{ maxWidth: "120px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default EmpProfile;
