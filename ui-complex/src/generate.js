var path = require('path');
const { generator } = require('oda-gen-graphql');
const schema = require('../../api-complex/dist/schema/index').default;
const {
  UserUI,
  ToDoItemUI,
} = require('./ui-hooks');

const {
  adapter,
  accessFixEntities,
  accessFixMutations,

  defaultVisibility,
  defaultIdVisibility,

  defaultMutationAccess,

  securityFields,
  securityAcl,

  ToDoItem,
  ownerFields,
  ownerAcl,
  userPasswordStatus,
} = require('./../../api-complex/dist/model/hooks');

const acl = require('./../../api-complex/dist/model/acl').default;

generator({
  hooks: [
    // model hooks
    adapter,
    accessFixEntities,
    accessFixMutations,

    defaultVisibility,
    defaultIdVisibility,

    defaultMutationAccess,

    securityFields,
    securityAcl,

    ToDoItem,
    ownerFields,
    ownerAcl,
    userPasswordStatus,
    // ui hooks
    UserUI,
    ToDoItemUI,
  ],
  acl: acl(),
  pack: schema,
  rootDir: path.join(__dirname, 'UI'),
  config: {
    ui: true,
    ts: false,
    graphql: false,
    schema: false,
    packages: true,
  },
});
