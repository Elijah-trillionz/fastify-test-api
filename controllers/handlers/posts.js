let posts = require('../../posts');

function getPostsHandler(req, reply) {
  reply.send(posts);
}

function getPostHandler(req, reply) {
  const { id } = req.params;

  const post = posts.filter((post) => {
    return post.id === +id;
  })[0];

  if (!post) {
    return reply.status(400).send(new Error('Not found'));
  }

  reply.send(post);
}

function addPostHandler(req, reply) {
  const { title, body } = req.body;
  const { author } = req.author;

  const id = posts.length + 1;

  const post = { id, title, body, author };

  posts.push(post);
  reply.send('Post added');
}

function updatePostHandler(req, reply) {
  const { title, body } = req.body;
  const { id } = req.params;

  const post = posts.find((post) => {
    return post.id === +id;
  });

  if (!post) {
    return reply.code(404).send("Post doesn't exist.");
  }

  post.title = title;
  post.body = body;
  reply.send('Post updated');
}

function deletePostHandler(req, reply) {
  const { id } = req.params;

  posts = posts.filter((post) => post.id !== +id);

  reply.send('Post deleted');
}

module.exports = {
  getPostsHandler,
  getPostHandler,
  addPostHandler,
  updatePostHandler,
  deletePostHandler,
};
