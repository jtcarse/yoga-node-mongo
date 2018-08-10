const mongoose = require('mongoose');

exports.open = () => {
  mongoose.connect('mongodb://mongo:27017', {
    useNewUrlParser: true,
    dbName: 'catdb'
  });

  return mongoose.connection;
}
