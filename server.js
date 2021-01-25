const dotenv = require('dotenv');
dotenv.config();

require('./core/db');

const express = require('express');
const cors = require("cors");

const { ProductCtrl } = require('./controllers/ProductController');
const { CategoryCtrl } = require('./controllers/CategoryController');
const { DesignCtrl } = require('./controllers/DesignController');
const { PurchaseCtrl } = require('./controllers/PurchaseController');

const { createProductValidations } = require('./validations/createProduct');

const app = express();

app.use(express.json());

app.get('/products', ProductCtrl.index);
app.get('/products/:id', ProductCtrl.show);
app.post('/products', createProductValidations, ProductCtrl.create);
app.patch('/products/:id', createProductValidations, ProductCtrl.update);
app.delete('/products/:id', ProductCtrl.delete);

app.get('/categories', CategoryCtrl.index);
app.get('/categories/:id', CategoryCtrl.show);
app.post('/categories', CategoryCtrl.create);
app.patch('/categories/:id', CategoryCtrl.update);

app.get('/designs', DesignCtrl.index);
app.post('/designs', DesignCtrl.create);

app.post('/buy', PurchaseCtrl.create);

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING at http://localhost:${process.env.PORT}`);
});