const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = './db.json';

function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/products', (req, res) => {
    const data = readData();
    res.json(data.products);
});

app.post('/products', (req, res) => {
    const data = readData();
    const product = req.body;
    product.id = Date.now();
    data.products.push(product);
    writeData(data);
    res.json({ success: true, product });
});

app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
});
