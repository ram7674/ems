import React, { useEffect, useState } from "react";
import "../../assets/styles/Department.css";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { DepartmentButtons } from "../../routes/departmentColumns.jsx";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = (id) => {
    const updated = departments.filter((dep) => dep.id !== id);
    setDepartments(updated);
    setFilteredDepartments(updated);
  };

  useEffect(() => {
    const Fetchdepartment = async () => {
      setDepLoading(true);

      try {
        const res = await axios.get("http://localhost:3000/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success) {
          let sno = 1;

          const data = res.data.departments.map((dep) => ({
            id: dep.id,
            sno: sno++,
            dep_name: dep.department_name,
          }));

          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        alert("Failed to fetch departments.");
      } finally {
        setDepLoading(false);
      }
    };

    Fetchdepartment();
  }, []);

  const handleFilter = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  // ✅ Dynamic columns with fresh action buttons
  const dynamicColumns = [
    {
      name: "S No",
      selector: (row) => row.sno,
    },
    {
      name: "Department Name",
      selector: (row) => row.dep_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <DepartmentButtons id={row.id} onDepartmentDelete={onDepartmentDelete} />
      ),
    },
  ];

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-fluid mt-4">
          <div className="department-container">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h3 className="text-primary">Manage Departments</h3>
                <Link to="/admin-dashboard/departments/add-departments">
                  <button className="btn btn-primary">Add New Department</button>
                </Link>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search by Department"
                  onChange={handleFilter}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <DataTable
                  columns={dynamicColumns}
                  //data={departments}
                  data={filteredDepartments}
                  pagination
                  highlightOnHover
                  striped
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Department;
