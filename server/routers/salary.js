import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addSalary, getSalaries} from "../controllers/salaryController.js";

const router = express.Router();

router.post("/add", authMiddleware, addSalary);   // Add salary
router.get("/:id", authMiddleware, getSalaries);  // Get salary

export default router;