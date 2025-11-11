import express from 'express';
import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
import { login, verify } from './routers/login.js';
import authMiddleware from './middleware/authMiddleware.js';
import departmentRoutes from './routers/department.js'
import employeeRoutes from './routers/employee.js'
import salaryRouter from './routers/salary.js'

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 

// __dirname setup for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
  
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/data', (req, res) => {
  res.send("Testing the server");
});

// Auth routes
app.post('/login', login);
app.get('/verify', authMiddleware, verify);
app.use('/department', departmentRoutes);
app.use('/employee', employeeRoutes);
app.use('/salary', salaryRouter);

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
