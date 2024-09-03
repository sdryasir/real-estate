import express from 'express'
import ProductController from '../controllers/products.controller.js'
import { isUserAuthenticated, isAuthorizedUser } from '../middleware/auth.js'
import upload from './upload.js'
const router = express.Router()

const product = new ProductController()

router.route('/products/new')
.post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, // Single main image
    { name: 'remainingImages', maxCount: 5 }, // Up to 5 additional images
  ]),
  product.createProduct
);

router.route('/products/all').get(product.getAllProducts)
router.route('/products/single').get(product.getProductById)
router.route('/products/update').put(product.updateProduct)
router.route('/products/delete').delete(isAuthorizedUser('admin'), product.deleteProduct)





export default router




