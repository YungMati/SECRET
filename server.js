const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

app.get('/data.json', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/add-product', (req, res) => {
  const newProduct = req.body;
  fs.readFile('data.json', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    let products = JSON.parse(data);
    products.push(newProduct);
    fs.writeFile('data.json', JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Write error' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
