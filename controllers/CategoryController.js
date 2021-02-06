const express = require("express");

const { CategoryModel } = require("../models/CategoryModel");
const { ProductModel } = require("../models/ProductModel");

const { isValidObjectId } = require("../utils/isValidObjectId");

class CategoryController {
  async index(_, res) {
    try {
      const categories = await CategoryModel.find({}).exec();

      res.json({
        data: categories,
      });

    } catch (error) {
      res.status(500).json({
        status: "error",
        massage: JSON.stringify(error),
      });
    }
  }

  async show(req, res) {
    try {
      const categoryId = req.params.id;

      if (!isValidObjectId(categoryId)) {
        res.status(404).send();
        return;
      }

      const category = await CategoryModel.findById(categoryId).populate({
        path: 'products',
        match: req.query,
      }).exec();

      res.json({
        data: category,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        massage: JSON.stringify(error),
      });
    }
  }

  async create(req, res) {
    try {
      // const errors = validationResult(req);

      // if (!errors.isEmpty()) {
      //   res.status(400).json({
      //     status: "error",
      //     errors: errors.array(),
      //   });
      //   return;
      // }

      const data = {
        name: req.body.name,
        full_name: req.body.full_name,
      }

      const category = await CategoryModel.create(data);

      res.status(201).json({
        data: category,
      })

    } catch (error) {
      res.status(500).json({
        status: "error",
        massage: JSON.stringify(error),
      });
    }
  }

  async update(req, res) {
    try {

      const category = await CategoryModel.updateOne(
        { _id: req.params.id },
        { $set: {
          name: req.body.name,
        }}
      );

      res.json({
        data: category,
      });

    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

const CategoryCtrl = new CategoryController();
exports.CategoryCtrl = CategoryCtrl;