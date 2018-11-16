import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: true },
  items: { type: 'Array', required: true },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('Product', productSchema);
