// first test of fastify
const fastify = require('fastify')({ logger: true });
const PORT = 8000;

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'Fastify-api' },
  },
});
fastify.register(require('./routes/posts'));
fastify.register(require('./routes/admins'));

const startServer = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
