const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  const data = fs.readFileSync('products.json');
  res.json(JSON.parse(data));
});

app.post('/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json'));
  products.push(req.body);
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  res.status(201).json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
