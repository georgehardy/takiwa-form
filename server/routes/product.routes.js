import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
const router = new Router();

// Get all products
router.route('/products').get(ProductController.getProducts);

// Get single product by cuid
router.route('/products/:cuid').get(ProductController.getProduct);

// Add or update a product
router.route('/products').post(ProductController.addProduct);

// Delete a single product by cuid
router.route('/products/:cuid').delete(ProductController.deleteProduct);

export default router;
