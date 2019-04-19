var multer = require('multer');
var upload = multer({dest : 'public/images'})
var express = require('express');
var router = express.Router();
var Product = require('../model/products.js');
var productController = require('../controller/productController.js');
var ProductService = productController.ProductService;

//Get all products
router.get('/', (req, res, next) =>{
    ProductService.listProducts()
    .then((products) =>{
        res.status(200);
        res.json(products);
    });
});

//Create a new product
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

    ProductService.createProduct(newProduct)
    .then((product)=>{
        res.status(201);
        res.json(product);
    }).catch((err) => {
        res.send(JSON.stringify(err));
    });
});

//Get by id
router.get('/:product_id', (req, res, next) =>{
    var id = req.params.product_id;
    return ProductService.getAProduct(id)
        .then((product) =>{
            res.status(200);
            res.json(product);
        })
});

//Update Product
router.put('/:product_id', upload.single('imageUrl'), (req, res, next) =>{
    var product_id = req.params.product_id;

    var name  = req.body.name;
    var price = parseInt(req.body.price);
    var description = req.body.description;
    var imageUrl = "/static/images/" + req.file.filename;

    var newProduct = new Product({
        _id : product_id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    });

    ProductService.updateAProduct(product_id, newProduct)
    .then(product =>{
        res.status(200);
        res.json(product);
    }).catch((err)=>{
        res.send(JSON.stringify(err));
    });
});

//Delete a product
  router.delete('/:product_id', (req, res, next)=>{

    var id = req.params.product_id;

    ProductService.deleteAProduct(id)
    .then((product)=>{
        res.status(200);
        res.json(product);
    }).catch((err) =>{
        res.send(JSON.stringify(err));
    });
  });

module.exports = router;