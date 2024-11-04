const productModel = require("../../models/productModel")

const getCategoriesController = async(req,res)=>{
    try{
        const categories = await productModel.distinct("category")

        res.status(200).json({
            data : categories,
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

module.exports = getCategoriesController