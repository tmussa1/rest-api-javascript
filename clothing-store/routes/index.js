var express = require('express');
var router = express.Router();
var Product = require('../model/products.js')
var productsController = require('../controller/productController.js');
var ProductService = productsController.ProductService;

router.get('/', (req, res, next) =>{

  ProductService.listProducts()
  .then((products) =>{
    res.render('index', { listOfProducts: products});
  });
 
});

module.exports = router;
