const express = require("express");
const { ProductModel } = require("../models/ProductModel");
const { isValidObjectId } = require("../utils/isValidObjectId");

class PromoController {
  async index(_, res) {
    try {   
      const novetly = await ProductModel.find({}).sort({ _id: -1 }).limit(4).exec();

      const top_sales = await ProductModel.find({}).sort({ orderIndex: -1 }).limit(4).exec();

      res.json({
        novetly: novetly,
        top_sales: top_sales
      })
    } catch (error) {
      res.status(500).json({
        massage: JSON.stringify(error),
      });
    }
  }
}

const PromoCtrl = new PromoController();
exports.PromoCtrl = PromoCtrl;