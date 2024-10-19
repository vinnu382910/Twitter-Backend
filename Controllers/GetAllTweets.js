const Tweet = require('../Models/Tweet'); // Import the Tweet model

// Controller to get all tweets
const getAllTweets = async (req, res) => {
    const { tweetId } = req.query; // Get tweetId from the URL
    console.log(tweetId)
    console.log(req.user)

    try {
      let tweets;
      if (tweetId) {
        // Fetch a specific tweet by _id
        tweets = await Tweet.findById(tweetId);
        if (!tweets) {
          return res.status(404).send({ message: 'Tweet not found' });
        }
      } else {
        // Fetch all tweets, sorted by date_time in descending order (most recent first)
        tweets = await Tweet.find().sort({ date_time: -1 });
      }
  
      // Send the tweets in the response
      res.status(200).send(tweets);
    } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching tweets' });
  }
};

module.exports = {
  getAllTweets// Already defined function to post a tweet
};
