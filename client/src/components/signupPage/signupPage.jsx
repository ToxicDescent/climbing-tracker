import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { createUser } from '../../api/user';

import styles from './signupPage.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const onClick = () => {
    createUser({ name, email, password, confirmPassword });
  };

  return (
    <div className={styles.signupPage}>
      <Paper className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <TextField
          name="name"
          label="Name"
          type="text"
          value={name}
          onChange={onChange}
          autoFocus
          fullWidth
          margin="dense"
          color="inherit"
        />
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
        <TextField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
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
          Signup
        </Button>
      </Paper>
    </div>
  );
};

export default SignupPage;
