const express = require("express");

const { DesignModel } = require("../models/DesignModel");

const { isValidObjectId } = require("../utils/isValidObjectId");

class DesignController {
  async index(_, res) {
    try {
      const designs = await DesignModel.find({}).exec();

      res.json({
        status: "succes",
        data: designs,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        massage: JSON.stringify(error),
      });
    }
  }

  async create(req, res) {
    try {
      const data = {
        name: req.body.name,
        color: req.body.color,
        quantity: req.body.quantity,
        photo_url: req.body.photo_url,
      }

      const design = await DesignModel.create(data);

      res.json({
        status: "succes",
        data: design,
      })

    } catch (error) {
      res.status(500).json({
        status: "error",
        massage: JSON.stringify(error),
      });
    }
  }
}


const DesignCtrl = new DesignController();
exports.DesignCtrl = DesignCtrl;