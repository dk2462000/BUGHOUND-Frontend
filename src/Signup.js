import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"


function Login() {
   


    return (
        <div className="login">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" placeholder="Email"  />
                <input type="password"  placeholder="Password" />
                <input type="submit"/>

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default Login