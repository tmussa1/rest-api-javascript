var multer = require('multer');
var Product = require('../model/products.js');

class ProductService{

    //Get all products
    static listProducts(){
        return Product.find({})
        .then(function(products){
            return products;
        });
    }

    //create a product
    static createProduct(newProduct){
        const product = new Product(newProduct);
        return product.save();
    }

    //Get a product
    static getAProduct(id){
        return Product.findById(id)
        .then(function(product){
            return product;
        });
    }

    //update a product
    static updateAProduct(id, newProduct){
        return Product.findById(id)
        .then(function(product){
            product.set(newProduct);
            product.save();
            return product;
        });
    }

    //Delete a product
    static deleteAProduct(id){
        return Product.deleteOne({_id : id})
        .then((product)=>{
            return product;
        })
    }

    static deleteAllProducts(){
        return Product.deleteMany({})
        .then((products)=>{
            return products;
        })
    }

}

module.exports.ProductService = ProductService;