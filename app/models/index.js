//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var books_schema = new Schema({
    name: String,
    author: String,
    read: Boolean,
});

module.exports = mongoose.model('books', books_schema);