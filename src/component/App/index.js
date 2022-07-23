import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header"
import Landing from "../Landing"
import Footer from "../Footer"
import Welcome from '../Welcome';
import Signup from '../Signup';
import Login from '../Login';
import ErrorPage from '../ErrorPage';
import '../../App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Welcome />} path="/welcome" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
