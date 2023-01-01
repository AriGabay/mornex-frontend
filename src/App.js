import './App.css';
import LoginForm from './pages/login/login';
import SimpleSnackbar from './components/snackbar/snackbar';
import { checkUserLogin } from './services/auth-service';
import { UserList } from './pages/userList/userList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBar } from './components/appBar/appBar';
import ResetPassword from './pages/resetPassword/resetPassword';

function App() {
  const JWT = checkUserLogin();
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar />
        <Routes>
          <Route
            path="/"
            element={JWT?.length > 0 ? <h3>You're login</h3> : <LoginForm />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
        <SimpleSnackbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
