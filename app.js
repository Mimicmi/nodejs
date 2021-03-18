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

const requestSchema = new mongoose.Schema({
  rawHeaders: Array,
  url: String,
  query: Object,
  date: {
    type: Date,
    default: Date.now
  }
});

const requestModel = mongoose.model('request', requestSchema, 'requestFromUsers');

myModel.find(function (err, myModel) {
  if (err) return console.error(err);
  console.log(myModel);
}).countDocuments();

app.get('/api', (req, res) => {

  console.log(req);

  let newRequest = new requestModel(req);
  newRequest.save();

  const limitList = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;

  const q = req.query.q ? new RegExp('^' + req.query.q) : new RegExp('^a');
  const q2 = req.query.q ? new RegExp('^' + req.query.q) : new RegExp('a');
  const condition = { $or: [{ name: q }, { summary: q2 }] };

  const listing = myModel.find(condition, { _id: 1, name: 1, listing_url: 1, summary: 1, address: 1 })
    .skip(skip)
    .limit(limitList)
    .sort({ _id: 1 });


  listing.exec((err, result) => {
    res.send(result);
  });

});