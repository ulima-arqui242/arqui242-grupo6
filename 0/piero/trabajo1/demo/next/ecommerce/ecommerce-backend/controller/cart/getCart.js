const cartModel = require("../../models/cartModel")

const addToCartViewProduct = async(req,res)=>{
    try{
        const user_id = req.user;

        const cart = await cartModel.findOne({ user_id: user_id }).populate('products.product_id');

        if (!cart) {
            throw new Error("Cart does not exist")
        }

        res.json({
            message: "Cart retrieved successfully",
            success: true,
            error: false,
            data: {
                products: cart.products,
                total: cart.total
            }
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  addToCartViewProduct