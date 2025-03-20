import jwt from 'jsonwebtoken';

const tokenVerification = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'akshay123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({err });
  }
};

export default tokenVerification;