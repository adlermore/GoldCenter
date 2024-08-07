// app/dashboard/page.js
'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
// import './dashboard.module.css';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>Protected content goes here.</p>
      </div>
    </ProtectedRoute>
  );
}
