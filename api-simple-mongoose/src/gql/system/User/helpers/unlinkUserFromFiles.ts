import gql from 'graphql-tag';

export default async function unlinkUserFromFiles({ context, files, user }) {
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
          user: user.id,
          file: files.id,
        },
      },
    });
  }
}
