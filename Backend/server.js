const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  desc: String,
  price: String,
  batch: String,
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

// Tworzenie użytkownika (jednorazowo)
// bcrypt.hash("1234", 10).then(hash => new User({ username: "admin", password: hash }).save());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Błąd logowania" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Błąd logowania" });

  res.json({ success: true });
});

app.post("/products", async (req, res) => {
  const { image, name, desc, price, batch } = req.body;
  const newProd = new Product({ image, name, desc, price, batch });
  await newProd.save();
  res.json({ message: "Dodano produkt" });
});

app.get("/products", async (req, res) => {
  const prods = await Product.find();
  res.json(prods);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
