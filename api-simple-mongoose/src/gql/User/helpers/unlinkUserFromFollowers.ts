import { toGlobalId } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkFromFollowers({
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
          user: toGlobalId('User', user.id),
          userFollowers: followers.id,
        },
      },
    });
  }
}
