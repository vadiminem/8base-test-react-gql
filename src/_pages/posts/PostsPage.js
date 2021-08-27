import { CircularProgress } from '@material-ui/core';

import { APP_BOTTOM_NAVIGATION, LOAD_LIST_ITEMS } from '_constants';
import { postsSelector } from '_layers/dataSelectors/posts';
import { usePostsList } from '_layers/gql/hooks';
import { BottomNavigation } from '_layers/ui/components';
import { CenterLayout, PageLayout } from '_layers/ui/layouts';

import { PostsPageContent } from './PostsPage.Content';

export const PostsPage = () => {
  const { data, loading, fetchMore, refetch } = usePostsList({
    variables: {
      first: LOAD_LIST_ITEMS,
    },
  });

  const postsList = postsSelector.getList(data);
  const tagsList = postsSelector.getTagsList(data);
  const totalCount = postsSelector.getTotalCount(data);

  const onEndReached = () => {
    fetchMore({
      variables: {
        skip: postsList.length,
      },
    });
  };

  const onHandleApply = filteredTags => {
    refetch({
      first: LOAD_LIST_ITEMS,
      tags: filteredTags.length > 0 ? filteredTags : tagsList.map(tag => tag.name),
    });
  };

  return (
    <PageLayout
      content={
        <>
          {loading ? (
            <CenterLayout>
              <CircularProgress />
            </CenterLayout>
          ) : (
            <PostsPageContent
              postsList={postsList}
              tagsList={tagsList}
              totalCount={totalCount}
              onEndReached={onEndReached}
              onHandleApply={onHandleApply}
            />
          )}
        </>
      }
      footer={<BottomNavigation navList={APP_BOTTOM_NAVIGATION} />}
    />
  );
};
