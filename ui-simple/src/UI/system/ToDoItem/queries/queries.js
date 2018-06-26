import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment ToDoItemResult on ToDoItem {
    name
    updatedBy
    description
    updatedAt
    done
    dueToDate
    published
    id

    userValue: user 
     {
      id
      userName
      password
      isAdmin
      isSystem
      enabled
      updatedBy
      updatedAt
    }
  }`,
  fullFragment: gql`fragment ToDoItemFull on ToDoItem {
    name
    updatedBy
    description
    updatedAt
    done
    dueToDate
    published
    id
    user {
      id
      userName
      password
      isAdmin
      isSystem
      enabled
      updatedBy
      updatedAt
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfToDoItemResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...ToDoItemResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfToDoItem($skip: Int, $limit: Int, $orderBy: [ToDoItemSortOrder], $filter: ToDoItemComplexFilter) {
    items: toDoItems(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...ToDoItemFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...ToDoItemResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query ToDoItem($id: ID) {
    item: toDoItem(id: $id) {
      ...ToDoItemFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...ToDoItemResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query ToDoItems($filter: ToDoItemComplexFilter) {
    items: toDoItems(filter: $filter) {
      edges {
        node {
          ...ToDoItemFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //delete
  deleteResult: ({ resultFragment }) => gql`{
    item @_(get:"node") {
      node {
        ...ToDoItemResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteToDoItem ($input : deleteToDoItemInput!) {
    item: deleteToDoItem (input: $input) {
      node: toDoItem {
        ...ToDoItemFull
      }
    }
  }
  ${fullFragment}
  `,
  //create
  createResult: ({ resultFragment }) => gql`{
    item @_(get: "edge.node") {
      edge {
        node {
          ...ToDoItemResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createToDoItem($input: createToDoItemInput!) {
    item : createToDoItem (input : $input) {
      edge: toDoItem {
        node {
          ...ToDoItemFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //update
  updateResult: ({ resultFragment }) => gql`{
    item @_(get:"node") {
      node {
        ...ToDoItemResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateToDoItem($input: updateToDoItemInput!) {
        item : updateToDoItem (input : $input) {
          node: toDoItem {
            ...ToDoItemFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    user: gql`query User_UserName($skip: Int, $limit: Int, $orderBy: [ToDoItemSortOrder], $filter: ToDoItemComplexFilter) {
      items: toDoItems(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...ToDoItemFull
          }
        }
      }
    }
    ${fullFragment}
  `,
    }),
  getManyReferenceResultOpposite: ({ resultFragment }) => gql`{
    items: opposite @_(get:"items") {
      items {
        total: pageInfo @_(get:"count") {
          count
        }
        data: edges @_(each: {assign:"node"}) {
          node {
            ...ToDoItemResult
          }
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResultRegular: ({ resultFragment }) => gql`{
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...ToDoItemResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    user: getManyReferenceResultRegular({ resultFragment }),
  }),
}
