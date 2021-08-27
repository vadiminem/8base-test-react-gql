import React, { useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { LOAD_LIST_ITEMS } from '_constants';
import { commentsSelector, postSelector } from '_layers/dataSelectors';
import { useAddComment, useCommentsList, usePost } from '_layers/gql/hooks';
import { CenterLayout, PageLayout } from '_layers/ui/layouts';
import { PostPageContent } from '_pages/post/PostPage.Content';

export const PostPage = () => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState('');

  const { data: postData, loading } = usePost({
    variables: {
      id,
    },
  });
  const { data: commentsData, refetch: refetchComments } = useCommentsList({
    variables: {
      filter: {
        posts: {
          id: {
            equals: id,
          },
        },
      },
      first: LOAD_LIST_ITEMS,
    },
  });

  const post = postSelector.getPost(postData);
  const comments = commentsSelector.getList(commentsData);
  const commentsTotalCount = commentsSelector.getTotalCount(commentsData);
  const [commentCreate] = useAddComment();

  const onAddComment = async event => {
    event.preventDefault();
    setInputValue('');
    await commentCreate({ variables: { text: inputValue, postId: id } });
    refetchComments({
      variables: {
        filter: {
          posts: {
            id: {
              equals: id,
            },
          },
        },
        skip: comments.length,
      },
    });
  };

  const onEndReached = () => {
    refetchComments({
      variables: {
        filter: {
          posts: {
            id: {
              equals: id,
            },
          },
        },
        first: LOAD_LIST_ITEMS,
      },
    });
  };

  const onHandleChange = event => {
    setInputValue(event.target.value.toString());
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
            <PostPageContent
              post={post}
              comments={comments}
              commentsTotalCount={commentsTotalCount}
              inputValue={inputValue}
              onEndReached={onEndReached}
              onHandleChange={onHandleChange}
              onAddComment={onAddComment}
            />
          )}
        </>
      }
    />
  );
};
