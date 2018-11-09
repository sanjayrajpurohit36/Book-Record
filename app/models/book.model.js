//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema; //instance of Schema

const books_schema = new Schema({
    id: String,
    title: String,
    author: String,
    read: Boolean,
});

module.exports = mongoose.model('Books', books_schema);