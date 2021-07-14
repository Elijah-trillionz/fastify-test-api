const { verifyNumber, verifyPassword } = require('../controllers/auth/test');

function testRoutes(fastify) {
  fastify.decorate('verifyNumber', verifyNumber);
  fastify.decorate('verifyPassword', verifyPassword);

  fastify.post('/test', {
    preHandler: fastify.auth([fastify.verifyNumber, fastify.verifyPassword], {
      relation: 'and',
    }),
    handler: (req, reply) => {
      req.log.info('Auth route');
      console.log(req.number, req.password);
      reply.send('Hello John');
    },
  });

  // fastify.setErrorHandler((error, req, reply) => {
  //   req.log.error(error);

  //   reply.status(404).send('An error occured');
  // });
}

module.exports = testRoutes;
