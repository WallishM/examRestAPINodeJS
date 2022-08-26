const Product = require('../models/product');

exports.list = async (req, res, next) => {
    try {
        let products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.show = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.store = async (req, res, next) => {
    try {
        // TODO: data validation
        let product = new Product(req.body);
        product = await product.save();
        res.json({message: 'Product added', product});
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        // TODO: data validation
        let product = await Product.findById(req.params.id);
        Object.assign(product, req.body);
        product = await product.save();
        res.json({message: 'Product updated', product});
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        await product.delete();
        res.json({lessage: 'Product deleted'});
    } catch (err) {
        next(err);
    }
};