import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AppBar as AppBarMui } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { checkUserLogin } from '../../services/auth-service';

export function AppBar() {
  const navigator = useNavigate();
  const isLogin = checkUserLogin();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui position="static">
        <Toolbar>
          <Typography
            variant="h6"
            textAlign="left"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Manage Accounts
          </Typography>
          {!isLogin.length ? (
            <Button color="inherit" onClick={() => navigator('/login')}>
              Login
            </Button>
          ) : (
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  navigator('/userList');
                }}
              >
                Users List
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigator('/resetPassword');
                }}
              >
                Reset Password
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.clear();
                  navigator('/');
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}
