const {
  getPostsSchema,
  getPostSchema,
  addPostSchema,
  updatePostSchema,
  deletePostSchema,
} = require('../controllers/schemas/posts');

const {
  getPostsHandler,
  getPostHandler,
  addPostHandler,
  updatePostHandler,
  deletePostHandler,
} = require('../controllers/handlers/posts');
const verifyAdmin = require('../controllers/auth/auth');

const getPostsOpts = {
  schema: getPostsSchema,
  handler: getPostsHandler,
};

const getPostOpts = {
  schema: getPostSchema,
  handler: getPostHandler,
};

const addPostOpts = {
  schema: addPostSchema,
  handler: addPostHandler,
};

const updatePostOpts = {
  schema: updatePostSchema,
  handler: updatePostHandler,
};

const deletePostOpts = {
  schema: deletePostSchema,
  handler: deletePostHandler,
};

const postRoutes = (fastify, options, done) => {
  fastify
    .register(require('fastify-auth'))
    .after(() => privatePostRoutes(fastify));

  // get posts
  fastify.get('/posts', getPostsOpts);

  // get a post
  fastify.get('/posts/:id', getPostOpts);

  // decorators
  fastify.decorate('verifyAdmin', verifyAdmin);

  done();
};

const privatePostRoutes = (fastify) => {
  // add a post
  fastify.post('/posts/new', {
    preHandler: fastify.auth([fastify.verifyAdmin]),
    ...addPostOpts,
  });

  // update a post
  fastify.put('/posts/:id', {
    preHandler: fastify.auth([fastify.verifyAdmin]),
    ...updatePostOpts,
  });

  // delete a post
  fastify.delete('/posts/:id', {
    preHandler: fastify.auth([fastify.verifyAdmin]),
    ...deletePostOpts,
  });
};

module.exports = postRoutes;
