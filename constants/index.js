const USER_TYPES = {
  CLIENT: 'client',
  ADMIN: 'admin',
  VENDOR: 'vendor',
  DRIVER: 'driver'
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

const JWT_CONFIG = {
  EXPIRES_IN: '7d',
  ALGORITHM: 'HS256'
};

module.exports = {
  USER_TYPES,
  HTTP_STATUS,
  PAGINATION,
  JWT_CONFIG
};


