const productModel = require("../../models/productModel");
const { deleteFromCloudinary } = require('../../helpers/cloudinary');

const deleteProductController = async (req, res) => {
    try {
        const { product_id } = req.params;

        // Find product
        const product = await productModel.findById(product_id);
        if (!product) {
            throw new Error('Product not found')
        }

        // Delete images
        const folder = 'product_images';
        if (product.clothing_image) {
            const clothingPublicId = extractPublicId(product.clothing_image, folder);
            await deleteFromCloudinary(clothingPublicId);
        }
        if (product.model_image) {
            const modelPublicId = extractPublicId(product.model_image, folder);
            await deleteFromCloudinary(modelPublicId);
        }
        if (product.additional_images && product.additional_images.length > 0) {
            const additionalImagePublicIds = product.additional_images.map(url => extractPublicId(url, folder));
            await Promise.all(additionalImagePublicIds.map(id => deleteFromCloudinary(id)));
        }

        // Delete product
        await productModel.findByIdAndDelete(product_id);

        res.json({
            message: 'Product deleted successfully',
            success: true,
            error: false,
            data: []
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

// Helper function to extract public ID from image URL
const extractPublicId = (url, folder) => {
    const urlParts = url.split('/');
    const fileNameWithExtension = urlParts.pop();
    const fileName = fileNameWithExtension.split('.')[0];
    return `${folder}/${fileName}`;
};

module.exports = deleteProductController;
