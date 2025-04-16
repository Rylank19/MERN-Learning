import express from 'express';

const app = express();

// Now we're going to 'listen' for a request for the home page
app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
});