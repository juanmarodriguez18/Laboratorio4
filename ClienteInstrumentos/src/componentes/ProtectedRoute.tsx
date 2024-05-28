// ProtectedRoute.tsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const token = localStorage.getItem('token');

  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

export default ProtectedRoute;
