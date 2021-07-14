const admins = require('../../config/admins');
const jwt = require('jsonwebtoken');

const registerAdminHandler = (req, reply) => {
  const { name, password } = req.body;
  const id = admins.length + 1;

  const admin = { id, name, password };

  admins.push(admin);
  reply.send(`Added admin of id ${id}`);
};

const adminLoginHandler = (req, reply, fastify) => {
  const { name, password } = req.body;

  const admin = admins.find((admin) => {
    return admin.name === name;
  });

  if (!admin || admin.password !== password) {
    return reply
      .status(400)
      .send(new Error('Username or password not correct'));
  }

  jwt.sign(
    { id: admin.id, name },
    'jsonSecret',
    { expiresIn: 86400 },
    (err, token) => {
      if (err) {
        return reply.send(new Error(err));
      }

      return reply.send({ token });
    }
  );
};

module.exports = {
  registerAdminHandler,
  adminLoginHandler,
};
