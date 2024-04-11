import logo from './logo.svg';
import './App.css';
import CreateBug from "./components/CreateBug"
import Updatebug from "./components/CreateBug"
import DeveloperDashBoard from "./developer/DeveloperDashboard"
import BugDetails from "./developer/component/BugDetails"
import Login from "./Login"
import Signup from "./Signup"
import Register from "./Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/CreateBug" element={<CreateBug/>}/>
          <Route path="/Updatebug" element={<Updatebug/>}/>
          <Route path="/DeveloperDashBoard" element={<DeveloperDashBoard/>}/>
          <Route path="/bugdetails/:bugId" element={<BugDetails />} />

          
        </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
