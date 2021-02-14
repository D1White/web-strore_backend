const {model, Schema} = require('mongoose');

const DesignSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  color: {
    type: String
  },
  quantity: {
    required: true,
    type: Number
  },
  photo_url: {
    type: String
  },
});

// const DesignModel = model('Design', DesignSchema);
// exports.DesignModel = DesignModel;
exports.DesignSchema = DesignSchema;