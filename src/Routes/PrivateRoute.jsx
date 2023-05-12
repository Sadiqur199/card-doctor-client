import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const {user,loading} = useContext(AuthContext)
  const location = useLocation()


  if(loading){
    return <progress className="progress w-full "></progress>
  }

  if(user?.email){
    return children
  }
  if(user){
    return children;
  }
  return <Navigate state={{from:location}} to="/login" replace></Navigate>
};

export default PrivateRoute;