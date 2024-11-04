const cartModel = require("../../models/cart");
const productModel = require("../../models/productModel");

const updateProductController = async (req, res) => {
    try {
        const { product_id, size, quantity } = req.body;
        const userId = req.user; // Se asume que el ID del usuario está disponible en req.user

        if (quantity <= 0) {
            console.log("delete from cart")
        }

        const cart = await cartModel.findOne({ user_id: userId });
        if (!cart) {
            throw new Error("Cart does not exist")
        }

        const existingProductIndex = cart.products.findIndex(p => p.product_id.toString() === product_id);
        if (existingProductIndex === -1) {
            throw new Error("Product not found in cart")
        }

        // Verificar si el producto existe en la base de datos (opcional para asegurar que el producto sigue existiendo)
        const product = await productModel.findById(product_id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            });
        }

        // Actualizar la cantidad del producto en el carrito
        cart.products[existingProductIndex].quantity = quantity;

        // Recalcular el total del carrito
        await cart.calculateTotal();

        // Guardar el carrito actualizado
        await cart.save();

        res.status(200).json({
            message: "Product quantity updated successfully",
            success: true,
            error: false,
            data: cart
        });

    } catch (err) {
        res.status(500).json({
            message: err?.message || err,
            success: false,
            error: true
        });
    }
};

module.exports = updateProductController;
