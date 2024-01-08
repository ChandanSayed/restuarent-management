import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';
import StateContext from '../context/StateContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(StateContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
