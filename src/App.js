import logo from './logo.svg';
import './App.css';
import CreateBug from "./components/CreateBug"
import Updatebug from "./components/CreateBug"
import Login from "./Login"
import Signup from "./Signup"
import Register from "./Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/CreateBug" element={<CreateBug/>}/>
          <Route path="/Updatebug" element={<Updatebug/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
