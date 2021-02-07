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
});

const CategoryModel = model('Category', CategorySchema);
exports.CategoryModel = CategoryModel;