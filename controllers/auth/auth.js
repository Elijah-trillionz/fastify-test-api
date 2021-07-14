const jwt = require('jsonwebtoken');
const admins = require('../../config/admins');

const verifyAdmin = (req, reply, done) => {
  const { token } = req.headers;

  jwt.verify(token, 'jsonSecret', (err, decoded) => {
    if (err) return done(new Error(err));

    req.author = {
      author: decoded.name,
      id: decoded.id,
    };
  });

  done();
};

module.exports = verifyAdmin;
