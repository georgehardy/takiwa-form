import Product from './models/product';

export default function () {
  Product.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    // This data used for pre-populating app as well as for tests. Suggest seperating the two if you wish to make changes.
    //
    const product1 = new Product({ name: 'Animals', cuid: 'cikqgkv4q01ck7453ualdn3hd', items: ['Axalotl', 'Cat', 'Dog', 'Hedgehog', 'Wombat'] });
    const product2 = new Product({ name: 'Beers', cuid: 'cikqgkv4q01ck7453ualdn3hf', items: ['APA'] });
    const product3 = new Product({ name: 'Fruit', cuid: 'cikqgkv4q01ck7453ualdn3he', items: ['Apple', 'Orange', 'Kiwifruit', 'Watermelon'] });

    Product.create([product1, product2, product3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
