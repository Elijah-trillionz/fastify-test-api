const {
  registerAdminSchema,
  adminLoginSchema,
} = require('../controllers/schemas/admins');

const {
  registerAdminHandler,
  adminLoginHandler,
} = require('../controllers/handlers/admins');

const registerAdminOpts = {
  schema: registerAdminSchema,
  handler: registerAdminHandler,
};

const adminRoutes = (fastify, options, done) => {
  // register an admin
  fastify.post('/admin/register', registerAdminOpts);

  // log in an admin
  fastify.post('/admin/login', {
    schema: adminLoginSchema,
    handler: (req, reply) => adminLoginHandler(req, reply, fastify),
  });

  done();
};

module.exports = adminRoutes;
