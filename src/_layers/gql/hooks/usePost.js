import { useQuery } from '@apollo/client';

import { POST_QUERY } from '_layers/gql/query';

export const usePost = options => {
  return useQuery(POST_QUERY, options);
};
