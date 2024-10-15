const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (result) {
                    resolve(result.secure_url)
                } else {
                    reject(error)
                }
            }
        );
        stream.end(fileBuffer)
    });
};

const extractPublicId = (url, folder) => {
    const urlParts = url.split('/');
    const fileNameWithExtension = urlParts.pop();
    const fileName = fileNameWithExtension.split('.')[0];
    return `${folder}/${fileName}`;
};

const deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (result && result.result === 'ok') {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = { 
    uploadToCloudinary, 
    extractPublicId,
    deleteFromCloudinary 
};
