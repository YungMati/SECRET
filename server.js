const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('.'));
app.use(express.json());

app.get('/data.json', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post('/add-product', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    const products = JSON.parse(data);
    products.push(req.body);
    fs.writeFile('data.json', JSON.stringify(products, null, 2), () => {
      res.json({ status: "ok" });
    });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
