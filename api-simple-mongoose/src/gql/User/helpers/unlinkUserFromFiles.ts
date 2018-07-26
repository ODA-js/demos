import { toGlobalId } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkFromFiles({ context, files, user }) {
  if (files) {
    await context.userGQL({
      query: gql`
        mutation removeFromUserHasManyFiles(
          $input: removeFromUserHasManyFilesInput!
        ) {
          removeFromUserHasManyFiles(input: $input) {
            user {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          user: toGlobalId('User', user.id),
          file: files.id,
        },
      },
    });
  }
}
