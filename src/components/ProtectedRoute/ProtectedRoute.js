import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext';

function ProtectedRoute(props) {
    const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
        {isAuthenticated ? props.children : <h1>Not authorized</h1>}
    </>
  )
}

export default ProtectedRoute