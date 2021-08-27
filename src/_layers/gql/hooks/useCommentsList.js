import { useMutation, useQuery } from '@apollo/client';

import { ADD_COMMENT, COMMENTS_LIST_QUERY } from '../query';

export const useCommentsList = options => {
  return useQuery(COMMENTS_LIST_QUERY, options);
};

