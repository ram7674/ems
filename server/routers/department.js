import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

router.post('/add', authMiddleware, addDepartment);           // Create
router.get('/', authMiddleware, getDepartments);              // Read all
router.get('/:id', authMiddleware, getDepartment);            // Read spacific id
router.put('/:id', authMiddleware, updateDepartment);         // Update
router.delete('/:id', authMiddleware, deleteDepartment);      // Update

export default router;