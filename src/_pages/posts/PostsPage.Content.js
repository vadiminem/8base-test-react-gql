import React from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';

import { APP_URL, BUTTONS, LABELS } from '_constants';
import { FilterModal } from '_layers/ui/components';

const ListContainer = React.forwardRef(({ style, children }, listRef) => {
  return (
    <List ref={listRef} style={style}>
      {children}
    </List>
  );
});

const ItemContainer = ({ children, ...props }) => {
  return (
    <>
      <Card {...props} style={{ margin: 10 }}>
        {children}
      </Card>
    </>
  );
};

export const PostsPageContent = ({
  postsList = [],
  tagsList = [],
  totalCount = 0,
  onEndReached,
  onHandleApply,
}) => {
  const hasMore = postsList.length < totalCount;

  return (
    <>
      <FilterModal tagsList={tagsList} onHandleApply={onHandleApply} />
      {postsList.length > 0 ? (
        <Virtuoso
          style={{ height: '100%', flexGrow: 1 }}
          data={postsList}
          totalCount={totalCount}
          endReached={onEndReached}
          components={{
            List: ListContainer,
            Item: ItemContainer,
            Footer: () => {
              return hasMore ? (
                <Box
                  component="li"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  <CircularProgress />
                </Box>
              ) : null;
            },
          }}
          itemContent={(index, post) => (
            <>
              <CardMedia component="img" image={post?.thumbnail?.downloadUrl} />
              <CardContent style={{ padding: 0 }}>
                <div style={{ padding: 15 }}>
                  <Typography variant="h5">{post?.title}</Typography>
                  <Typography variant="body2">
                    {new Date(post?.createdAt).toLocaleString()}
                  </Typography>
                </div>
                <CardActions>
                  <Button size="small" component={Link} to={`${APP_URL.posts}/${post?.id}`}>
                    {BUTTONS.readMore}
                  </Button>
                </CardActions>
              </CardContent>
            </>
          )}
        />
      ) : (
        <Box component="li" display="flex" justifyContent="center" alignItems="center" padding={2}>
          {LABELS.noItems}
        </Box>
      )}
    </>
  );
};
