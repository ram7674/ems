import db from "../config/db.js"; // your MySQL connection (with mysql2/promise)
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }

    const user = rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }

    // 3. Generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name, // or fullname based on your DB
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // 4. Return user details
    res.status(200).json({
      status: "success",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

export default login;