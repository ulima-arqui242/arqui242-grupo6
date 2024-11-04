const express = require('express');
const router = express.Router();

const getProductController = require('../controller/product/getProduct');
const createProductController = require('../controller/product/createProduct');
const editProductController = require('../controller/product/editProduct');
const deleteProductController = require('../controller/product/deleteProduct');

const getHomepageProductsController = require('../controller/product/getHomepageProducts');
const getProductsController = require('../controller/product/getProducts');
const getCategoriesController = require('../controller/product/getCategories');
const getCategoryController = require('../controller/product/getCategory');


const requireSignIn = require('../middleware/requireSignIn');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../helpers/multer');

// CRUD product
router.get("/get/:product_id", getProductController);
router.post("/create", requireSignIn, isAdmin, upload.fields([
  { name: 'clothing_image', maxCount: 1 },
  { name: 'model_image', maxCount: 1 },
  { name: 'additional_images', maxCount: 5 }
]), createProductController);
router.put("/edit/:product_id", requireSignIn, isAdmin, upload.fields([
  { name: 'clothing_image', maxCount: 1 },
  { name: 'model_image', maxCount: 1 },
  { name: 'additional_images', maxCount: 5 }
]), editProductController);
router.delete("/delete/:product_id", requireSignIn, isAdmin, deleteProductController);

// Home page
router.get("/homepage", getHomepageProductsController);

// Product list
router.get("/all", getProductsController);
router.get("/categories", getCategoriesController);
router.get("/category/:category", getCategoryController);


module.exports = router;
