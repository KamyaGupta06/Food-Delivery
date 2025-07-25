import userModel from "../models/userModel.js"

// Add items to user cart
const addToCart =async (req,res)=>{
   try{
    let userData=await userModel.findOne({_id:req.user.id})
    let cartData=await userData.cartData
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1
    }
    else{
        cartData[req.body.itemId] +=1
    }

    await userModel.findByIdAndUpdate(req.user.id,{cartData});
    res.json({success:true,message:"Added To Cart"})

   }catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
   }
}

// remove items from usercart
const removeFromCart =async (req,res)=>{
  try{
    if(!req.user.id){
       return res.status(400).json({ success: false, message: "Missing userId" });
    }
    let userData=await userModel.findById(req.user.id)
    let cartData=await userData.cartData; // create a shallow copy for safety
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -=1;
        if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }
    await userModel.findByIdAndUpdate(req.user.id,{cartData})
    res.json({success:true,message:"Remove From Cart"})
  }catch(error){
    console.log(error)
    res.json ({success:false,message:"Not Removed"})
  }
}

// fetch user cart data
const getCart =async (req,res)=>{
  try{
    let userData=await userModel.findById(req.user.id);
    let cartData=await userData.cartData;
    res.json({success:true,cartData})

  }catch(error){
   console.log(error)
   res.json({success:false,message:"Error"})
  }
}

export {addToCart,removeFromCart,getCart}