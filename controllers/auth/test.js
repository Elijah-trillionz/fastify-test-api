const verifyNumber = (req, reply, done) => {
  const { num } = req.body;

  if (typeof num !== 'number') {
    return done(new Error('Must be a number').message);
  }

  req.number = num;
  return done();
};

const verifyPassword = (req, reply, done) => {
  const { password } = req.body;

  if (password.length < 8) {
    return done(new Error('Password must be longer than 8 characters'));
  }

  req.password = password;
  return done();
};

module.exports = { verifyNumber, verifyPassword };
