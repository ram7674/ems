import React, { useEffect, useState } from "react";
import "../../assets/styles/DepartmentAdd.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const Fetchdepartment = async () => {
      setDepLoading(true);

      try {
        const res = await axios.get(`http://localhost:3000/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(res.data);
        
        if (res.data.success) {
          setDepartment(res.data.department);
        }
      } catch (error) {
        if (error.res && !error.res.data.success) {
          alert(error.res.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    Fetchdepartment();
  }, []);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
      if (res.data.success) {
        alert("updated successfully");
        navigate("/admin-dashboard/departments");
      }
    } catch (err) {
      console.log(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {depLoading ? (
        <div>loading...</div>
      ) : (
        <div className="containerc py-5">
          <div className="row justify-content-center department-addcard">
            <div className="col-sm-10 col-md-8 col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="mb-4 fw-bold">Edit Department</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Department Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="department_name"
                        value={department.department_name}
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
                        value={department.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 fw-bold"
                    >
                     Edit Department
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
