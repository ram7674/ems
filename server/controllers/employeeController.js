import db from "../config/db.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder if not exists
const uploadPath = "./uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `emp_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const addEmployee = async (req, res) => {
  try {
    const {
      employee_name,
      employee_id,
      designation,
      salary,
      email,
      dob,
      password,
      gender,
      role,
      marital_status,
      department,
    } = req.body;

    // Check if user already exists
    const [existingUser] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const profileImage = req.file ? req.file.filename : null;
    const hashPassword = await bcrypt.hash(password, 10);

    const [userResult] = await db.execute(
      `INSERT INTO users (name, email, password, role, profile_image) VALUES (?, ?, ?, ?, ?)`,
      [employee_name, email, hashPassword, role, profileImage]
    );

    const userId = userResult.insertId;

    await db.execute(
      `INSERT INTO employees (
         userId, employeeId, dob, gender, maritalStatus, designation, department, salary
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        employee_id,
        dob,
        gender,
        marital_status,
        designation,
        department,
        salary,
      ]
    );

    res
      .status(201)
      .json({ success: true, message: "Employee created successfully" });
  } catch (err) {
    console.error("Error inserting employee:", err);
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const [employees] = await db.execute(`
      SELECT 
        employees.*, 
        users.name AS name, 
        users.profile_image AS image,
        employees.dob AS dob,
        departments.department_name AS depart_name 
      FROM employees
      JOIN users ON employees.userId = users.id
      JOIN departments ON employees.department = departments.id
    `);

    res.status(200).json({
      success: true,
      employees: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get a specific employee by ID
// const getEmployeeById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [employee] = await db.execute(
//       `SELECT employees.*, users.name AS name, users.profile_image AS image,
//               employees.dob AS dob, departments.department_name AS depart_name
//          FROM employees
//          JOIN users ON employees.userId = users.id
//          JOIN departments ON employees.department = departments.id
//          WHERE employees.id = ?`,
//       [id]
//     );

//     if (employee.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       employee: employee[0],
//     });
//   } catch (error) {
//     console.error("Error fetching employee:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// };
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT 
        employees.*, 
        users.name AS employee_name,
        users.email AS email,
        users.role AS role,
        users.password AS password, 
        users.profile_image AS profile_img, 
        departments.department_name AS depart_name
       FROM employees
       JOIN users ON employees.userId = users.id
       JOIN departments ON employees.department = departments.id
       WHERE employees.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee: rows[0],
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// const updateEmployee = async (res, req) => {
//   const { id } = req.params;
//   const {
//     employee_name,
//     employeeId,
//     designation,
//     salary,
//     email,
//     dob,
//     password,
//     gender,
//     role,
//     maritalStatus,
//     department,
//   } = req.body;

//   const imagePath = req.file ? req.file.path : null;
//   const hashPassword = await bcrypt.hash(password, 10);

//   try {
//     // update users table
//     await db.execute(
//       `UPDATE users SET name=?, email=?, password=?, role=?, profile_image=? WHERE id=(SELECT userId FROM employees WHERE id=?)`,
//       [employee_name, email, hashPassword, role, imagePath, id]
//     );

//     // update employee table
//     await db.execute(
//       `UPDATE employees SET employeeId=?, designation=?, salary=?, dob=?, gender=?, maritalStatus=?, department=? WHERE id=?`,
//       [
//         employeeId,
//         designation,
//         salary,
//         dob,
//         gender,
//         maritalStatus,
//         department,
//         id,
//       ]
//     );
//     res.json({ success: true, message: "Employee updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    employee_name,
    employeeId,
    designation,
    salary,
    email,
    dob,
    password,
    gender,
    role,
    maritalStatus,
    department,
  } = req.body;

  const imagePath = req.file ? req.file.path : null;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare values and dynamic query for updating users table
    let userUpdateQuery = `UPDATE users SET name=?, email=?, password=?, role=?`;
    const userValues = [employee_name, email, hashedPassword, role];

    if (imagePath) {
      userUpdateQuery += `, profile_image=?`;
      userValues.push(imagePath);
    }

    userUpdateQuery += ` WHERE id=(SELECT userId FROM employees WHERE id=?)`;
    userValues.push(id);

    // Execute update query for users table
    await db.execute(userUpdateQuery, userValues);

    // Execute update query for employees table
    await db.execute(
      `UPDATE employees 
       SET employeeId=?, designation=?, salary=?, dob=?, gender=?, maritalStatus=?, department=? 
       WHERE id=?`,
      [
        employeeId,
        designation,
        salary,
        dob,
        gender,
        maritalStatus,
        department,
        id,
      ]
    );

    res.json({ success: true, message: 'Employee updated successfully' });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// fetchEmpByDeptId
const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  console.log('Requested department id:', id);

  try {
    const [employees] = await db.execute(
      "SELECT * FROM employees WHERE department = ?",
      [id]
    );
    console.log('Fetched employees:', employees);
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees by department:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "get employeesbyDepId server error" });
  }
};




// Export multer middleware and controller
export { upload, addEmployee, getEmployees, getEmployeeById, updateEmployee, fetchEmployeesByDepId };
