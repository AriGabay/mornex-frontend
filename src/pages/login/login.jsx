import TextField from '../../components/textField/textField';
import React, { useEffect, useState } from 'react';
import { eventBus } from '../../services/event-bus';
import Button from '../../components/button/button';
import './login.css';
import { checkUserLogin, login } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const JWT = checkUserLogin();
  // eslint-disable-next-line
  useEffect(() => navigator('/'), [JWT && JWT.length > 0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      eventBus.dispatch('error', {
        message: 'Username and password are required',
      });
    }
    const loginResult = await login({ username, password });
    if (loginResult?.length) {
      navigator('/userList');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <TextField
        title="username"
        label="Username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        style={{ marginTop: '15px' }}
        title="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <Button type="submit" text="Login" />
    </form>
  );
}
