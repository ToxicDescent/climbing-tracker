import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';

import styles from './header.css';

const Header = ({ username, setUsername }) => {
  const onChange = event => {
    setUsername(event.target.value);
  };

  return (
    <AppBar className={styles.appBar} position="static">
      <Toolbar>
        <IconButton
          className={styles.iconButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={styles.heading} variant="h6" color="inherit">
          Climbing Tracker
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={onChange}
          margin="dense"
          color="inherit"
        />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired
};

export default Header;
