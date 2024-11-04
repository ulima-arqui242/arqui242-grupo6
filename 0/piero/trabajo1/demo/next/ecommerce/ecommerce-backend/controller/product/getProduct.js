const productModel = require("../../models/productModel")

const getProductController = async(req,res)=>{
    try{
        const { product_id } = req.params;

        const product = await productModel.findById(product_id)

        res.status(200).json({
            data : product,
            message : "Product details",
            success : true,
            error : false
        })

        
    }catch(err){
        res.status(400).json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductController