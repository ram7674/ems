import React from "react";
import "../../assets/styles/Department.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { EmployeeButtons } from "../../routes/EmployeeColumns";
import defaultImage from "../../assets/styles/null-image.jpeg";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const FetchEmployee = async () => {
      setEmpLoading(true);

      try {
        const res = await axios.get("http://localhost:3000/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // console.log(res.data);

        if (res.data.success) {
          let sno = 1;

          const data = res.data.employees.map((emp) => ({
            id: emp.id,
            sno: sno++,
            user_name: emp.name,
            profile_img: emp.image,
            dob: new Date(emp.dob).toLocaleDateString("en-IN"), // "2000-04-09T18:30:00.000Z" avoid like this to "10/4/2000"
            dep_name: emp.depart_name,
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        // alert("Failed to fetch employees.");
        console.log("Error fetching employees:", error);
      } finally {
        setEmpLoading(false);
      }
    };

    FetchEmployee();
  }, []);

  const handleFilter = (e) => {
    const Records = employees.filter((emp) =>
      emp.user_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(Records);
  };

  //dynamicly fetch the employees
  const dynamicColumns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      width: "12%",
    },
    {
      name: "Name",
      selector: (row) => row.user_name,
      sortable: true,
       width: "12%",
    },
    {
      name: "Profile",
      selector: (row) => (
        <img
          src={
            row.profile_img
              ? `http://localhost:3000/uploads/${row.profile_img}`
              : defaultImage // default image
          }
          alt={row.user_name}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
       width: "12%",
    },
    {
      name: "DOB",
      selector: (row) => row.dob,
       width: "12%",
    },
    {
      name: "Department",
      selector: (row) => row.dep_name,
       width: "12%",
    },
    {
      name: "Action",
      cell: (row) => <EmployeeButtons id={row.id} />,
       width: "40%",
    },
  ];

  return (
    <>
      {empLoading ? (
        <div>loading...</div>
      ) : (
        <div className="container-fluid mt-4">
          <div className="department-container">
            {/* Header section */}
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h3 className="text-primary">Manage Employees</h3>

                {/* Button to navigate to add department form */}
                <Link to="/admin-dashboard/employees/add-employees">
                  <button className="btn btn-primary">Add New Employee</button>
                </Link>
              </div>
            </div>

            {/* Search bar UI (not functional yet) */}
            <div className="row mb-4">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search by employees"
                  onChange={handleFilter}
                />
              </div>
            </div>

            {/* Data table section */}
            <div className="row">
              <div className="col-12">
                <DataTable
                  columns={dynamicColumns}
                  // data={employees}
                  data={filteredEmployees}
                  pagination
                  striped
                  highlightOnHover
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Employees;
