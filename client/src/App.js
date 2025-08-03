import { Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import ForgotPw from './pages/Auth/ForgotPw';
import Register from './pages/Auth/Register';
import Customize from './pages/Customize';
import Order from './pages/Order';

function App() {
  return (
      <Routes>
        <Route path="/register" element={< Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path="/login/forgot-pw" element={<ForgotPw />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path='/customize-pizza' element={<Customize />} />
        <Route path='/orders' element={<Order />} />
      </Routes>
  );
}

export default App;
