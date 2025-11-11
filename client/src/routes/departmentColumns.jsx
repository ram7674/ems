import { useNavigate } from "react-router-dom";
import axios from "axios";

// export const columns = [
//   {
//     name: "S No",
//     selector: (row) => row.sno,
//   },
//   {
//     name: "Department Name",
//     selector: (row) => row.dep_name,
//     sortable: true,
//   },
//   {
//     name: "Action",
//     selector: (row) => row.action,
//   },
// ];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          onDepartmentDelete(id); // ✅ Inform parent to update UI
        }
      } catch (error) {
        alert(
          error?.response?.data?.error || "Error deleting department."
        );
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="btn btn-primary px-3 py-1"
        onClick={() => navigate(`/admin-dashboard/departments/${id}`)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger px-3 py-1"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};
