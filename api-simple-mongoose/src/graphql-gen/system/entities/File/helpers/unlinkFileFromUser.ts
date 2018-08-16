import gql from 'graphql-tag';

export default async function unlinkFileFromUser({ context, user, file }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation removeFromFileBelongsToUser(
          $input: removeFromFileBelongsToUserInput!
        ) {
          removeFromFileBelongsToUser(input: $input) {
            file {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          file: file.id,
          user: user.id,
        },
      },
    });
  }
}
