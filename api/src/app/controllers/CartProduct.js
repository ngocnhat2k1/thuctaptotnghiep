const Product = require('../models/Product');
const CartProduct = require('../models/CartProduct')

class CustomerProductCarController {

    // show(req, res) {
    //     CustomerProductCart.findOne({ customer: req.user._id })
    //         .populate({
    //             path: 'cart_products',
    //             populate: {
    //                 path: 'products'}
    //         })
    //         .populate('products')
    //         // .populate('customer', 'email')
    //         .then(data => {
    //             res.json({
    //                 success: true,
    //                 data: data
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.json({
    //                 success: false
    //             })
    //         });
    // }

    // [GET] /cart/
    show(req, res) {
        CartProduct.find({ customer: req.user._id })
            .populate({
                path: 'product', options: { withDeleted: true }
            })
            .then(data => {
                res.json({
                    success: true,
                    data: data
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false
                })
            });
    }


    // [PATCH] /cart/:id
    add(req, res) {
        CartProduct.findOne({
            customer: req.user._id,
            product: req.params.id
        })
            .then(data => {
                if (!data) {
                    CartProduct.create({
                        customer: req.user._id,
                        product: req.params.id
                    })
                        .then(product => {
                            res.json({
                                success: true,
                                message: "Add product to cart successfully"
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Fai 2"
                            })
                        })
                } else {
                    data.quantity++;
                    data.save()
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Add product to cart successfully"
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Fail"
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    //[DELETE] /cart/:id
    remove(req, res) {
        CartProduct.findOneAndDelete({
            customer: req.user._id,
            product: req.params.id
        })
            .then(result => {
                res.json({
                    success: true,
                    message: "Product removed from cart successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    // [PATCH] /cart/:id/updateQuantity
    updateQuantity(req, res) {
        let quantity = req.body.quantity;
        
        if( quantity <= 0) {
            quantity = 1
        }

        CartProduct.findOneAndUpdate({
            customer: req.user._id,
            product: req.params.id
        }, {
            quantity: quantity
        })
            .then(result => {
                res.json({
                    success: true,
                    message: "Update quantity of product successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }


}

module.exports = new CustomerProductCarController();