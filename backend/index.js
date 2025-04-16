import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

// Later this file can be shrunk and optimized, move things to other folders

const app = express();

app.use(express.json()) // Allows us to accept JSON data in the req.body
// enables req.body to be parsed

// Now we're going to 'listen' for a request for the home page (we post because we want to create)
app.post("/api/products", async (req, res) => {
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
});



app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
});