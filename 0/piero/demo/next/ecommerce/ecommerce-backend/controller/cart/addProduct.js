const cartModel = require("../../models/cartModel")

const addToCartController = async(req,res)=>{
    try{
        const { product_id, size, quantity } = req.body
        const user_id = req.user;

        const product  = await addToCartModel.findById(product_id)

        if (!product) {
            throw new Error("Product doesnt exist")
        }
        if (!product.sizes.includes(size)) {
            throw new Error("Invalid size")
        }
        if (quantity > product.stock) {
            throw new Error("Insufficient stock for the requested quantity")
        }

        let cart = await cartModel.findOne({ user_id: user_id });

        if (!cart) {
            throw new Error("Cart does not exist")
        }

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.products.findIndex(p => p.product_id.toString() === product_id && p.size === size);
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product_id: product_id, quantity, size });
        }

        await cart.calculateTotal()

        await cart.save()

        res.status(200).json({
            message: "Product added to cart successfully",
            success: true,
            error: false,
            data: {
                products: cart.products,
                total: cart.total
            }
        });

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController