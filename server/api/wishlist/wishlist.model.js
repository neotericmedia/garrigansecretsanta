'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WishlistSchema = new Schema({
  name: String,
  store: String,
  other: String,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

WishlistSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'author', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

module.exports = mongoose.model('Wishlist', WishlistSchema);
