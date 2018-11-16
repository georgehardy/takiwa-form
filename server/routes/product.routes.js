import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(ProductController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(ProductController.getPost);

// Add / Update a product
router.route('/products').post(ProductController.addProduct);

// Delete a post by cuid
router.route('/posts/:cuid').delete(ProductController.deletePost);

export default router;
