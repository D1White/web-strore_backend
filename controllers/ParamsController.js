const express = require("express");
const { ProductModel } = require("../models/ProductModel");

const { isValidObjectId } = require("../utils/isValidObjectId");

class ParamsController {
  async show(req, res) {
    try {
      const categoryId = req.params.id;

      if (!isValidObjectId(categoryId)) {
        res.status(404).send();
        return;
      }

      let params = {};

      const max = await ProductModel.findOne({category: categoryId}).sort('-price').select('price -_id').exec();
      const min = await ProductModel.findOne({category: categoryId}).sort('price').select('price -_id').exec();

      params.price = {
        min: min.price,
        max: max.price
      }

      const params_arr = await ProductModel.find({category: categoryId}).select('info -_id').exec();

      params_arr.forEach(e => {
        const data = e.info;
        for (const i of data) {
          const key = i[0];
          if (params[key]) {
            let thereIs = false;
            params[key].forEach( info => {
              if (info === i[1]) {
                thereIs = true;
              }
            })
            if (!thereIs) {
              params[key].push(i[1]);
            }
          }else {
            params[key] = [i[1]];
          }
        }
      });

      res.json({
        status: "succes",
        data: params,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        massage: JSON.stringify(error),
      });
    }
  }
}

const ParamsCtrl = new ParamsController();
exports.ParamsCtrl = ParamsCtrl;
