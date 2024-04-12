import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import AppBar from './AppBar'; 

const UPDATE_ENDPOINT = 'http://localhost:8080/user/update/'; // Endpoint for user update

// Regular expressions for validation
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EditUser = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const errRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [userType, setUserType] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [updatePassword, setUpdatePassword] = useState(false); // State to control password update

  // State for validation
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${username}`);
        const userData = response.data;
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.emailId);
        setUserType(userData.userType);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPwd(PWD_REGEX.test(pwd));
  }, [email, pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [firstName, lastName, email, pwd, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail || (updatePassword && !validPwd)) {
      setErrMsg("Invalid Entry");
      return;
    }

    const userData = {
      firstName,
      lastName,
      emailId: email,
      userType,
      ...(updatePassword && { password: pwd })
    };

    try {
      await axios.put(`${UPDATE_ENDPOINT}${username}`, JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/manage-users'); // Redirect to manage users page on success
    } catch (err) {
      setErrMsg('Update Failed');
      errRef.current.focus();
    }
  };

  return (
        <section>
            <AppBar title="Edit User" /> 
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
                {/* Username Display */}
                <div>
                    <label htmlFor="usernameDisplay">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="usernameDisplay"
                        value={username}
                        disabled
                        style={{ background: '#e9ecef', color: '#495057' }}  // Styling for disabled input
                    />
                </div>
                {/* First Name */}
                <label htmlFor="firstname">
                    First Name:
                    <FontAwesomeIcon icon={faCheck} className={firstName.length > 0 ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={firstName.length > 0 ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    aria-invalid={!firstName ? "true" : "false"}
                    aria-describedby="fnamenote"
                />
                <p id="fnamenote" className={firstName ? "offscreen" : "instructions"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    First name is required.
                </p>

                {/* Last Name */}
                <label htmlFor="lastname">
                    Last Name:
                    <FontAwesomeIcon icon={faCheck} className={lastName.length > 0 ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={lastName.length > 0 ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    aria-invalid={!lastName ? "true" : "false"}
                    aria-describedby="lnamenote"
                />
                <p id="lnamenote" className={lastName ? "offscreen" : "instructions"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Last name is required.
                </p>

                {/* Email */}
                <label htmlFor="email">
                    Email:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail ? "hide" : "invalid"} />
                </label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                />
                <p id="emailnote" className={email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Enter a valid email address.
                </p>

                {/* User Type */}
                <label htmlFor="userType">
                    User Type:
                </label>
                <select
                    id="userType"
                    onChange={(e) => setUserType(e.target.value)}
                    value={userType}
                    required
                >
                    <option value="">Select User Type</option>
                    <option value="tester">Tester</option>
                    <option value="developer">Developer</option>
                    <option value="manager">Manager</option>
                </select>
                <p id="pwdnote" className={pwd && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Select from the options
                </p>

                {/* Checkbox to decide if password should be updated */}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={updatePassword}
                            onChange={(e) => setUpdatePassword(e.target.checked)}
                        />
                        Need to Update Password
                    </label>
                </div>

                {/* Password input fields that are enabled based on the checkbox */}
                {updatePassword && (
                    <>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required={updatePassword}
                            className={validPwd ? "valid" : "invalid"}
                        />
                        <p className={pwd && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character. Allowed special characters: !@#$%
                        </p>
                    </>
                )}

                <button disabled={!validEmail || (updatePassword && !validPwd) || !firstName || !lastName || !userType}>Update</button>
            </form>
        </section>
    );
};

export default EditUser;
