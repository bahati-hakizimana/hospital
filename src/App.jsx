import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import Layout from './components/admin/Layout';
import User_Layout from './components/user/User_Layout'

const App = () => {
  return (
   <BrowserRouter>

   <Routes>
    <Route path="/"  element={<HomePage />} />
    <Route path="/admin" element={<Layout />} ></Route>
    <Route path="/user"  element={<User_Layout />}></Route>
   </Routes>
   </BrowserRouter>
  );
};

export default App;
