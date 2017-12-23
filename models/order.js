const mongoose = require('mongoose');

// Order Schema
const OrderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    products: [{
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalQuantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentOption: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

// Model Functions
// Get All
module.exports.getAll = function (callback) {
    Order.find({}).exec(callback);
}

// Get By Id
module.exports.getById = function (id, callback) {
    Order.findById(id).exec(callback);
}

// Add
module.exports.add = function (newItem, callback) {
    newItem.save(callback);
}
