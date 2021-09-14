export default {
  title: 'Create Product Validation',
  description: 'Schema to validate payload fields',
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    src: { type: 'string' },
    count: { type: 'integer' },
  },
  required: ['title']
};
