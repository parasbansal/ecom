const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const Order = require('../models/order');
const Product = require('../models/product');

// Get All
router.get('/', (req, res, next) => {
    Order.getAll((err, data) => {
        if (err) {
            res.status(422).json({
                status: false,
                message: 'There was some error. ' + err
            });
        } else {
            res.status(200).json({
                status: true,
                data: data
            });
        }
    });
});

// NOTE: This is not for production ready.
// Ideally we will make user account and save data in his/her cart which will persist in database as a subdocument in user document.
// Below code could fail if user changed the cart values as it is saved in localstorage or there would be old enough data in cart.
// Add
router.post('/', [
    check('name').exists(),
    check('email').isEmail(),
    check('phone').exists(),
    check('products').exists(),
    check('address').exists(),
    check('pincode').exists(),
    check('city').exists(),
    check('state').exists(),
    check('totalQuantity').exists(),
    check('totalPrice').exists(),
    check('paymentOption').exists()
], (req, res, next) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("validation errors: " + errors.mapped());
        res.status(422).json({ errors: errors.mapped() });
    }

    console.log("Working");

    let cartProducts = req.body.products;

    let newItem = new Order({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        products: req.body.products,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        totalQuantity: req.body.totalQuantity,
        totalPrice: req.body.totalPrice,
        paymentOption: req.body.paymentOption
    });

    console.log(newItem);

    Order.add(newItem, (err, data) => {
        if (err) {
            console.log("order save fail ", err);
            res.status(422).json({
                status: false,
                message: 'There was some error. ' + err
            });
        } else {
            console.log("order saved");
            res.status(200).json({
                status: true,
                data: data
            });
        }
    });
});

// Get By Id
router.get('/:id', (req, res, next) => {
    Order.getById((err, data) => {
        if (err) {
            res.status(422).json({
                status: false,
                message: 'There was some error. ' + err
            });
        } else {
            res.status(200).json({
                status: true,
                data: data
            });
        }
    });
});

module.exports = router;