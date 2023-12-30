import {compare, hashPassword} from "../helpers/authHelper.js";
import { User } from "../models/userModel.js";
import {Order} from "../models/orderModel.js";
import jwt from "jsonwebtoken";


// register
export const registerUser = async (req,res) => {

   try{
      
    const {name,email,password,phone,address,answer} = req.body;

    // validations
    if(!name){
        return res.send({
            message:"Name is required"
        })
    }

    if(!email){
        return res.send({
            message:"Email is required"
        })
    }

    if(!password){
        return res.send({
            message:"Password is required"
        })
    }

    if(!phone){
        return res.send({
            message:"Phone no is required"
        })
    }

    if(!address){
        return res.send({
            message:"Address is required"
        })
    }

    if(!answer){
        return res.send({
            message:"answer is required"
        })
    }

    // existing user
    const doUserAlreadyExist = await User.findOne({email})
    if(doUserAlreadyExist){
        return res.status(200).send({
            success:false,
            message:"Already Register Please login"
        });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save
    const user = new User({name,email,phone,address,password:hashedPassword,answer});
    const info = await user.save();

     res.status(201).send({
        success:true,
        message:"User Registration successfull",
        info
     })

   } catch(err){
         res.status(500).send({
            success:false,
            message:"Error in registration",
            err
         })
   }
};


// login

export const loginUser = async (req,res) => {

    try{

      const {email,password} = req.body;

      if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"Invalid email or password"
        })
      }


    //   check user
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Email is not registered"
        });
    }
    
    const match = await compare(password,user.password);
    if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid Password"
        })
    }


    // token generation
    const token = await jwt.sign({_id: user._id},process.env.JWT_SECRET,{
           expiresIn:"7d",
    });

    res.status(200).send({
        success:true,
        message:"login successfully",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role
        },
        token,
    })

    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in login",
            err
        });
    }
};



// forgot password
export const forgotPassword = async (req,res) => {
     try{
        
        const {email,answer,newPassword} = req.body;
        if(!email){
            return res.status(400).send({message:"Email is required"});
        }
        
        if(!answer){
            return res.status(400).send({message:"answer is required"});
        }

        if(!newPassword){
            return res.status(400).send({message:"New Password is required"});
        }

        // check
        const user = await User.findOne({email,answer});

        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer",
            });
        }

        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, {
            password:hashed
        });

        res.status(200).send({
            success:true,
            message:"Password Reset Successfully",
        });

     }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            err,
        });
     }
};


// test controller
export const testController = async (req,res) => {
    try{
        res.send("Protected Routes");
    } catch(err){
        console.log(err);
        res.send({err});
    }
}


//update profile
export const updateProfile = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await User.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  
  //orders
  export const getOrders = async (req, res) => {
    try {
      const orders = await Order
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };