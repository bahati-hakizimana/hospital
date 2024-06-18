import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import Layout from './components/admin/Layout'
import User_Layout from './components/user/User_Layout'
// import User_Layout from './components/user/User_Layout'
import Users from './components/pages/adminPages/Users'
import Coments from './components/pages/adminPages/Coments'
import Request from "./components/pages/adminPages/Request";
import Profil from './components/pages/adminPages/Profil'
import UserComents from './components/pages/userPages/UserComents'
import UserRequest from './components/pages/userPages/UserRequest'
import UserProfil from './components/pages/userPages/UserProfil'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<Layout />} >

          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/coments" element={<Coments />} />
          <Route path="/admin/requests" element={<Request />} />
          <Route path="/admin/profile" element={<Profil />} />
        </Route>
        {/* End of ADMIN ROUTES */}
        {/*  USER ROUTES */}
        <Route path="/user" element={<User_Layout />}>
        <Route path="/user/coments" element={<UserComents />} />
        <Route path="/user/requests" element={<UserRequest />} />
        <Route path="/user/profile"  element={<UserProfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
