import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";

import Auth from "./components/Auth/Auth.js";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route exact path="/auth" element={<Auth></Auth>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
