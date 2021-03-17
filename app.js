const mongoose = require('mongoose');
const URI = "mongodb+srv://dbSimon:dbSimonFrezard@cluster0.wqbnd.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

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

const listing = myModel.find({}, { name: 1 }).limit(5);

listing.exec((err, result) => {
  console.log(result);
});