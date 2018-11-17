import request from 'supertest';
import { connectDB, dropDB } from '../server/util/test-helpers';
import app from '../server/server';
import dummyData from '../server/dummyData';

// setup in-memory mongo server
beforeAll(async () => {
  await connectDB();
});

// drop changes and re-add dummy data
afterEach(async () => {
  await dropDB();
  await dummyData();
});

test('test runner runs', () => {
  expect(true).toBeTruthy();
});

test('GET api/products should return three products', (done) => {
  request(app)
    .get('/api/products')
    .end((err, res) => {
      expect(err).toBeNull();
      expect(res.body.products).toHaveLength(3);
      done();
    });
});

test('GET api/products/<cuid> should return the correct product', (done) => {
  request(app)
    .get('/api/products/cikqgkv4q01ck7453ualdn3hd')
    .end((err, res) => {
      expect(err).toBeNull();
      expect(res.body.product.items[2]).toContain('Dog');
      done();
    });
});

test('POST api/products with cuid 0 should return message: created', (done) => {
  request(app)
  .post('/api/products')
  .send({ product: { name: 'name', cuid: 0, items: ['item'] } })
  .expect({ message: 'created' }, done);
});

test('POST api/products with cuid >0 should return message: updated', (done) => {
  request(app)
  .post('/api/products')
  .send({ product: { name: 'name', cuid: 'cikqgkv4q01ck7453ualdn3hd', items: ['item'] } })
  .expect({ message: 'updated' }, done);
});

test('DELETE api/products/<cuid> should return status 200', (done) => {
  request(app)
    .delete('/api/products/cikqgkv4q01ck7453ualdn3hd')
    .end((err) => {
      expect(err).toBeNull();
      expect(200);
      done();
    });
});
