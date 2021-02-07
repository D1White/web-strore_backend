const express = require("express");

const { isValidObjectId } = require("../utils/isValidObjectId");
const { validationResult } = require('express-validator');

const { ProductModel } = require("../models/ProductModel");
const { OrderModel } = require('../models/OrderModel');

class OrderController {
  async index(_, res) {
    try {
      const orders = await OrderModel.find({}).exec()

      res.json({
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        massage: JSON.stringify(error),
      });
    }
  }
  
  async create(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
        });
        return;
      }

      const purchase_arr = req.body.purchase_arr;

      try {
        for (const obj of purchase_arr) {
          const index = purchase_arr.indexOf(obj);
          
          await ProductModel.findOne({
            _id: obj.id,
            "design._id": obj.design_id,
          }).select("design.$ -_id")
            .then((product) => {
              if (product.design[0].quantity - obj.quantity < 0) {
                throw {
                  name: "invalid product quantity",
                  message: `purcgace_arr[${index}] specified incorrect quantity. Total ${product.design[0].quantity} product units`,
                };
              }
            })
            .catch((e) => {
              throw e;
            });
        }
      } catch (error) {
        res.status(404).json({
          massage: JSON.stringify(error),
        });
        return;
      }

      purchase_arr.forEach(obj => {
      ProductModel.updateOne(
          { '_id': obj.id, 'design._id': obj.design_id },
          {
            $inc: {
              'design.$.quantity': -obj.quantity
            }
          }
        ).exec()
      });

      let price_total = 0;

      for (const obj of purchase_arr) {
        const price = await ProductModel.findById(obj.id).select('price -_id').exec();
        price_total += price.price * obj.quantity;
      }

      //создание заказа

      const data = {
        order: purchase_arr,
        buyer: req.body.buyer,
        price: price_total,
        status: 'created',
        createdAt: new Date(),
      }

      const order = await OrderModel.create(data);


      res.status(201).json({
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        massage: JSON.stringify(error),
      });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
        });
        return;
      }

      //проверкка на корректный ObjectId
      const orderId = req.params.id;

      if (!isValidObjectId(orderId)) {
        res.status(404).json({
          message: "Order id is wrong"
        });
        return;
      }

      const order = await OrderModel.updateOne(
        { _id: orderId},
        { $set: {
          buyer: req.body.buyer,
          status: req.body.status,
          updatedAt: new Date()
        }}
      );

      res.json({
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        massage: JSON.stringify(error),
      });
    }
  }
}

const OrderCtrl = new OrderController();
exports.OrderCtrl = OrderCtrl;
