const express = require('express');
const app = express();
const port = 3001;

app.get('/temperature', (req, res) => {
  const fahrenheit = req.query.fahrenheit || 'unknown';
  res.send(`Temperature is: ${fahrenheit} °F`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});