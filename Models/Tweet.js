const mongoose = require('mongoose');

// Define the Tweet schema
const tweetSchema = new mongoose.Schema({
  tweet_id: {
    type: String, 
    required: true, 
    unique: true
  },
  user_id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    require: true,
  },
  tweet: {
    type: String,
    required: true,
    maxlength: 280 // Twitter-like constraint
  },
  date_time: {
    type: Date,
    default: Date.now // Automatically sets the current date and time
  },
  likes: {
    type: Number,
    default: 0 // Default likes to 0
  },
  retweets: {
    type: Number,
    default: 0 // Default retweets to 0
  }
});

// Create the Tweet model
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
