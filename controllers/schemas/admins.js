const TypeString = { type: 'string' };

const AdminBody = {
  type: 'object',
  required: ['name', 'password'],
  properties: {
    name: TypeString,
    password: TypeString,
  },
};

const registerAdminSchema = {
  body: AdminBody,
  response: {
    200: TypeString,
  },
};

const adminLoginSchema = {
  body: AdminBody,
  response: {
    200: {
      type: 'object',
      properties: {
        token: TypeString,
      },
    },
  },
};

module.exports = {
  registerAdminSchema,
  adminLoginSchema,
};
