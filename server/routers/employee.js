import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { upload, addEmployee ,getEmployees, getEmployeeById, updateEmployee, fetchEmployeesByDepId} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/add', authMiddleware, upload.single('image'), addEmployee);    // Create
router.get('/', authMiddleware, getEmployees);  // Read all
router.get('/:id', authMiddleware, getEmployeeById);     // Read spacific id
router.put('/:id', authMiddleware, upload.single("image"), updateEmployee);  // Update
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId); 

export default router;