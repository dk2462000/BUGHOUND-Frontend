import logo from './logo.svg';
import './App.css';
import CreateBug from "./components/CreateBug"
import Updatebug from "./components/CreateBug"
import DeveloperDashBoard from "./developer/DeveloperDashboard"
import TesterDashboard from './tester/TesterDashboard';
import DeveloperBugDetails from "./developer/component/BugDetails"
import ManagerDashboard from './manager/ManagerDashBoard';
import ManageProgram from './manager/ManageProgram';
import ManageFunction from './manager/ManageFunction';
import CreateUser from './manager/CreateUser';
import UserOperation from './manager/UserOperation';
import ManageUser from './manager/ManageUser';
import EditUser from './manager/EditUser'
import Login from "./Login"
import Signup from "./Signup"
import Register from "./Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { AuthProvider } from './context/AuthProvider';
import TesterBugDetails from './tester/component/BugDetails';
import ManagerBugDetails from './manager/component/BugDetails';
import DownloadAttachment from './components/DownloadAttachment';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/rest" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/CreateBug" element={<CreateBug/>}/>
          <Route path="/Updatebug" element={<Updatebug/>}/>
          <Route path="/DeveloperDashBoard" element={<DeveloperDashBoard/>}/>
          <Route path="/developerbugdetails/:bugId" element={<DeveloperBugDetails />} />
          <Route path="/TesterDashboard" element={<TesterDashboard/>}/>
          <Route path="/testerbugdetails/:bugId" element={<TesterBugDetails />} />
          <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
          <Route path="/manage-program" element={<ManageProgram />} />
          <Route path="/manage-function" element={<ManageFunction />} />
          <Route path="/manage-user" element={<UserOperation />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/manage-users" element={<ManageUser />} />
          <Route path="/edit-user/:username" element={<EditUser />} />
          <Route path="/managerbugdetails/:bugId" element={<ManagerBugDetails />} />    
          <Route path="/" element={<DownloadAttachment bugId={55}/>} />      
        </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
