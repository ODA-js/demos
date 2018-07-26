import { toGlobalId } from '../../../common';
import gql from 'graphql-tag';

export default async function linkToFiles({ context, files, user }) {
  if (files) {
    await context.userGQL({
      query: gql`
        mutation addToUserHasManyFiles($input: addToUserHasManyFilesInput!) {
          addToUserHasManyFiles(input: $input) {
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
