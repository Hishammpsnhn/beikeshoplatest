import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ msg: 'Invalid token' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token)

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: 'Authentication failed' });
    }

    // Attach the user to the request object
    req.user = user;
    
    // Continue to the next middleware or route handler
    next();
  });
}

export default verifyToken;
