const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
const URI = "mongodb+srv://dbSimon:dbSimonFrezard@cluster0.wqbnd.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log('Error: ', err);
    console.log('Connected to mongoDB');
  });

const mySchema = new mongoose.Schema({});
const myModel = mongoose.model('airbnb', mySchema,
  'listingsAndReviews');


myModel.find(function (err, myModel) {
  if (err) return console.error(err);
  console.log(myModel);
}).countDocuments();

const listing = myModel.find({ name: /a/ }, { name: 1, listing_url: 1 }).skip(10).limit(10).sort({ _id: 1 });

app.get('/api', (req, res) => {

  listing.exec((err, result) => {
    console.log(result);
    res.send(result);
  });
});