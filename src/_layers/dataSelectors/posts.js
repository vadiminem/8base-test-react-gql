const getList = data => {
  return data?.postsList?.items || [];
};

const getTotalCount = data => {
  return data?.postsList?.count || 0;
};

const getTagsList = data => {
  return data?.tagsList?.items || [];
};

export const postsSelector = {
  getList,
  getTotalCount,
  getTagsList,
};
