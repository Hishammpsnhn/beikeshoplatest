import express from 'express';
import { createCategory, getCategory, getProductByCategory, softDeleteCategory } from '../controller/categoryController.js';
import verifyToken from '../middleware/authMiddleware.js';
import checkUserStatus from '../middleware/checkUserStatus.js';


const router = express.Router()
router.use(checkUserStatus);
router.get('/',getCategory)
router.get('/product',getProductByCategory)
router.post('/',createCategory)
router.delete('/:id', softDeleteCategory)
export default router