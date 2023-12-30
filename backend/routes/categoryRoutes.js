import express from "express";
import { isadmin, requireSignIn } from "../middlewares/authmiddleware.js";
import {createCategoryController, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controllers/categoryController.js";


const router = express.Router();

// routes
// create category
router.post('/create-category',requireSignIn,isadmin,createCategoryController);

// update Category
router.put("/update-category/:id",requireSignIn,isadmin,updateCategory)

// getAll categories
router.get("/category",getAllCategories);

// getsinglecategory
router.get("/single-category/:slug",getSingleCategory);

// deleteCategory
router.delete("/delete-category/:id",requireSignIn,isadmin,deleteCategory);

export default router;