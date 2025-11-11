import db from "../config/db.js";
import bcrypt from 'bcrypt';

const AdminUser = async (req, res) => {
  try {
    const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', ['admin@example.com']);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Admin user already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin', 10);
    await db.execute(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      ['Admin', 'admin@example.com', hashedPassword, 'admin']
    );

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export default AdminUser;

// if the admin crediantials is correct but its show not correct call this function "AdminUser()" to the server.js function.