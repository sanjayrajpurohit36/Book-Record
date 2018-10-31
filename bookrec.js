var mongoose = require('mongoose')

// Define collection and schema for todo item

var todo = new mongoose.Schema({
  name: {
    type: String
  },
  
  author: {
      type: String
  },

  read: {
    type: Boolean
  }
},

  {
    collection: 'todos'
  }
)

module.exports = mongoose.model('Todo', todo)
