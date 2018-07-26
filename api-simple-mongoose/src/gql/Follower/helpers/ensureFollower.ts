import gql from 'graphql-tag';

export default async function ensureFollower({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let follower;
  if (filter) {
    follower = await context
      .userGQL({
        query: gql`query findFollower(${fArgs}){
            follower(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.follower);
  }

  if (!follower) {
    if (create) {
      follower = await context
        .userGQL({
          query: gql`
            mutation createFollower($follower: createFollowerInput!) {
              createFollower(input: $follower) {
                follower {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            follower: {
              follower: args.follower,
              following: args.following,
              id: args.id,
            },
          },
        })
        .then(r => r.data.createFollower.follower.node);
    }
  } else {
    // update
    follower = await context
      .userGQL({
        query: gql`
          mutation updateFollower($follower: updateFollowerInput!) {
            updateFollower(input: $follower) {
              follower {
                id
              }
            }
          }
        `,
        variables: {
          follower: {
            follower: args.follower,
            following: args.following,
            id: args.id,
          },
        },
      })
      .then(r => r.data.updateFollower.follower);
  }
  return follower;
}
