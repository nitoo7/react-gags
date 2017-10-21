// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const gagSchema = new Schema({
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

const Gag = mongoose.model('Gag', gagSchema);

module.exports = Gag;