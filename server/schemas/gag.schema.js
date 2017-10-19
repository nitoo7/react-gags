// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gagSchema = new Schema({
  gagId: {
    type: String,
    required: true
  },
  gagDesc: String,
  gagImg: String,
  gagLikesCount: Number,
  gagLikesList: [],
  gagDisLikesCount: Number,
  gagDisLikesList: [],
  gagCommentsCount: Number,
  gagComments: []       ,
  gagCreatedAt: Date
});

// the schema is useless so far
// we need to create a model using it
var Gag = mongoose.model('Gags', gagSchema);

// make this available to our users in our Node applications
module.exports = Gag;