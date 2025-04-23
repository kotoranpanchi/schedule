const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5050;

// Melayani file statis dari folder "public"
app.use(express.static('public'));

app.get('/LoginPage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'LoginPage.html'));
});

app.get('/HomePage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HomePage.html'));
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});