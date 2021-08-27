import { CenterLayout } from '_layers/ui/layouts';
import { Button, CircularProgress, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { APP_URL, BUTTONS, LABELS } from '_constants';
import { ArrowBack } from '@material-ui/icons';
import { CommentsPageContent } from '_pages/comments/CommentsPage.Content';
import React from 'react';

export const PostPageContent =
  (
    {
      post = {},
      comments = [],
      commentsTotalCount = 0,
      inputValue = '',
      onHandleChange,
      onEndReached,
      onAddComment,
    },
  ) => {

    return (
      <>
        <div style={{ height: '100%', overflowY: 'auto' }}>
          <Toolbar>
            <Link to={APP_URL.posts}>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='close'
              >
                <ArrowBack />
              </IconButton>
            </Link>
            <Typography variant={'h6'}>{post?.title}</Typography>
          </Toolbar>
          <img
            style={{ width: '100%' }}
            src={post?.thumbnail?.downloadUrl}
            alt={post?.title}
          />

          <Typography
            style={{ padding: '10px' }}
            variant={'body1'}
            component={'span'}
          >
            <ReactMarkdown>
              {post?.content ?? 'No description'}
            </ReactMarkdown>
          </Typography>

          <form
            style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightgrey', padding: '5px' }}
            autoComplete='off'
            onSubmit={onAddComment}
            noValidate
          >
            <TextField
              style={{ margin: '5px' }}
              value={inputValue}
              onChange={onHandleChange}
              placeholder={LABELS.commentInputPlaceholder}
            />
            <Button
              variant='contained'
              color='secondary'
              disabled={!inputValue}
              type='submit'
            >
              {BUTTONS.addComment}
            </Button>
          </form>
          <CommentsPageContent
            styles={{ backgroundColor: 'lightgrey' }}
            commentsList={comments}
            totalCount={commentsTotalCount}
            onEndReached={onEndReached}
          />
        </div>
      </>
    );
  };
