import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "./context/AuthProvider";
import './manager/UserManagement.css';
import bugHoundLogo from './bughound-logo.png';
// Logo generated by https://logo.com/

const LOGIN_ENDPOINT = 'http://localhost:8080/user/authenticate';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const userInputRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userInputRef.current.focus();
    }, []);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_ENDPOINT,
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const userType = response.data;  // Assuming API returns a string directly
            console.log('User Type:', userType); // Debugging: Log user type

            setAuth({ user: username, userType });
            setUsername('');
            setPassword('');

            // Redirect based on user type
            switch (userType) {
                case 'DEVELOPER':
                    navigate('/DeveloperDashboard', { replace: true });
                    break;
                case 'TESTER':
                    navigate('/TesterDashboard', { replace: true });
                    break;
                case 'MANAGER':
                    navigate('/ManagerDashboard', { replace: true });
                    break;
                default:
                    setErrorMessage('Role not recognized or user does not have a specific dashboard');
                    break;
            }
        } catch (error) {
            console.log(error);  // Log any error for debugging
            setErrorMessage(error.response?.data.message || 'Login Failed. Check the username/password');
        }
    };

    return (
        <div className="create-user-container"> {/* Using CSS styles from UserManagement.css */}
            <img src={bugHoundLogo} alt="Bug Hound" className="bughound-logo" /> 
            <h2 className="create-user-title">Login</h2>
            <form onSubmit={handleLoginSubmit} className="create-user-form">
                <div className="form-group-1">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        ref={userInputRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </div>
                <div className="form-group-1">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <p className={`visible ${errorMessage ? "" : "offscreen"}`} aria-live="assertive">
                    {errorMessage}
                </p>
                <button type="submit" className="btn-submit">Sign In</button>
            </form>
        </div>
    );
};

export default LoginForm;