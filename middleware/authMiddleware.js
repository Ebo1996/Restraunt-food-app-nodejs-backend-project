const jwt = require('jsonwebtoken');

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Please provide authentication token'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).send({
        success: false,
        message: 'Admin access required'
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Authorization error',
      error: error.message
    });
  }
};

module.exports = { requireSignIn, isAdmin };


