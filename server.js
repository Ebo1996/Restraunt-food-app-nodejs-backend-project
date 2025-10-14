const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the server</h1>');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
