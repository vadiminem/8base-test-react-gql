import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '_layers/gql/query';

export const useAddComment = options => {
  return useMutation(ADD_COMMENT, options);
};
