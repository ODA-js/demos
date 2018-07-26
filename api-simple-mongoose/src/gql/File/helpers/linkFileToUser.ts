import { toGlobalId } from '../../../common';
import gql from 'graphql-tag';

export default async function linkToUser({ context, user, file }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation addToFileBelongsToUser($input: addToFileBelongsToUserInput!) {
          addToFileBelongsToUser(input: $input) {
            file {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          file: toGlobalId('File', file.id),
          user: user.id,
        },
      },
    });
  }
}
