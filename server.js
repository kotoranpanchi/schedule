const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Melayani file statis dari folder "public"
app.use(express.static('public'));

app.get('/LoginPage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'LoginPage.html'));
});

app.get('/HomePage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HomePage.html'));
});


app.listen(3000, '192.168.50.185', () => {
  console.log("Server jalan di http://192.168.50.185:3000");
});