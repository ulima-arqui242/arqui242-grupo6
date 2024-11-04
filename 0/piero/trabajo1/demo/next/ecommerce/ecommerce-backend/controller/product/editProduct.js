const productModel = require("../../models/productModel");
const { uploadToCloudinary, extractPublicId, deleteFromCloudinary } = require('../../helpers/cloudinary');

const editProductController = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { name, description, sizes, category, price, discount_price, stock, featured_order, discount_order } = req.body;

        let product = await productModel.findById(product_id);
        if (!product) {
            throw new Error('Product not found')
        }

        // Update basic fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.sizes = sizes || product.sizes;
        product.category = category || product.category;
        product.price = price || product.price;
        product.discount_price = discount_price || product.discount_price;
        product.stock = stock || product.stock;
        product.featured_order = featured_order || product.featured_order;
        product.discount_order = discount_order || product.discount_order;


        // Update images
        const folder = 'product_images';
        if (req.files['clothing_image']) {
            if (product.clothing_image) {
                const clothingPublicId = extractPublicId(product.clothing_image, folder);
                await deleteFromCloudinary(clothingPublicId);
            }
            const clothingImageBuffer = req.files['clothing_image'][0].buffer;
            product.clothing_image = await uploadToCloudinary(clothingImageBuffer, folder);
        }
        if (req.files['model_image']) {
            if (product.model_image) {
                const modelPublicId = extractPublicId(product.model_image, folder);
                await deleteFromCloudinary(modelPublicId);
            }
            const modelImageBuffer = req.files['model_image'][0].buffer;
            product.model_image = await uploadToCloudinary(modelImageBuffer, folder);
        }
        if (req.files['additional_images']) {
            if (product.additional_images && product.additional_images.length > 0) {
                const additionalImagePublicIds = product.additional_images.map(url => extractPublicId(url, folder));
                await Promise.all(additionalImagePublicIds.map(id => deleteFromCloudinary(id)));
            }
            const additionalImagesBuffers = req.files['additional_images'].map(file => file.buffer);
            const uploadPromises = additionalImagesBuffers.map(buffer => uploadToCloudinary(buffer, folder));
            product.additional_images = await Promise.all(uploadPromises);
        }

        // Update
        await product.save();

        res.json({
            message: 'Product updated successfully',
            success: true,
            error: false,
            data: product
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = editProductController;
