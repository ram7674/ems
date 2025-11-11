import React from "react";
import "../../assets/styles/Department.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SalaryView = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const FetchEmployee = async () => {
      setEmpLoading(true);

      try {
        const res = await axios.get(`http://localhost:3000/salary/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // console.log(res.data);

        if (res.data.success) {
          let sno = 1;

          const data = res.data.salaries.map((emp) => ({
            sno: sno++,
            id: emp.id,
            employeeName: emp.employee_name,
            allowance: emp.allowance,
            basicSalary: emp.basic_salary,
            deduction: emp.deductions,
            netSalary: emp.net_salary,
            paydate: new Date(emp.pay_date).toLocaleDateString("en-IN"),
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        // alert("Failed to fetch employees.");
        console.log("Error fetching salary:", error);
      } finally {
        setEmpLoading(false);
      }
    };

    FetchEmployee();
  }, []);

  const handleFilter = (e) => {
    const Records = employees.filter((emp) =>
      emp.employeeName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(Records);
  };

  //dynamicly fetch the employees
  const dynamicColumns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      width: "8%",
    },
    {
      name: "Employee_Id",
      selector: (row) => row.id, // 👈
      sortable: true,
      width: "20%",
    },
    {
      name: "Salary",
      selector: (row) => row.basicSalary,
      width: "12%",
    },
    {
      name: "Allowance",
      selector: (row) => row.allowance,
      width: "12%",
    },
    {
      name: "Deduction",
      selector: (row) => row.deduction,
      width: "12%",
    },
    {
      name: "Total",
      selector: (row) => row.netSalary,
      width: "12%",
    },
    {
      name: "PayDate",
      selector: (row) => row.paydate,
      width: "12%",
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
                <h3 className="text-primary">Salary History</h3>

                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search by employees"
                    onChange={handleFilter}
                  />
                </div>
              </div>
            </div>

            {/* Data table section */}
            <div className="row">
              <div className="col-12">
                <DataTable
                  columns={dynamicColumns}
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

export default SalaryView;
