import express from 'express';
import {addProduct,getAllProducts, softDeleteProduct,getProduct, editProduct, addOrUpdateRating} from '../controller/productControllers.js'
import verifyToken from '../middleware/authMiddleware.js'
const router = express.Router()


router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/',addProduct);
router.post('/rating',addOrUpdateRating);
router.put('/:id', editProduct);
router.delete('/:id',softDeleteProduct);
export default router