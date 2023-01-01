import '../login/login.css';
import TextField from '../../components/textField/textField';
import React, { useEffect, useState } from 'react';
import { checkUserLogin } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { eventBus } from '../../services/event-bus';
import { resetPassword } from '../../services/user-service';

export default function ResetPassword() {
  const [passwords, setPasswords] = useState({
    lastPassword: '',
    newPassword: '',
    verifyPassword: '',
  });
  const navigator = useNavigate();
  const JWT = checkUserLogin();
  useEffect(() => {
    if (JWT.length <= 0) {
      navigator('/');
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { newPassword, verifyPassword } = passwords;
    if (newPassword !== verifyPassword) {
      eventBus.dispatch('error', { message: 'Something worng !' });
      return;
    }
    const passwordUpdate = await resetPassword(passwords);
    if (passwordUpdate) {
      eventBus.dispatch('success', { message: 'Password Updated' });
    }
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <TextField
        style={{ marginTop: '15px', minWidth: '50%' }}
        title="newPassword"
        name="newPassword"
        label="New Password"
        defaultValue={passwords.newPassword}
        onChange={(event) => handleChange(event)}
        onSubmit={(event) => event.key === 'enter' ?? handleSubmit()}
      />
      <TextField
        style={{ marginTop: '15px', minWidth: '50%' }}
        title="verifyPassword"
        name="verifyPassword"
        label="Verify Password"
        defaultValue={passwords.verifyPassword}
        onSubmit={(event) => event.key === 'enter' ?? handleSubmit()}
        onChange={(event) => handleChange(event)}
      />
      <TextField
        style={{ marginTop: '15px', minWidth: '50%' }}
        onSubmit={handleSubmit}
        type="submit"
      />
    </form>
  );
}
