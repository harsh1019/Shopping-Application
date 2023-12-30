import express from "express";
import { isadmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProduct, deleteProduct, filterProducts, getAllProducts, getPhoto, getSingleProduct, productCategory, productCount, productList, relatedProducts, searchProduct, updateProduct } from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router();

// routes
router.post('/create-product',requireSignIn,isadmin,formidable(), createProduct)

// getProducts
router.get('/get-products',getAllProducts)


// singleProduct
router.get('/get-products/:slug',getSingleProduct);

// getphoto
router.get('/product-photo/:pid',getPhoto);

// deleteProduct
router.delete('/delete-product/:pid',deleteProduct);

// updateProduct
router.put('/update-product/:pid',requireSignIn,isadmin,formidable(),updateProduct)

// filter product
router.post('/product-filters',filterProducts)

// product count
router.get("/product-count",productCount);

// product per page
router.get("/product-list/:page",productList);

// search Product
router.get("/search/:keyword",searchProduct);

// similar product
router.get("/related-product/:pid/:cid",relatedProducts);

// category wise product 
router.get("/product-category/:slug",productCategory);

// payment
// token
router.get('/braintree/token',braintreeTokenController)

// payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController);
export default router;