const {model, Schema} = require('mongoose');
const { DesignSchema } = require('./DesignModel');

const ProductSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  full_name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number
  },
  photo_url: [String],
  category: {
    required: true,
    ref: 'Category',
    type: Schema.Types.ObjectId,
  },
  design: [DesignSchema],
  info: {
    type: Map,
    of: String
  }
});

const ProductModel = model('Product', ProductSchema);
exports.ProductModel = ProductModel;