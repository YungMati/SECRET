const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = "products.json";

app.post("/api/products", (req, res) => {
  const product = req.body;
  let products = [];

  if (fs.existsSync(DB_PATH)) {
    products = JSON.parse(fs.readFileSync(DB_PATH));
  }

  products.push(product);
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
  res.json({ message: "Product added successfully" });
});

app.get("/api/products", (req, res) => {
  if (!fs.existsSync(DB_PATH)) return res.json([]);
  const products = JSON.parse(fs.readFileSync(DB_PATH));
  res.json(products);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
