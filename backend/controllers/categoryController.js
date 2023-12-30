import  { Category } from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req,res) =>{
   try{

     const {name} = req.body;
     if(!name){
        return res.status(401).send({
            message:'Name is required'
        });
     }

     const existingCategory = await Category.findOne({name})
     if(existingCategory){
        return res.status(200).send({
            success:false,
            message:'Category Already Exists'
        });
     }

     const category = await new Category({
        name,
        slug:slugify(name),
     }).save();

     res.status(201).send({
        success:true,
        message:'new Category Created',
        category,
     });


   } catch(err){
    console.log(err);
    res.status(500).send({
        success:false,
        err,
        message:"Error in Category"
    })
   }
};


export const updateCategory = async (req,res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(
          id,
          { name, slug: slugify(name) },
          { new: true }
        //   new :true dena imp hn !!!!
        );
        res.status(200).send({
          success: true,
          messsage: "Category Updated Successfully",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while updating category",
        });
      }
};


export const getAllCategories = async (req,res) => {
    try {
        const category = await Category.find({});
        res.status(200).send({
          success: true,
          message: "All Categories List",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while getting all categories",
        });
      }
};

// get single category
export const getSingleCategory = async (req,res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        res.status(200).send({
          success: true,
          message: "Get Single Category SUccessfully",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While getting Single Category",
        });
      }
}


// delete category

export const deleteCategory = async (req,res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "Categry Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while deleting category",
          error,
        });
      }
}