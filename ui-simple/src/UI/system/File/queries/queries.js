import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment FileResult on File {
    id
    path
    filename
    mimetype
    encoding

    userId: user @_(get:"id")
     {
      id
    }
  }`,
  fullFragment: gql`fragment FileFull on File {
    id
    path
    filename
    mimetype
    encoding
    user {
      id
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfFileResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...FileResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfFile($skip: Int, $limit: Int, $orderBy: [FileSortOrder], $filter: FileComplexFilter) {
    items: files(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...FileFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...FileResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query File($id: ID) {
    item: file(id: $id) {
      ...FileFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...FileResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Files($filter: FileComplexFilter) {
    items: files(filter: $filter) {
      edges {
        node {
          ...FileFull
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
        ...FileResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteFile ($input : deleteFileInput!) {
    item: deleteFile (input: $input) {
      node: file {
        ...FileFull
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
          ...FileResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createFile($input: createFileInput!) {
    item : createFile (input : $input) {
      edge: file {
        node {
          ...FileFull
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
        ...FileResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateFile($input: updateFileInput!) {
        item : updateFile (input : $input) {
          node: file {
            ...FileFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    user: gql`query User_Id($skip: Int, $limit: Int, $orderBy: [FileSortOrder], $filter: FileComplexFilter) {
      items: files(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...FileFull
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
            ...FileResult
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
          ...FileResult
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
