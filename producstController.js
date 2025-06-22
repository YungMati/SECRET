const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper function to read products
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper function to write products
const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
};

// Get all products
exports.getProducts = (req, res) => {
  const products = readProducts();
  res.json(products);
};

// Add a new product
exports.addProduct = (req, res) => {
  const { name, link, imageLink, batch, category, price } = req.body;
  
  if (!name || !link || !imageLink || !batch || !category || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const products = readProducts();
  const newProduct = {
    id: Date.now().toString(),
    name,
    link,
    imageLink,
    batch,
    category,
    price: parseFloat(price)
  };

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
};
