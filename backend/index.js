import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from "path";

// Later this file can be shrunk and optimized, move things to other folders

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
console.log(__dirname)

app.use(express.json()) // Allows us to accept JSON data in the req.body
// enables req.body to be parsed

// contains all the routes needed for a given base route
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/mern-frontend/dist"))); // go under root, then frontend/dist folder to find assets
    console.log("Made it here")
    app.get("/", (req, res) => {
        full_path = path.resolve(__dirname, "frontend", "mern-frontend", "dist", "index.html")
        res.sendFile(full_path);
    }); // for anything other than the api routes
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
});