const {model, Schema} = require('mongoose');

const BuyerSchema = new Schema({
  initials: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String
  },
  mail: {
    required: true,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  post: {
    required: true,
    type: Number
  },
});


const OrderSchema = new Schema({
  order: [Object],
  buyer: BuyerSchema,
  price: {
    required: true,
    type: Number
  },
  status: {
    required: true,
    type: String,
    enum: [
      'created',
      'paid',
      'sent',
      'fulfilled',
      'refunded',
    ]
  },
  el_waybill: String,
  createdAt: Date,
  updatedAt: Date
});

const OrderModel = model('Order', OrderSchema);
exports.OrderModel = OrderModel;