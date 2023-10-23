import React from 'react'
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthRoutes() {
  const { user } = useSelector((user) => ({ ...user }));
  let isLoggedIn = user?true:false;

  return (
    isLoggedIn?<Outlet/>:<Navigate to="/login" />
  )
}
