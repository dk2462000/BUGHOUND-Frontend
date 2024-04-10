import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";

import axios from 'axios'; // Import axios library
const LOGIN_ENDPOINT = 'http://localhost:8080/user/authenticate'; // Endpoint for user authentication

const LoginForm = () => {
    // Extracting setAuth function from AuthContext
    const { setAuth } = useContext(AuthContext);

    // References for user input and error display
    const userInputRef = useRef();
    const errorDisplayRef = useRef();

    // State variables for user input, error message, and success state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [UserType, setUserType] = useState('');

    // Focus on the username input field when the component mounts
    useEffect(() => {
        userInputRef.current.focus();
    }, [])

    // Reset error message whenever username or password changes
    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    // Function to handle form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Sending POST request to the login endpoint with user credentials
            const response = await axios.post(
                LOGIN_ENDPOINT,
                { username, password }, // User credentials
                { headers: { 'Content-Type': 'application/json' } } // Request headers
            );

            // Extracting access token and roles from the response
            const roles = response?.data;

            // Setting authentication data in the context
            setAuth({ username, password, roles });

            // Resetting user input fields and setting login success state
            setUsername('');
            setPassword('');
            setLoginSuccess(true);
            setUserType(roles);
        } catch (error) {
            // Handling different error scenarios
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            errorDisplayRef.current.focus(); // Focus on error display element
        }
    }

    // Render login form
    return (
        <>
            {/* Display login success message */}
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
                    {/* Display error message */}
                    <p ref={errorDisplayRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">
                        {errorMessage}
                    </p>
                    {/* Login form */}
                    <h1>Sign In</h1>
                    <form onSubmit={handleLoginSubmit}>
                        {/* Username input */}
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
                        {/* Password input */}
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        {/* Submit button */}
                        <button type="submit">Sign In</button>
                    </form>
                    {/* Sign up link */}
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default LoginForm;
