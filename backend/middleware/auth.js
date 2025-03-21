import jwt from 'jsonwebtoken';

const tokenVerification = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'akshay123'); 
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({err });
  }
};

export default tokenVerification;