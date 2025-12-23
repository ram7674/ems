import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import Login from "./pages/Login/Login.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import RolebaseRoute from "./routes/RolebaseRoute.jsx";
import Unauthorized from "./pages/Unauthorized/Unauthorized.jsx";
import AdminSummary from "./components/AdminSummary/AdminSummary.jsx";

import Leaves from "./components/Leaves/Leaves.jsx";

import Department from "./components/Department/Department.jsx";
import DepartmentAdd from "./components/Department/DepartmentAdd.jsx";
import EditDepartment from "./components/Department/EditDepartment.jsx";

import Employees from "./components/Employees/Employees.jsx";
import EmployeeAdd from "./components/Employees/EmployeeAdd.jsx";
import EditEmployee from "./components/Employees/EditEmployee.jsx";
import ViewEmployee from "./components/Employees/ViewEmployee.jsx";

import AddSalary from "./components/Salary/Salary.jsx";
import SalaryView from "./components/Salary/SalaryView.jsx";

import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard.jsx";
import EmployeeSummeryCard from "./components/EmployeeSummeryCard/EmployeeSummeryCard.jsx";
import EmpProfile from "./components/EmpProfile/EmpProfile.jsx";
import EmpLeave from "./components/EmpLeave/EmpLeave.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* admin rolebase routes its access only admins */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RolebaseRoute requiredRole={["admin"]}>
                <AdminDashboard />
              </RolebaseRoute>
            </PrivateRoute>
          }
        >
          {/* below is admindashboard*/}
          <Route index element={<AdminSummary />} />

          {/* department */}
          <Route path="departments" element={<Department />} />
          <Route path="departments/add-departments" element={<DepartmentAdd />} />
          <Route path="departments/:id" element={<EditDepartment />} />

          <Route path="employees" element={<Employees />} />
          <Route path="employees/add-employees" element={<EmployeeAdd />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />
          <Route path="employees/view/:id" element={<ViewEmployee />} />
          <Route path="employees/salary/:id" element={<SalaryView />} />

          <Route path="salary/add" element={<AddSalary />} />

          <Route path="leaves" element={<Leaves />} />
        </Route>

        {/* employees rolebase routes its access employees & admins also */}
        <Route 
          path="/employee-dashboard" 
          element={
            <PrivateRoute>
              <RolebaseRoute requiredRole = {[ "Employee" , "admin"]} >
                <EmployeeDashboard />
              </RolebaseRoute>
            </PrivateRoute>
          } 
        >

          <Route index element={<EmployeeSummeryCard />} />
          <Route path="emp-profile/:id" element={<EmpProfile />} />
          <Route path="emp-leave" element={<EmpLeave />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;