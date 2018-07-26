import { toGlobalId } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkFromFollowings({
  context,
  followings,
  user,
}) {
  if (followings) {
    await context.userGQL({
      query: gql`
        mutation removeFromUserBelongsToManyFollowings(
          $input: removeFromUserBelongsToManyFollowingsInput!
        ) {
          removeFromUserBelongsToManyFollowings(input: $input) {
            user {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          user: toGlobalId('User', user.id),
          userFollowings: followings.id,
        },
      },
    });
  }
}
