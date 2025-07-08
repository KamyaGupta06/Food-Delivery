import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Razorpay from "razorpay";
import crypto from "crypto";


// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY
});

// placing user oreder for frontend


const placeOrder = async (req, res) => {
const userId = req.user.id;
  const { items, amount, address } = req.body;
  const totalAmount = amount*85*100; // convert to paisa

  try {
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    // Send Razorpay options to frontend
    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOptions: {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "FoodFiesta",
        description: "Order Payment",
        order_id: order.id,
        prefill: {
          name: address.firstName + " " + address.lastName,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: "#F37254",
        },
      },
    });
  }  catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// verify payment
const verifyOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const hmac = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hmac === razorpay_signature) {
    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    res.json({ success: true, message: "Payment verified" });
  } else {
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: false, message: "Payment failed" });
  }
};


// user orders for frontend
const userOrders=async(req,res)=>{
 try {
   const orders=await orderModel.find({userId:req.user.id})
   res.json({success:true,data:orders})
 } catch (error) {
  console.log(error)
  res.json({success:false,message:"Error"})
 }
}

// listing order for admin Panel
const listOrders=async(req,res)=>{
 try {
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
 } catch (error) {
  console.log(error)
  res.json({success:false,message:"Error"})
 }
}

// api for updating order status
const updateStatus =async (req,res)=>{
 try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"Status Updated"})
 } catch (error) {
  console.log(error)
  res.json({success:false,message:"Error"})
  
 }
}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}