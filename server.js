const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  const data = fs.readFileSync('./products.json');
  res.json(JSON.parse(data));
});

app.post('/add', (req, res) => {
  const product = req.body;
  const data = JSON.parse(fs.readFileSync('./products.json'));
  data.push(product);
  fs.writeFileSync('./products.json', JSON.stringify(data, null, 2));
  res.status(201).json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`API running on ${PORT}`));
