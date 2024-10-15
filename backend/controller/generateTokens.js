import jwt from 'jsonwebtoken';

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT in cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateTokenAndSetCookies;
