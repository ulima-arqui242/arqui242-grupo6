const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    products: {
        type: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }],
        default: []
    },
    total: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
},{
    timestamps : true
})

cartSchema.path('products').default([]);

cartSchema.methods.calculateTotal = async function () {
    let total = 0;
    for (let item of this.products) {
        const product = await mongoose.model('products').findById(item.product_id);
        const priceToUse = product.discount_price ? product.discount_price : product.price;
        total += priceToUse * item.quantity;
    }
    this.total = total;
    await this.save();
};

const cartModel = mongoose.model("carts",cartSchema)

module.exports = cartModel