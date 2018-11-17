import Product from '../models/product';
import cuid from 'cuid';

/**
 * Save a product
 * @param req
 * @param res
 * @returns void
 */
export function addProduct(req, res) {
  const { product } = req.body;
  // if cuid is falsy then we are creating a new product
  // if cuid is truthy then we are updating an existing product
  if (!product.cuid) {
    product.cuid = cuid();
    const newProduct = new Product(product);
    newProduct.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ message: 'created' });
    });
  } else {
    Product.where('cuid', product.cuid)
      .update({ $set: { name: product.name, items: product.items } }, (err) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ message: 'updated' });
      });
  }
}
/**
 * Get a product
 * @param req
 * @param res
 * @returns void
 */
export function getProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ product });
  });
}

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getProducts(req, res) {
  Product.find().sort('name').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ products });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }

    product.remove(() => {
      res.status(200).end();
    });
  });
}
