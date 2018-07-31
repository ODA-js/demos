import { logger } from '../../common';
import gql from 'graphql-tag';

export default async function unlinkToDoItemFromAll(
  args: {
    key;
    type;
    value;
  }[],
  context: { userGQL: (args: any) => Promise<any> },
) {
  if (args.length > 0 && context) {
    const variables = args.reduce((res, cur) => {
      res[cur.key] = cur.value;
      return res;
    }, {});

    const qArgs = args
      .reduce((res, cur) => {
        res.push(`$${cur.key}: ${cur.type}`);
        return res;
      }, [])
      .join(',');

    const pArgs = args
      .reduce((res, cur) => {
        res.push(`${cur.key}: $${cur.key}`);
        return res;
      }, [])
      .join(',');
    const unlinkFragment = gql`
      fragment UnlinkToDoItem on ToDoItem {
        id
        userUnlink: user {
          id
        }
      }
    `;
    const input = await context
      .userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: toDoItem(${pArgs}){
            ...UnlinkToDoItem
          }
        }
        ${unlinkFragment}
        `,
        variables,
      })
      .then(r => r.data || r.data.input);

    if (input) {
      await context.userGQL({
        query: gql`
          mutation unlink($input: updateToDoItemInput!) {
            updateToDoItem(input: $input) {
              toDoItem {
                ...UnlinkToDoItem
              }
            }
          }
          ${unlinkFragment}
        `,
        variables: input,
      });
    }
  }
}
