const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    console.log(req.header)
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send({ message: 'Access Denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
  }
};

module.exports = isAuth;
