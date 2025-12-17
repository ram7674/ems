import axios from "axios";
import { useNavigate } from "react-router-dom";

//fetch the department
export const Fetchdepartment = async () => {

  let departments;
  try {
    const res = await axios.get("http://localhost:3000/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.data.success) {
      departments = res.data.departments;
    }
  } catch (error) {
    if (error.response && error.response.data && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return departments;
};

//fetch the employes for salary form
export const getEmployees = async (id) => {

  let employees;
  try {
    const res = await axios.get(`http://localhost:3000/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.data.success) {
      employees = res.data.employees;
    }
  } catch (error) {
    if (error.response && error.response.data && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return employees;
};


export const EmployeeButtons = ({id}) => {
    const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <button className="btn btn-primary px-3 py-1" onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`) }>Edit</button>
      <button className="btn btn-danger px-3 m-1 py-1" onClick={() => navigate(`/admin-dashboard/employees/view/${id}`)}>view</button>
      <button className="btn btn-success px-3 m-1 py-1" onClick={()=> navigate(`/admin-dashboard/employees/salary/${id}`)} >salary</button>
      <button className="btn btn-primary px-3 py-1">leaves</button> 
    </div>
  );
};



