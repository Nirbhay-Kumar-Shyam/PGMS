import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import './LoginSignup.css'
import { firebaseAuth } from '../../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { actions } from 'react-table/dist/react-table.development'

export const LoginSignup = () => {

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
        document.body.classList.remove('login-page');
    };
}, []);
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [formValues, setfromValues] = useState({email:'', password: ''});
  const [showPassword, setShowPassword] = useState(false);

  const [formValuesSignUp, setformValuesSignUp] = useState({
    email: '',
    password: '',
  });
  const handleLogiIn = async () => {
    try{
      const {email, password} = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);

    }catch(err){
      console.log(err);
    }
  };

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;

      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {if(currentUser) navigate('/home')});
  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
          <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login"?<div/>:<div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name'/>
        </div>}
        
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="eamil" placeholder='Email Id' name='email' value={formValues.email} onChange={(e) => setfromValues({...formValues, [e.target.name]: e.target.value,})}/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' name='password' value={formValues.password} onChange={(e)=>setfromValues({...formValues, [e.target.name]: e.target.value})}/>
        </div>
      </div>
      {action === "Sign Up"?<div/>:<div className="forgot-password">
        Forgot Password? <span>Click Here!</span>
      </div>}
      
      <div className="submit-container">
        <div className={action === "Login"?"submit gray": "submit"} onClick={()=>{action === "Login" ? setAction("Sign Up"): handleSignIn()}}>
          Sign Up
        </div>
        <div className={action === "Sign Up"?"submit gray":"submit"} onClick={()=>{action === "Sign Up"?setAction("Login"): handleLogiIn()}}>
          Login
        </div>
      </div>
    </div>
  )
}

export default LoginSignup