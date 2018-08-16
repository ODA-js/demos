import gql from 'graphql-tag';

export default async function unlinkUserFromFollowers({
  context,
  followers,
  user,
}) {
  if (followers) {
    await context.userGQL({
      query: gql`
        mutation removeFromUserBelongsToManyFollowers(
          $input: removeFromUserBelongsToManyFollowersInput!
        ) {
          removeFromUserBelongsToManyFollowers(input: $input) {
            user {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          user: user.id,
          userFollowers: followers.id,
        },
      },
    });
  }
}
