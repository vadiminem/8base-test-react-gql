import {
  AppBar, Button,
  Card,
  CardContent,
  CircularProgress, Container,
  Dialog, Grid,
  IconButton, TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { APP_BOTTOM_NAVIGATION, APP_URL, LOAD_LIST_ITEMS } from '_constants';
import { useAddComment, useCommentsList, usePost, usePostsList } from '_layers/gql/hooks';
import { commentsSelector, postSelector, postsSelector } from '_layers/dataSelectors';
import { CommentsPageContent } from '_pages/comments/CommentsPage.Content';
import { CenterLayout, PageLayout } from '_layers/ui/layouts';
import { BottomNavigation } from '_layers/ui/components';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '_layers/gql/query';
import { PostsPageContent } from '_pages/posts/PostsPage.Content';
import { PostPageContent } from '_pages/post/PostPage.Content';

export const PostPage = () => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState('');

  const { data: postData, loading } = usePost({
    variables: {
      id: id,
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

  const onAddComment = async (event) => {
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

  const onHandleChange = (event) => {
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
