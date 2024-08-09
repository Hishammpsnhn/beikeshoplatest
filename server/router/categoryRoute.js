import express from 'express';
import { createCategory, getCategory, getProductByCategory, softDeleteCategory } from '../controller/categoryController.js';
import verifyToken from '../middleware/authMiddleware.js';


const router = express.Router()

router.get('/',getCategory)
router.get('/product',getProductByCategory)
router.post('/',verifyToken,createCategory)
router.delete('/:id',verifyToken, softDeleteCategory)
export default router