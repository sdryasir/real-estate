import express from 'express'
import { createCategory, deleteCategory, getAllCategorys, getCategoryById, updateCategory } from '../controllers/category.controller.js'
const router = express.Router()



router.route('/category/new').post(createCategory)
router.route('/category/all').get(getAllCategorys)
router.route('/category/single').get(getCategoryById)
router.route('/category/update').put(updateCategory)
router.route('/category/delete').delete(deleteCategory)





export default router




