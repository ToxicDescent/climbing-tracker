import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header() {
  return (
    <AppBar position="static" style={{ marginBottom: 10 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          style={{ marginLeft: -12, marginRight: 20 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          Climbing Tracker
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
