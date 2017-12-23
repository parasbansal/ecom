const mongoose = require('mongoose');

// Product Schema
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

// Model Functions
// Get All
module.exports.getAll = function (page, callback) {
    Product.find({ stock: { $gt: 0 } }).skip((page - 1) * 10).limit(10).exec(callback);
}

// Get By Id
module.exports.getById = function (id, callback) {
    Product.findById(id).exec(callback);
}

// Get By Ids
module.exports.getByIds = function (ids, callback) {
    Product.find({
        '_id': { $in: ids }
    }).exec(callback);
}

// Add
module.exports.add = function (newItem, callback) {
    newItem.save(callback);
}

// update Stock
module.exports.updateStock = function (id, newStock, callback) {
    Product.findByIdAndUpdate(id, { $set: { stock: newStock } }, callback);
}