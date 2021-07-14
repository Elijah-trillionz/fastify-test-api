const TypeString = { type: 'string' };

const Post = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: TypeString,
    body: TypeString,
    author: TypeString,
  },
};

const getPostsSchema = {
  response: {
    200: {
      type: 'array',
      items: Post,
    },
  },
};

const getPostSchema = {
  response: {
    200: Post,
  },
};

const addPostSchema = {
  body: {
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: TypeString,
      body: TypeString,
    },
  },
  response: {
    200: TypeString,
  },
};

const updatePostSchema = {
  response: {
    200: TypeString,
  },
};

const deletePostSchema = {
  response: {
    200: TypeString,
  },
};

module.exports = {
  getPostsSchema,
  getPostSchema,
  addPostSchema,
  updatePostSchema,
  deletePostSchema,
};
