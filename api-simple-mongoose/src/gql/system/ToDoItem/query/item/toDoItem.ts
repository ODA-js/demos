import { Query, logger, RegisterConnectors } from '../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      toDoItem(id: ID): ToDoItem
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('toDoItem');
    let result;
    if (args.id) {
      result = await context.connectors.ToDoItem.findOneById(args.id);
    }
    return result;
  },
});
