const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const env = require('./env');

// Routes
const products = require('./routes/products');
const orders = require('./routes/orders');

const app = express();

mongoose.connect(env.database, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setting public folder
app.use(express.static(path.join(__dirname, 'public')));

// Using Morgan
morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
})

// Using Cors Middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// Using Routes
app.use('/products', products);
app.use('/orders', orders);

// To get the uploaded files
app.get('/uploads/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads/' + req.params.id));
});

// 404
app.get('*', (req, res) => {
    res.send('404');
});

// Listening to port
app.listen(env.port, () => {
    console.log('serving on localhost:' + env.port);
});