import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data:newProduct});
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params; // in the url

    const product = req.body; // in the request

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}); // product has fields to update
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message:"Server Error"});
        
    }

};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id); // ask MongoDB to find an item in product collection and delete
        res.status(200).json({success: true, message: `Product of id: ${id} deleted`});
    } catch (error) {
        console.log("error in deleting product");
        res.status(404).json({success: false, message: "Product not found"});
    }
};