import { Schema, Type } from 'oda-gen-common';
import gql from 'graphql-tag';

export const UserMock = new Type({
  schema: gql`
    type User {
      id: String
      isAdmin: Boolean
    }
  `,
  resolver: {
    id: () => 'ffffffffffffffffffffffff',
    isAdmin: () => true,
  },
});

export const queries = new Schema({
  name: 'fix.UserQueries',
  schema: gql`
    type RootQuery {
      users: UsersConnection
      user(id: ID, userName: String): User
    }
  `,
});

export default new Schema({
  name: 'User.custom',
  items: [UserMock, queries],
});
