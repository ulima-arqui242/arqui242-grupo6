const productModel = require("../../models/productModel")
const {uploadToCloudinary} = require('../../helpers/cloudinary')

const newProductController = async (req, res) => {
    try {
        const { name, description, sizes, category, price, discount_price, stock, featured_order, discount_order } = req.body;

        if (!name || !sizes || sizes || !category || !price || !stock ) {
            throw new Error('Name, sizes, category, price and stock are required');
        }

        if (!req.files || !req.files['clothing_image'] || !req.files['model_image']) {
            throw new Error('Both clothing and model images are required');
        }

        // Upload images to Cloudinary
        const folder = 'product_images'
        
        const clothingImageBuffer = req.files['clothing_image'][0].buffer;
        const modelImageBuffer = req.files['model_image'][0].buffer;
        
        const clothingImageUrl = await uploadToCloudinary(clothingImageBuffer, folder);
        const modelImageUrl = await uploadToCloudinary(modelImageBuffer, folder);

        let additionalImagesUrls = [];
        if (req.files['additional_images']) {
            const additionalImagesBuffers = req.files['additional_images'].map(file => file.buffer);
            const uploadPromises = additionalImagesBuffers.map(buffer => uploadToCloudinary(buffer, folder));
            additionalImagesUrls = await Promise.all(uploadPromises);
        }

        // Create new product
        const newProduct = new productModel({
            name,
            description,
            sizes,
            category,
            price,
            discount_price,
            clothing_image: clothingImageUrl,
            model_image: modelImageUrl,
            additional_images: additionalImagesUrls,
            stock,
            featured_order,
            discount_order
        });

        const product = await newProduct.save();

        res.status(201).json({
            data: product,
            message: "Product created successfully",
            success: true,
            error: false
        });
      
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = newProductController;
