import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import './Login.css';

const loginApi = 'https://apertum-interview.herokuapp.com/api/user/login';
export const Login = () => {
  const [username, changeUserName] = useState('');
  const [password, changePassword] = useState('');
  const [isLoading, changeLoading] = useState(false);
  const [hasError, changeError] = useState(false)

  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('auth-token') !== null) history.push('users')
  }, [history]);

  const handleSubmit = async e => {
    e.preventDefault();
    changeError(false);
    changeLoading(true);

    const response = await fetch(loginApi, {
      body: JSON.stringify({
        accountId: username,
        pswd: password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const result = await response.json();
    if (result.message === 'You got the token!') {
      localStorage.setItem('auth-token', result.token);
      history.push('/users')
    } else {
      changeError(true);
      changeLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
        <div className="login-inputs">
          <div>
            <TextField
              error={hasError}
              label="username"
              variant="outlined"
              value={username}
              onChange={val=>changeUserName(val.target.value)}
              helperText={hasError ? "Incorrect username or password." : '' }
            />
          </div>
          <div>
            <TextField
              error={hasError}
              label="password"
              variant="outlined"
              value={password}
              type="password"
              onChange={val=>changePassword(val.target.value)}
              helperText={hasError ? "Incorrect username or password." : '' }
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleSubmit} color="primary" disabled={isLoading}>Submit</Button>
          </div>
          <CircularProgress style={!isLoading ? {visibility: 'hidden'} : null}/>
        </div>
    </form>
  )
};
