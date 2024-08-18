// components/LogoutButton.js
'use client';

import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
