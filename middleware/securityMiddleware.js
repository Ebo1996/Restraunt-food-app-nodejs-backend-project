const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const securityMiddleware = [
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { securityMiddleware, limiter, authLimiter };


