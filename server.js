const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Ładujemy produkty z pliku JSON
let products = require("./products.json");

// Endpoint do pobrania produktów
app.get("/api/products", (req, res) => {
  res.json(products);
});

// (opcjonalnie) endpoint do dodawania produktów – na przyszłość
// app.post("/api/products", (req, res) => {
//   const newProduct = req.body;
//   products.push(newProduct);
//   fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
//   res.status(201).json(newProduct);
// });

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
