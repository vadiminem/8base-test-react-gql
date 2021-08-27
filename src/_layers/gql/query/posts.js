import { gql } from '@apollo/client';

export const POSTS_LIST_QUERY = gql`
  query PostsList($first: Int, $skip: Int, $tags: [String!]) {
    postsList(first: $first, skip: $skip, filter: {
    tags:{
      some:{
        name: {
          in: $tags
        }
      }
    }
  }) {
      count
      items {
        id
        title
        createdAt
        thumbnail {
          downloadUrl
        }
      }
    }
    tagsList {
      items {
        name
      }
    }
  }
`;

export const POST_QUERY = gql`
  query Post($id: ID) {
    post(id: $id) {
      title
      content
      comments {
        items {
          content
          createdAt
        }
      }
      thumbnail {
        downloadUrl
      }
    }
  }
`;
