import gql from 'graphql-tag';

export default async function linkUserToFollowers({
  context,
  followers,
  user,
}) {
  if (followers) {
    await context.userGQL({
      query: gql`
        mutation addToUserBelongsToManyFollowers(
          $input: addToUserBelongsToManyFollowersInput!
        ) {
          addToUserBelongsToManyFollowers(input: $input) {
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
