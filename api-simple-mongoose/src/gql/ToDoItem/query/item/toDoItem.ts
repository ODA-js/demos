import {
  ModelType,
  Query,
  logger,
  RegisterConnectors,
  getValue,
} from '../../../common';
import gql from 'graphql-tag';

export default new Query({
  type: ModelType.query,
  schema: gql`
    extend type RootQuery {
      toDoItem(id: ID): ToDoItem
    }
  `,
  resolver: async (
    args: {
      id?: string;
    },
    context: { connectors: RegisterConnectors },
  ) => {
    logger.trace('toDoItem');
    let result;
    if (args.id) {
      result = await context.connectors.ToDoItem.findOneById(getValue(args.id));
    }
    return result;
  },
});
