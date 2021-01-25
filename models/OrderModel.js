const {model, Schema} = require('mongoose');

const OrderSchema = new Schema({
  order: [Object],
  buyer: {
    type: Map,
    of: String
  },
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
  date: Date,
  update_date: Date
});

const OrderModel = model('Order', OrderSchema);
exports.OrderModel = OrderModel;