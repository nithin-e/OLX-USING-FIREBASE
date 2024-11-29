import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link, useHistory } from 'react-router-dom';  
import { FirebaseContext } from '../../store/firebaseContest';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';



export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth(firebase); 
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore(firebase);
           
      // console.log('.....',firebase);
      
     

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      

      console.log('.....check eda check.........',userCredential);
      
      // Add updateProfile to set the username
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      const userId = userCredential.user.uid;
      await setDoc(doc(db, 'users', userId), {
        username: username,
        email: email,
        phone: phone, 
        createdAt: new Date(),
      });


  
      console.log('Additional user data saved to Firestore!',userId);

      history.push('/Login');
      
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("This email is already registered. Please log in instead.");
      } else {
        console.error("Error creating user:", error.message);
      }
    }
    
  };


  
  return (
    <div className="signupParentDiv">
      <img width="200px" height="200px" src={Logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className="input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          className="input"
          type="number"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Signup</button>
      </form>
      <a href="/login">Login</a>
    </div>
  );
}