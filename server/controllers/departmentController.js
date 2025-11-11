import db from "../config/db.js";

// Add Department Controller
const addDepartment = async (req, res) => {
  const { dep_name, description } = req.body;

  if (!dep_name || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO departments (department_name, description) VALUES (?, ?)",
      [dep_name, description]
    );

    res
      .status(201)
      .json({ success: true, message: "Department added successfully" });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get the department
const getDepartments = async (req, res) => {
  try {
    const [departments] = await db.execute("SELECT * FROM departments");
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Get Departments Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

// get the department by id
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Run SQL query to fetch department by ID
    const [result] = await db.execute(
      "SELECT * FROM departments WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: result[0] });
  } catch (error) {
    console.error("Get department error:", error);
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name, description } = req.body;

    const [result] = await db.execute(
      "UPDATE departments SET department_name = ?, description = ? WHERE id = ?",
      [department_name, description, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Department updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Edit department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  ``;
  try {
    // Run delete query
    const [result] = await db.execute("DELETE FROM departments WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
