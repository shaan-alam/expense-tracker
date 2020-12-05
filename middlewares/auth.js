const jwt = require('jsonwebtoken');

async function auth (req, res, next) {
  const token = req.header('x-auth-token');
  
  // token validation 
  if (!token) {
    return res.status(400).json({ message: 'Access Denied!!' });
  }

  try { 
    // verify the token and assign the verfied data to req.user
    const tokenVerified = await jwt.verify(token, process.env.SECRET);
    req.user = tokenVerified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }

}

module.exports = auth;
