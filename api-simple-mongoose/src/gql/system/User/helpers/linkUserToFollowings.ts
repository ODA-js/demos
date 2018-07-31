import { toGlobalId } from '../../common';
import gql from 'graphql-tag';

export default async function linkUserToFollowings({
  context,
  followings,
  user,
}) {
  if (followings) {
    await context.userGQL({
      query: gql`
        mutation addToUserBelongsToManyFollowings(
          $input: addToUserBelongsToManyFollowingsInput!
        ) {
          addToUserBelongsToManyFollowings(input: $input) {
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
