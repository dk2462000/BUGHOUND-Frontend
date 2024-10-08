import { useRef, useState, useEffect, useContext } from 'react';
import { useAuth } from "./context/AuthProvider";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LOGIN_ENDPOINT = 'http://localhost:8080/user/authenticate';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const userInputRef = useRef();
    const errorDisplayRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [UserType, setUserType] = useState('');

    useEffect(() => {
        userInputRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_ENDPOINT,
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const roles = response?.data;
            setAuth({ username, userType: roles });
            setUsername('');
            setPassword('');
            setLoginSuccess(true);
            setUserType(roles);

            if (roles === 'DEVELOPER') {
                navigate('/DeveloperDashboard');
            } else if (roles === 'TESTER') {
                navigate('/TesterDashboard');
            } else if (roles === 'MANAGER') {
                navigate('/ManagerDashboard');
            } else {
                console.log('Role not recognized or user does not have a specific dashboard');
                // Optionally navigate to a default or error page
                // navigate('/default');
            }
        } catch (error) {
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            errorDisplayRef.current.focus();
        }
    }

    return (
        <>
            {loginSuccess ? (
                <section>
                    <h1>You are logged in! {UserType}</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errorDisplayRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">
                        {errorMessage}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userInputRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    
                </section>
            )}
        </>
    )
}

export default LoginForm;
