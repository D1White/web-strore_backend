const { body } = require("express-validator");

const createOrderValidations = [
  body("purchase_arr", "Введите массив покупки")
    .isArray({
      min: 1
    })
    .withMessage("Минимальная длина массива покупки 1"),
  body("purchase_arr.*.id", "Введите id товара")
    .isMongoId()
    .withMessage("Некоректный id товара"),
  body("purchase_arr.*.design_id", "Введите id дизайна")
    .isMongoId()
    .withMessage("Некоректный id дизайна"),
  body("purchase_arr.*.quantity", "Введите кол-во товара")
    .isNumeric({
      min: 1
    })
    .withMessage("Минимальное кол-во товара 1"),
  body("buyer.initials", "Введите инициалы")
    .isString()
    .isLength({
      min: 3,
      max: 25
    })
    .withMessage("Допустимое кол-во символов в инициалах от 3 до 25"),
  body("buyer.phone", "Введите телефон")
    .isMobilePhone('uk-UA')
    .withMessage("Не коректный номер телефона"),
  body("buyer.mail", "Введите ел. почту")
    .isEmail()
    .withMessage("Не коректная ел. почту"),
  body("buyer.city", "Введите город")
    .isString()
    .isLength({
      min: 2,
      max: 30
    })
    .withMessage("Допустимое кол-во символов в названии города от 2 до 30"),
  body("buyer.post", "Введите номер отдления")
    .isNumeric({
      min: 1,
      max: 1000
    })
    .withMessage("Допустимый номер отделения от 1 до 1000"),
  // body("status", "Введите статус заказа")
  //   .isString()
  //   .withMessage("Неверный статус заказа"),
];

exports.createOrderValidations = createOrderValidations;