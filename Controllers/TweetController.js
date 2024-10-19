const { v4: uuidv4 } = require('uuid');
const Tweet = require('../Models/Tweet'); // Import the Tweet model

// Controller to handle posting a tweet
const postTweet = async (req, res) => {
   // Extract user data from the token payload
  const { tweet, user_id} = req.body;
  console.log(req.user);

  try {
    // Create a new tweet document
    const newTweet = new Tweet({
      tweet_id: uuidv4(),
      tweet: tweet, // Tweet content from the request body
      username: req.user.username, // User ID from the authenticated payload
      user_id
    });

    // Save the tweet to the database
    await newTweet.save();

    // Send a success response
    res.status(201).send({
      message: 'Tweet posted successfully',
      tweet: newTweet
    });
  } catch (error) {
    console.error(error);
    // Send an error response if something goes wrong
    res.status(500).send({ message: 'Error posting tweet' });
  }
};

module.exports = {
  postTweet
};
