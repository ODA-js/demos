var path = require('path');
const { generator } = require('oda-gen-graphql');
const schema = require('../../api-simple-sequelize/dist/schema/index').default;
const {
  UserUI,
  ToDoItemUI,
} = require('./ui-hooks');

generator({
  hooks: [
    UserUI,
    ToDoItemUI
  ],
  pack: schema,
  rootDir: path.join(__dirname, 'UI'),
  config: {
    ui: true,
    ts: false,
    graphql: false,
    schema: false,
    packages: ['system'],
  },
});
