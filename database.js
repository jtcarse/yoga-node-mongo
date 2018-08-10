const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: String
});

const Cat = mongoose.model('Cat', catSchema);

exports.open = () => {
  mongoose.connect('mongodb://mongo:27017', {
    useNewUrlParser: true,
    dbName: 'catdb'
  });

  return mongoose.connection;
}
