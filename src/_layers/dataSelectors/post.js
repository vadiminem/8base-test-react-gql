const getPost = data => {
  return data?.post || {};
};

const getComments = data => {
  return data?.post?.comments?.items || [];
};

export const postSelector = {
  getPost,
  getComments,
};
