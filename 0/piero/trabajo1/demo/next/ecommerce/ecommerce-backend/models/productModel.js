const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    sizes: {
        type: [String],
        enum: ["XS", "S", "M", "L", "XL"],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one size must be selected'
        }
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount_price: {
        type: Number,
        min: 0,
        validate: {
            validator: function(value) {
                return value < this.price;
            },
            message: "Discount price must be less than the original price"
        }
    },
    clothing_image: {
        type: String,
        trim: true
    },
    model_image: {
        type: String,
        trim: true
    },
    additional_images: {
        type: [String],
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    featured_order: {
        type: Number,
        unique: true,
        min: 1
    },
    discount_order: {
        type: Number,
        unique: true,
        min: 1,
        validate: {
            validator: function() {
                return this.discount_price != null;
            },
            message: 'Discounted price must be set in order to define a discount order'
        }
    }
},{
    timestamps : true
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
