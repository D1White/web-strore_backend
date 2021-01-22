const express = require("express");
const { validationResult } = require('express-validator');

const { ProductModel } = require("../models/ProductModel");
const { CategoryModel } = require("../models/CategoryModel");

const { isValidObjectId } = require("../utils/isValidObjectId");

class ProductController {
  async index(req, res) {
    try { 

      if (JSON.stringify(req.query) !== '{}') {
        console.log(req.query);
        const products = await ProductModel.find(req.query).exec();
        res.json({
          status: "succes",
          data: products,
        });
      }else {
        const products = await ProductModel.find({}).exec();
        res.json({
          status: "succes",
          data: products,
        });
      }
      
    } catch (error) {
      res.json({
        status: "error",
        message: JSON.stringify(error),
      });
    }
  }

  async show(req, res) {
    try {
      const productId = req.params.id;

      if (!isValidObjectId(productId)) {
        res.status(404).send();
        return;
      }

      const product = await ProductModel.findById(productId).exec();

      if (!product) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "succes",
        data: product,
      })
    } catch (error) {
      
    }
  }

  async create(req, res) {
    try {
      //проверка валидацией
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
        return;
      }

      //проверкка на корректный ObjectId
      const categoryId = req.body.category;

      if (!isValidObjectId(categoryId)) {
        res.status(404).json({
          status: "error",
          message: "Category id is wrong"
        });
        return;
      }

      //проверка существует ли категория с таки id
      const category = await CategoryModel.findById(categoryId).exec();

      if (!category) {
        res.status(404).json({
          status: "error",
          message: "Categories with this id does not exist"
        });
        return;
      }

      const data = {
        name: req.body.name,
        full_name: req.body.full_name,
        price: req.body.price,
        photo_url: req.body.photo_url,
        category: req.body.category,
        design: req.body.design,
        info: req.body.info,
        description: req.body.description,
      }

      const product = await ProductModel.create(data);

      await CategoryModel.updateOne(
        { _id: categoryId },
        { $push: {
          products: product._id,
        } }
      )

      res.json({
        status: "succes",
        data: await product.populate({
          path: 'category',
          select: '-products',
        }).execPopulate(),
      })

    } catch (error) {
      res.json({
        status: "error",
        message: JSON.stringify(error),
      });
    }
  }

  async update(req, res) {
    try {
      //проверка валидацией
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
        return;
      }

      //проверкка на корректный ObjectId
      const categoryId = req.body.category;

      if (!isValidObjectId(categoryId)) {
        res.status(404).json({
          status: "error",
          message: "Category id is wrong"
        });
        return;
      }

      //проверка существует ли категория с таки id
      const category = await CategoryModel.findById(categoryId).exec();

      if (!category) {
        res.status(404).json({
          status: "error",
          message: "Categories with this id does not exist"
        });
        return;
      }

      const product = await ProductModel.updateOne(
        { _id: req.params.id },
        { $set: {
          name: req.body.name,
          full_name: req.body.full_name,
          price: req.body.price,
          photo_url: req.body.photo_url,
          category: req.body.category,
          design: req.body.design,
          info: req.body.info,
          description: req.body.description,
        }}
      );

      res.json({
        status: "succes",
        data: product,
      });

    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async delete(req, res) {
    try {
       //проверкка на корректный ObjectId
       const productId = req.params.id;

      if (!isValidObjectId(productId)) {
        res.status(400).send();
        return;
      }

      const product = await ProductModel.findById(productId);

      if (product) {

        CategoryModel.updateOne(
          { _id: product.category },
          { $pull: { products: product._id }},
          function(err, result) {
            if (err) {
              res.send(err);
            } else {
              product.remove();
              res.json({
                status: "succes",
                message: "Product deleted successfully",
              });
            }
          }
        );

      }else {
        res.status(404).send();
      }

      
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

const ProductCtrl = new ProductController();
exports.ProductCtrl = ProductCtrl;