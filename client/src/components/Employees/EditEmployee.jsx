import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Fetchdepartment } from "../../routes/EmployeeColumns";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showDepartments, setShowDepartments] = useState([]);
  const [empDetails, setEmpDetails] = useState({});
  const [empLoading, setEmpLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await Fetchdepartment();
      setShowDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setEmpDetails(res.data.employee);
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Failed to fetch employee");
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpDetails({ ...empDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in empDetails) {
      formData.append(key, empDetails[key]);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.put(`http://localhost:3000/employee/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("Employee updated successfully");
        navigate("/admin-dashboard/departments");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-fluid emp-mainCard">
          <div className="row justify-content-center">
            <div className="col-10 card shadow-sm p-3">
              <div className="col-12 text-center mb-3">
                <h4 className="fw-bold">Edit Employee</h4>
              </div>

              <form onSubmit={handleSubmit} className="row g-4 justify-content-center" encType="multipart/form-data">
                {/* Left Column */}
                <div className="col-sm-10 col-md-6 col-lg-6">
                  {[
                    { label: "Employee Name", name: "employee_name", type: "text" },
                    { label: "Employee ID", name: "employeeId", type: "text" },
                    { label: "Designation", name: "designation", type: "text" },
                    { label: "Salary", name: "salary", type: "number" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "DOB", name: "dob", type: "date", value: empDetails.dob?.slice(0, 10) },
                  ].map(({ label, name, type, value }) => (
                    <div className="mb-2" key={name}>
                      <label className="form-label">{label}</label>
                      <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={value || empDetails[name] || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="col-sm-10 col-md-6 col-lg-6">
                  {[
                    { label: "Password", name: "password", type: "password" },
                  ].map(({ label, name, type }) => (
                    <div className="mb-2" key={name}>
                      <label className="form-label">{label}</label>
                      <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={empDetails[name] || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}

                  <div className="mb-2">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={empDetails.gender || ""} onChange={handleChange} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Role</label>
                    <select className="form-select" name="role" value={empDetails.role || ""} onChange={handleChange} required>
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Marital Status</label>
                    <select className="form-select" name="maritalStatus" value={empDetails.maritalStatus || ""} onChange={handleChange} required>
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Department</label>
                    <select className="form-select" name="department" value={empDetails.department || ""} onChange={handleChange} required>
                      <option value="">Select Department</option>
                      {showDepartments.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.department_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="imageUpload" className="form-label">
                      Upload Image
                    </label>
                    {empDetails.profile_image && (
                      <img
                        src={`http://localhost:3000/${empDetails.profile_image}`}
                        alt="Current"
                        style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px", display: "block" }}
                      />
                    )}
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
                  Update Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEmployee;


























// import React, { useState } from "react";
// import { Fetchdepartment } from "../../routes/EmployeeColumns";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const EditEmployee = () => {
//   const { id } = useParams();

//   const [showDepartments, setShowDepartments] = useState([]);
//   const [empDetails, setEmpDetails] = useState({});
//   const [empLoading, setEmpLoading] = useState(false);
//   const [image, setImage] = useState(null);

//   // Fetch departments data (using the input selection options )
//   useEffect(() => {
//     const getDepartments = async () => {
//       const showDepartments = await Fetchdepartment();
//       setShowDepartments(showDepartments);
//       // console.log(departments);
//     };
//     getDepartments();
//   }, []);

//   useEffect(() => {
//     const FetchEmployees = async () => {
//       setEmpLoading(true);

//       try {
//         const res = await axios.get(`http://localhost:3000/employee/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         console.log(res.data);

//         if (res.data.success) {
//           setEmpDetails(res.data.employee);
//         }
//       } catch (error) {
//         if (error.res && !error.res.data.success) {
//           alert(error.res.data.error);
//         }
//       } finally {
//         setEmpLoading(false);
//       }
//     };

//     FetchEmployees();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmpDetails({ ...empDetails, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.put(
//         `http://localhost:3000/employee/${id}`,
//         department,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       // console.log(res.data);
//       if (res.data.success) {
//         alert("updated successfully");
//         navigate("/admin-dashboard/departments");
//       }
//     } catch (err) {
//       console.log(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <>
//       {empLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="container-fluid emp-mainCard">
//           <div className="row justify-content-center">
//             <div className="col-10 card shadow-sm p-3">
//               <div className="col-12 text-center mb-3">
//                 <h4 className="fw-bold">Add New Employee</h4>
//               </div>

//               <form
//                 onSubmit={handleSubmit}
//                 className="row g-4 justify-content-center"
//                 encType="multipart/form-data"
//               >
//                 {/* Left column */}
//                 <div className="col-sm-10 col-md-6 col-lg-6">
//                   <div className="mb-2">
//                     <label className="form-label">Employee Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="employee_name"
//                       value={empDetails.employee_name || ""}
//                       onChange={handleChange}
//                       placeholder="Employee Name"
//                       required
//                     />
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Employee ID</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="employeeId"
//                       value={empDetails.employeeId || ""}
//                       onChange={handleChange}
//                       placeholder="Employee ID"
//                       required
//                     />
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Designation</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="designation"
//                       value={empDetails.designation || ""}
//                       onChange={handleChange}
//                       placeholder="Designation"
//                       required
//                     />
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Salary</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="salary"
//                       value={empDetails.salary || ""}
//                       onChange={handleChange}
//                       placeholder="Salary"
//                       required
//                     />
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       value={empDetails.email || ""}
//                       onChange={handleChange}
//                       placeholder="Email"
//                       required
//                     />
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">DOB</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={empDetails.dob?.slice(0, 10) || ""}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Right column */}
//                 <div className="col-sm-10 col-md-6 col-lg-6">
//                   <div className="mb-2">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       name="password"
//                       value={empDetails.password || ""}
//                       onChange={handleChange}
//                       placeholder="Password"
//                       required
//                     />
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Gender</label>
//                     <select
//                       className="form-select border-custom"
//                       name="gender"
//                       value={empDetails.gender || ""}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Role</label>
//                     <select
//                       className="form-select border-custom"
//                       name="role"
//                       value={empDetails.role || ""}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Role</option>
//                       <option value="Admin">Admin</option>
//                       <option value="Employee">Employee</option>
//                     </select>
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Marital Status</label>
//                     <select
//                       className="form-select border-custom"
//                       name="maritalStatus"
//                       value={empDetails.maritalStatus || ""}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Status</option>
//                       <option value="Single">Single</option>
//                       <option value="Married">Married</option>
//                     </select>
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Department</label>
//                     <select
//                       className="form-select border-custom"
//                       name="department"
//                       value={empDetails.department || ""}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Department</option>
//                       {showDepartments.map((dep) => (
//                         <option key={dep.id} value={dep.id}>
//                           {dep.department_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* ✅ Add image upload field here */}
//                   <div className="mb-2">
//                     <label htmlFor="imageUpload" className="form-label">
//                       Upload Image
//                     </label>
//                     <input
//                       type="file"
//                       name="image"
//                       className="form-control"
//                       accept="image/*"
//                       value={`http://localhost:3000/${profile_img}`}
//                     />
//                   </div>
//                 </div>

//                 <button type="submit" className="btn btn-primary w-100 fw-bold">
//                   Add Employee
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditEmployee;
