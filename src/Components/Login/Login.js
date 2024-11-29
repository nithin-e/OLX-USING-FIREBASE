import React, { useState } from 'react';
import {useContext} from 'react'
import { FirebaseContext } from '../../store/firebaseContest';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';  
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const [userEmail,setUserEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase}= useContext(FirebaseContext)
  const auth = getAuth(firebase); 
  const history = useHistory();

  const handleSubmit=(e)=>{
   e.preventDefault()

 
   signInWithEmailAndPassword(auth, userEmail, password)
   .then((userCredential) => {
     const user = userCredential.user;
     console.log(user.email); 
     history.push('/');
   })
   .catch((error) => {
     console.log(error);
   });

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setUserEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
