const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const Query = require("../models/query");
const errorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Service = require("../models/Services");

// add a service
router.post("/add_service",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
        const {name,description,iconId} = req.body;
        if(!name || !description){
            return next(new errorHandler("Please fill all fields", 400));
        }
        const service = await Service.create({
            serviceName:name,
            description,
            iconId
        });
        res.send({success:true,message:"Service added successfully", service});

    } catch (error) {
        return next(new errorHandler(error.message, 500));
    }
}))

// get all services

router.get("/all_services",catchAsyncErrors(async(req,res,next)=>{
    try {
        const services = await Service.find();
        res.send({success:true,message:"Services fetched successfully", services});
    } catch (error) {
        return next(new errorHandler(error.message,500));
    }
}))

router.delete("/delete_service/:id",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try{
        const id = req.params.id;
        console.log(id)
        const service = await Service.findById(id);
        if(!service){
            return next(new errorHandler("Service not found", 404));
        }
        await service.deleteOne();
        res.send({success:true,message:"Service deleted successfully"});
    }catch(error){
        return next(new errorHandler(error.message,500));
    }
}))


module.exports = router;