const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/traffic_monitor', { useNewUrlParser: true, useUnifiedTopology: true });

const trafficSchema = new mongoose.Schema({
  url: String,
  method: String,
  timestamp: Date,
});

const Traffic = mongoose.model('Traffic', trafficSchema);

app.post('/traffic', (req, res) => {
  const trafficData = new Traffic({
    url: req.body.url,
    method: req.body.method,
    timestamp: new Date(),
  });

  trafficData.save().then(() => {
    res.status(200).send('Data saved');
  }).catch(err => {
    res.status(500).send('Error saving data');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});