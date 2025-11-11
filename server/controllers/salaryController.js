import db from "../config/db.js";

// Add Salary
const addSalary = async (req, res) => {
  const { employeeId, allowances, basicSalary, deductions, payDate } = req.body;
  // console.log("Request body:", req.body);

  try {
    if (!employeeId || !basicSalary || !payDate) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const totalSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    const [result] = await db.execute(
      `INSERT INTO salaries 
       (employee_id, allowance, basic_salary, deductions, net_salary, pay_date) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        allowances || 0,
        basicSalary,
        deductions || 0,
        totalSalary,
        payDate,
      ]
    );

    // console.log("Salary added successfully", result.insertId);
    return res
      .status(201)
      .json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error("Error adding salary:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get all Salaries
const getSalaries = async (req, res) => {
  try {
    const { id } = req.params;
    const [salaries] = await db.execute(
      `
        SELECT 
          s.id,
          e.employeeId,
          s.allowance,
          s.basic_salary,
          s.deductions,
          s.net_salary,
          s.pay_date
        FROM salaries s
        JOIN employees e ON s.employee_id = e.id
        WHERE s.employee_id = ?
      `,
      [id]
    );

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Error fetching salaries:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch salaries" });
  }
};

// Export multer middleware and controller
export { addSalary, getSalaries };