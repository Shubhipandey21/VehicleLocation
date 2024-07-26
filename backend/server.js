const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(cors());

const routeData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

let index = 0;

app.get('/api/location', (req, res) => {
  index = (index + 1) % routeData.length;
  res.json(routeData[index]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
