import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item  (post)
const addFood = async (req, res) => {
    const image_filename = req.file?.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    console.log(food)
    try {
        await food.save();
        res.status(200).json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while saving food" });
    }
};


// get all food list (get)
const getFoodList=async(req,res)=>{
    try {
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

// delete food item (delete)
const deleteFoodItem=async(req,res)=>{
      try {
        const item=await foodModel.findById(req.params.id)
        if (!item) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
        fs.unlink(`uploads/${item.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.params.id)
        res.json({success:true,message:"Food Item Removed"})
      } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
      }
}

export {addFood,getFoodList,deleteFoodItem}