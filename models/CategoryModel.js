const {model, Schema} = require('mongoose');

const CategorySchema = new Schema({
  name: {
    required: true,
    unique: true,
    type: String,
  },
  full_name: {
    required: true,
    unique: true,
    type: String,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
});

const CategoryModel = model('Category', CategorySchema);
exports.CategoryModel = CategoryModel;