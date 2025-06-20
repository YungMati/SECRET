const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});

app.post('/api/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const newItem = { ...req.body, id: Date.now() };
  data.push(newItem);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'OK' });
});

app.listen(PORT, () => console.log(`Backend na porcie ${PORT}`));
