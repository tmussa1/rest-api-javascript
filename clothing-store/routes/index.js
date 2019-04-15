var express = require('express');
var router = express.Router();
var Product = require('../model/products.js')

router.get('/', (req, res, next) =>{
  Product.find({}, (err, products)=>{
      if(err) {
        console.log(err);
      }
      res.render('index', { listOfProducts: products});
  });
});

module.exports = router;
