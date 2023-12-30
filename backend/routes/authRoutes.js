import express from "express";
import { forgotPassword, getAllOrders, getOrders, loginUser, orderStatusController, registerUser, testController, updateProfile } from "../controllers/authcontroller.js";
import { isadmin, requireSignIn } from "../middlewares/authmiddleware.js";


const router = express.Router();

// register
router.post("/auth",registerUser)

// Login
router.post("/login",loginUser)


// testroute
router.get("/test",requireSignIn,isadmin,testController)

// protected User auth Route
router.get('/user-auth',requireSignIn, (req,res) => {
    res.status(200).send({
        ok:true
    });
});

// protected admin auth Route
router.get('/admin-auth',requireSignIn, isadmin, (req,res) => {
    res.status(200).send({
        ok:true
    });
});


// forgot password
router.post("/forgot-password",forgotPassword);

// update Profile
router.put("/profile",requireSignIn,updateProfile);

// orders
router.get("/orders",requireSignIn,getOrders);

// all-orders
router.get("/all-orders",requireSignIn,isadmin,getAllOrders);

// orderstatus update
router.put("/order-status/:orderId", requireSignIn,isadmin,orderStatusController);

export default router;