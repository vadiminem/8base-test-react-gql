import React, { useState } from 'react';

import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { BUTTONS } from '_constants';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FilterModal = ({ tagsList = [], onHandleApply }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleApply = () => {
    onHandleApply(checked);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ margin: '5px auto' }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={tagsList.length < 0}
        >
          {BUTTONS.filter}
        </Button>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar style={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography
              style={{ width: '100%' }}
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              {BUTTONS.filter}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleApply}>
              Apply
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {tagsList.map(item => {
            const labelId = `checkbox-list-label-${item.name}`;
            return (
              <ListItem key={item.name} onClick={handleToggle(item.name)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item.name) !== -1}
                    tabIndex={-1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.name} />
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </>
  );
};
