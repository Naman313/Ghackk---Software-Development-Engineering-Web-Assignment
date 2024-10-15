import User from '../models/Users.js';

// Add to Favorites
export const addToFavorites = async (req, res) => {
  try {
    const { userId, webtoonId } = req.body;

    // Find the user by ID
    const user = await User.findById(user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the webtoon is already in the user's favorites
    if (user.favorites.includes(webtoonId)) {
      return res.status(400).json({ error: 'Webtoon already in favorites' });
    }

    // Add the webtoon to the user's favorites using $push
    await User.findByIdAndUpdate(
      userId,
      { $push: { favorites: webtoonId } }, // Pushes the new webtoon ID to the favorites array
      { new: true } // Return the updated document after the operation
    );

    res.status(200).json({ message: 'Webtoon added to favorites' });
  } catch (error) {
    console.error('Error adding to favorites:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the favorites array (webtoon IDs)
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};