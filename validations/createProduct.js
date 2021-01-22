const { body } = require("express-validator");

const createProductValidations = [
  body("name", "Введите название товара")
    .isString()
    .isLength({
      min: 5,
    })
    .withMessage("Допустимое кол-во символов в названии от 5 до 40"),
  body('price', 'Введите цену')
    .isFloat({
      min: 0.1,
    })
    .withMessage("Минимальная цена 0.1 $"),
  // body('quantity', 'Введите кол-во товара')
  //   .isInt({
  //     min: 1,
  //   })
  //   .withMessage("Минимальное кол-во 1"),
];

exports.createProductValidations = createProductValidations;