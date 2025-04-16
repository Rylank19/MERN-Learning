import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

// Later this file can be shrunk and optimized, move things to other folders

const app = express();

app.use(express.json()) // Allows us to accept JSON data in the req.body
// enables req.body to be parsed

// contains all the routes needed for a given base route
app.use("/api/products", productRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
});