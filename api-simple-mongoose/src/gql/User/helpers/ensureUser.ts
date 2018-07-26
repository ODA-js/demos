import gql from 'graphql-tag';

export default async function ensureUser({ args, context, create }) {
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
  } else if (args.userName) {
    fArgs = '$userName: String';
    filter = 'userName: $userName';
    variables = {
      userName: args.userName,
    };
  }
  let user;
  if (filter) {
    user = await context
      .userGQL({
        query: gql`query findUser(${fArgs}){
            user(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.user);
  }

  if (!user) {
    if (create) {
      user = await context
        .userGQL({
          query: gql`
            mutation createUser($user: createUserInput!) {
              createUser(input: $user) {
                user {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            user: {
              userName: args.userName,
              password: args.password,
              isAdmin: args.isAdmin,
              isSystem: args.isSystem,
              enabled: args.enabled,
              todos: args.todos,
              files: args.files,
              followings: args.followings,
              followers: args.followers,
              id: args.id,
              updatedBy: args.updatedBy,
              updatedAt: args.updatedAt,
            },
          },
        })
        .then(r => r.data.createUser.user.node);
    }
  } else {
    // update
    user = await context
      .userGQL({
        query: gql`
          mutation updateUser($user: updateUserInput!) {
            updateUser(input: $user) {
              user {
                id
              }
            }
          }
        `,
        variables: {
          user: {
            userName: args.userName,
            password: args.password,
            isAdmin: args.isAdmin,
            isSystem: args.isSystem,
            enabled: args.enabled,
            todos: args.todos,
            files: args.files,
            followings: args.followings,
            followers: args.followers,
            id: args.id,
            updatedBy: args.updatedBy,
            updatedAt: args.updatedAt,
          },
        },
      })
      .then(r => r.data.updateUser.user);
  }
  return user;
}
