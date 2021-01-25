const express = require("express");
const { isValidObjectId } = require("../utils/isValidObjectId");
const { ProductModel } = require("../models/ProductModel");

class PurchaseController {
  async create(req, res) {
    try {
      const purchase_arr = req.body.purchase_arr;
      const buyer = req.body.buyer;

      try {
        for (const obj of purchase_arr) {
          if (!isValidObjectId(obj.id)) {
            throw {
              name: "invalid object id",
              message: `purcgace_arr[${index}] specified incorrect product id`,
            };
          }

          if (!isValidObjectId(obj.design_id)) {
            throw {
              name: "invalid object id",
              message: `purcgace_arr[${index}] specified incorrect design id`,
            };
          }

          await ProductModel.findOne({
            _id: obj.id,
            "design._id": obj.design_id,
          })
            .select("design.$ -_id")
            .then((product) => {
              // console.log(product.design[0].quantity);
              if (product.design[0].quantity - obj.quantity < 0) {
                throw {
                  name: "invalid product quantity",
                  message: `purcgace_arr[${index}] specified incorrect quantity. Total ${product.design[0].quantity} product units`,
                };
              }
            })
            .catch((e) => {
              console.log(e);
              throw e;
            });
        }
      } catch (error) {
        res.status(404).json({
          status: "error",
          massage: JSON.stringify(error),
        });
        return;
      }

      // purchase_arr.forEach(obj => {
      // ProductModel.updateOne(
      //     { '_id': obj.id, 'design._id': obj.design_id },
      //     {
      //       // $set: {
      //       //   'design.$.quantity': 3
      //       // }
      //       $inc: {
      //         'design.$.quantity': -obj.quantity
      //       }
      //     }
      //   ).exec()
      // });

      res.json({
        status: "succes",
        // data: upd,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        massage: JSON.stringify(error),
      });
    }
  }
}

const PurchaseCtrl = new PurchaseController();
exports.PurchaseCtrl = PurchaseCtrl;
