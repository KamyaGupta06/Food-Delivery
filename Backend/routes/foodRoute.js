import express from "express";

import { addFood, deleteFoodItem, getFoodList } from "../controllers/foodController.js";

import multer from "multer"; // to create image storage system

const foodRouter =express.Router();

// Image Storage Engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload=multer({storage:storage})

// routes
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",getFoodList)
foodRouter.delete("/delete/:id",deleteFoodItem)




export default foodRouter

