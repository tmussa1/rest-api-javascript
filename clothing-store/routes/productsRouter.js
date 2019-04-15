var multer = require('multer');
var upload = multer({dest : 'public/images'})
var express = require('express');
var router = express.Router();
var Product = require('../model/products.js');

//Get all products
router.get('/', (req, res, next) =>{
    Product.find({}, (err, products)=>{
        if(err) {
            res.send(err);
        }
    res.render('products', {listOfProducts : products});
    });
});

//Add a new product
router.post('/addProduct', upload.single('imageUrl'), (req, res, next)=>{
    
    var name  = req.body.name;
    var price = parseInt(req.body.price);
    var description = req.body.description;
    var imageUrl = "/static/images/" + req.file.filename;

    var newProduct = new Product({
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    });

    newProduct.save(function(err){
        if(err){
            console.error.bind(err);
        } 
        res.redirect('/products/');
    });
});

//Get by name
router.get('/:name', (req, res, next) =>{
    var name = req.params.name;

    Product.findOne({name : name}, (err, product)=>{
        if(err) {
            console.log(err);
        }
        res.render('details', {product: product});
    });
});

//Update Product
router.get('/edit/:product_id', (req, res, next) =>{
    var product_id = req.params.product_id;

    Product.findOne({_id : product_id}, (err, product)=>{
        if(err) {
            console.log(err);
        }
        res.render('updateProducts', {product: product});
    });
});

//Update product
router.post('/edit/:product_id', (req, res, next)=>{
    Product.findOne({_id: req.params.product_id})
      .then((product)=>{
        var updated  = {
           name: req.body.name,
           description: req.body.description,
           price: req.body.price
           }
        product.set(updated);
        product.save((err)=>{
          if(err){
              console.log(err);
          }
          res.redirect('/products/');
        });
      })
  });

  router.get('/delete/:product_id', (req, res, next)=>{
    Product.deleteOne({_id: req.params.product_id}, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
  });

module.exports = router;