import db from "../config/db.js"; // MySQL connection file
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

  const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      status: "success",
      token,
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const verify  = (req, res) => {
  return res.status(200).json({
    status: "success",
    user: req.user,
  });
};

export {login, verify }