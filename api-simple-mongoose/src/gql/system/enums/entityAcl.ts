import { Enum } from '../common';
import gql from 'graphql-tag';

export default new Enum({
  schema: gql`
    enum entityAcl {
      read
      write
      create
      update
      deny
    }
  `,
  resolver: {
    read: 'read',
    write: 'write',
    create: 'create',
    update: 'update',
    deny: 'restrict',
  },
});
