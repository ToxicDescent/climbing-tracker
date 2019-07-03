import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import usePostRequest from '../../hooks/usePostRequest';

import styles from './loginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setBody] = usePostRequest('/api/user/login');

  const onChange = event => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const onClick = () => {
    setBody({ email, password });
    console.error(response);
  };

  return (
    <div className={styles.loginPage}>
      <Paper className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          name="email"
          label="Email"
          type="text"
          value={email}
          onChange={onChange}
          autoFocus
          fullWidth
          margin="dense"
          color="inherit"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={onChange}
          fullWidth
          margin="dense"
          color="inherit"
        />
        <Button
          className={styles.submit}
          onClick={onClick}
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default LoginPage;
