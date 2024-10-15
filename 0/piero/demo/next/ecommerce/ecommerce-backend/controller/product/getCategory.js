const productModel = require("../../models/productModel")

const getCategoryController = async(req,res)=>{
    try{
        const { category } = req.params;

        const products = await productModel.find({ category: category });

        if (products.length > 0) {
            res.status(200).json({
                data : products,
                message : `Products under category: ${category}`,
                success : true,
                error : false
            })
        } else {
            res.status(200).json({
                data : products,
                message : `No products found for category: ${category}`,
                success : true,
                error : false
            })
        }

        

        
    }catch(err){
        res.status(400).json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryController