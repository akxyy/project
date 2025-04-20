import jwt from 'jsonwebtoken';

const tokenVerification = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.json({ message: 'Token is missing' });
  }

  jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({ message: 'Token is invalid' });
    }
    req.user = decoded;
    next();
  });
};

export default tokenVerification;