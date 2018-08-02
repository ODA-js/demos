import User from './User';
import ToDoItem from './ToDoItem';
import File from './File';
import Follower from './Follower';
import Node from './node';
import Viewer from './viewer';
import Types from './_Types';
import { Schema } from 'oda-gen-common';
import gql from 'graphql-tag';

export { Node, Viewer, Types, User, ToDoItem, File, Follower };

export default new Schema({
  name: 'System',
  schema: gql`
    type RootSubscription {
      empty: String
    }
    type RootQuery {
      empty: String
    }
    type RootMutation {
      empty: String
    }
    schema {
      query: RootQuery
      mutation: RootMutation
      subscription: RootSubscription
    }
  `,
  items: [Node, Viewer, Types, User, ToDoItem, File, Follower],
});
