import express from 'express';
import { addOffer, createCategory, getCategory, getProductByCategory, softDeleteCategory } from '../controller/categoryController.js';
import verifyToken from '../middleware/authMiddleware.js';
import{ checkUserStatus }from '../middleware/checkUserStatus.js';


const router = express.Router()



router.get('/',getCategory)
router.get('/product',getProductByCategory)
router.post('/',createCategory)
router.post('/:id/offer',addOffer)
router.delete('/:id', softDeleteCategory)
export default router