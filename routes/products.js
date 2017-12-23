const express = require('express');
const router = express.Router();
const multer = require('multer');

const DIR = './uploads/';
const upload = multer({ dest: DIR }).single('photo');

const Product = require('../models/product');

// Get All
router.get('/:page', (req, res, next) => {
    Product.getAll(req.params.page, (err, data) => {
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

// Add
router.post('/', (req, res, next) => {
    let path = '';
    let body;

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(422).json({ error: "an Error occured" });
        }

        path = req.file.path;

        body = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image: path
        };

        console.log(body);
        let newItem = new Product(body);

        console.log(newItem);
        Product.add(newItem, (err, data) => {
            console.log(err, data);
            if (err) {
                console.log(err);
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

});


// Get By Id
router.get('/:id', (req, res, next) => {
    Product.getById((err, data) => {
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