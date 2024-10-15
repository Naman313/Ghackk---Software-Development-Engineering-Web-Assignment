import bcrypt from 'bcryptjs';
import User from '../models/Users.js';
import generateTokenAndSetCookies from '../utils/generateToken.js';

// Signup Function
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT, set cookies, and get the token
    const token = generateTokenAndSetCookies(newUser._id, res);

    // Send response with user info and token
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      token, // Send token in response
    });
  } catch (error) {
    console.log('Error in signup controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


// Login Function
// Login Function
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT, set cookies, and get the token
    const token = generateTokenAndSetCookies(user._id, res);

    // Send response with user info and token
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      token, // Send token in response
    });
  } catch (error) {
    console.error('Error in login controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

