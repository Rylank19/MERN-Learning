import mongoose from "mongoose";

const productSchema = new mongoose.Schema({ // define data fields and types
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // Make sure it has createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema); // create a collection called 'Product' using given schema

export default Product;