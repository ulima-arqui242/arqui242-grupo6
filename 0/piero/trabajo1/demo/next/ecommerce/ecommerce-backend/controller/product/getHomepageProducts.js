const productModel = require("../../models/productModel");

const getHomepageProductsController = async (req, res) => {
    try {
        const featured_products = await productModel
            .find({ featured_order: { $exists: true } })
            .sort({ featured_order: 1 });

        const discount_products = await productModel
            .find({ discount_price: { $exists: true }, discount_order: { $exists: true } })
            .sort({ discount_order: 1 });

        const products = {
            "featured_products": featured_products,
            "discount_products": discount_products
        }   

        res.status(200).json({
            data:products,
            message: "Homepage products",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getHomepageProductsController;
