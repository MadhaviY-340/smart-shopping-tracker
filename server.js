const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = [];

// Get all items
app.get("/items", (req, res) => {
    res.json(items);
});

// Add item
app.post("/add-item", (req, res) => {
    const { name, price } = req.body;

    if (!name || typeof price !== "number") {
        return res.status(400).json({ error: "Invalid data" });
    }

    items.push({ name, price });
    res.json({ message: "Item added" });
});

// Delete item
app.delete("/delete-item/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= items.length) {
        return res.status(400).json({ error: "Invalid index" });
    }

    items.splice(index, 1);
    res.json({ message: "Item deleted" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});