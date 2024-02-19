import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebaseConfig from './FirebaseConfigue'
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';

function SignUp() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);


  const handleSubmit = () => {
    if (!name || !email || !phone || !password) {
      setErr("Please fill all details");
    } else if (!name) {
      setErr("Fill the name input");
    } else if (!email) {
      setErr("Fill the Email input");
    } else if (!phone) {
      setErr("Fill the Phone input");
    } else if (!password) {
      setErr("Fill the Password input");
    } else if (password.length < 6) {
      setErr("Password needs a minimum of 6 characters");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
            photoURL: "https://www.w3schools.com/w3images/avatar2.png"
          }).then(() => {
            // Profile updated!
            navigate("/signin");
            setErr("");
          }).catch((updateError) => {
            console.error("Error updating profile:", updateError.message);
            setErr("Error updating profile");
          });
        })
        .catch((error) => {
          console.error("Error creating user:", error.message);
          if (error.code === "auth/email-already-in-use") {
            setErr("This email is already in use");
          } else {
            setErr("Error creating user");
          }
        });
    }
  };

  document.title = "SignUp";

  return (
    <>
      <div className='container'>
        <div className='avatar'></div>
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Your Name' />
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Your Email' />
        <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Your Phone Number' />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Your password' />
        <p>{err}</p>
        <button onClick={handleSubmit}>Sign Up</button>
        <p>Do you already have an account? Just <Link to="/signin">SignIn</Link> Now</p>
      </div>
    </>
  );
}

export default SignUp;
