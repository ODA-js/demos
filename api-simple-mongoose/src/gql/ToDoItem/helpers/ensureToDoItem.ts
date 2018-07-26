import gql from 'graphql-tag';

export default async function ensureToDoItem({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let toDoItem;
  if (filter) {
    toDoItem = await context
      .userGQL({
        query: gql`query findToDoItem(${fArgs}){
            toDoItem(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.toDoItem);
  }

  if (!toDoItem) {
    if (create) {
      toDoItem = await context
        .userGQL({
          query: gql`
            mutation createToDoItem($toDoItem: createToDoItemInput!) {
              createToDoItem(input: $toDoItem) {
                toDoItem {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            toDoItem: {
              name: args.name,
              description: args.description,
              done: args.done,
              location: args.location,
              file: args.file,
              dueToDate: args.dueToDate,
              published: args.published,
              user: args.user,
              id: args.id,
              updatedBy: args.updatedBy,
              updatedAt: args.updatedAt,
            },
          },
        })
        .then(r => r.data.createToDoItem.toDoItem.node);
    }
  } else {
    // update
    toDoItem = await context
      .userGQL({
        query: gql`
          mutation updateToDoItem($toDoItem: updateToDoItemInput!) {
            updateToDoItem(input: $toDoItem) {
              toDoItem {
                id
              }
            }
          }
        `,
        variables: {
          toDoItem: {
            name: args.name,
            description: args.description,
            done: args.done,
            location: args.location,
            file: args.file,
            dueToDate: args.dueToDate,
            published: args.published,
            user: args.user,
            id: args.id,
            updatedBy: args.updatedBy,
            updatedAt: args.updatedAt,
          },
        },
      })
      .then(r => r.data.updateToDoItem.toDoItem);
  }
  return toDoItem;
}
