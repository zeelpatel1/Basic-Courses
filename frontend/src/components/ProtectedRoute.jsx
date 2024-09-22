import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Navigate } from 'react-router-dom';

const ProtectedRoute=({element})=>{
    const [user,loading]=useAuthState(auth)
    if (loading) return <div>Loading...</div>;
    return user ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;