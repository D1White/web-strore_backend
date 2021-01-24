const { body } = require("express-validator");

const createProductValidations = [
  body("name", "Введите название товара")
    .isString()
    .isLength({
      min: 5,
      max: 40
    })
    .withMessage("Допустимое кол-во символов в названии от 5 до 40"),
  body("full_name", "Введите полное название товара")
    .isString()
    .isLength({
      min: 5,
      max: 40
    })
    .withMessage("Допустимое кол-во символов в названии от 5 до 40"),
  body('price', 'Введите цену')
    .isFloat({
      min: 0.1,
    })
    .withMessage("Минимальная цена 0.1 $"),
  body('photo_url', 'Введите массив фотографий')
    .isArray({
      min: 1,
    })
    .withMessage("Минимальная длина массива 1"),
  body('photo_url.*', 'Введите ссылку на фотографию')
    .isURL()
    .withMessage("Ссылка на фото не коректна"),
  body('category', 'Введите id категории')
    .isMongoId()
    .withMessage("Id категории некоректный"),
  body('design', 'Введите дизайн товара')
    .isArray()
    .withMessage("Должен быть как минимум 1 дизайн"),
  body('design.*.name', 'Введите название дизайна')
    .isString()
    .isLength({
      min: 1
    })
    .withMessage("Минимальная длина названия дизайна 1"),
  body('design.*.color', 'Введите цвет дизайна в HEX')
    .isHexColor()
    .withMessage("Не верный формат цвета"),
  body('design.*.quantity', 'Введите кол-во товара')
    .isInt({
      min: 1,
    })
    .withMessage("Минимальное кол-во 1"),
  body('design.*.photo_url', 'Введите ссылку на фото дизайна')
    .isURL()
    .withMessage("Не верный формат ссылки"),
  // body('design.*.product', 'Введите id товара дизайна')
  //   .isMongoId()
  //   .withMessage("Не коректный id"),
  // body('info', 'Введите информацию о товаре')
  //   .isJSON()
  //   .withMessage("Не коректный объект"),
  body('description')
    .isString()
    .isLength({
      min: 5
    })
    .withMessage('Минимальная длина описания 5 символов'),
];

exports.createProductValidations = createProductValidations;