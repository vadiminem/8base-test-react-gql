import { gql } from '@apollo/client';

export const COMMENTS_LIST_QUERY = gql`
  query CommentsList($first: Int, $skip: Int, $filter: CommentFilter = {}) {
    commentsList(orderBy: createdAt_DESC, first: $first, skip: $skip, filter: $filter) {
      count
      items {
        id
        content
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($text: String!, $postId: ID) {
    commentCreate(data: { content: $text, posts: { connect: { id: $postId } } }) {
      id
      content
    }
  }
`;
