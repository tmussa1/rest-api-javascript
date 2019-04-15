var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: 'string',
    price: 'number',
    description: 'string',
    imageUrl: 'string'
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;