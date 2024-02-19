import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

function SignIn() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
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
    if (!email || !password) {
      setErr("Please fill in all details");
    } else if (!email) {
      setErr("Fill in the Email input");
    } else if (!password) {
      setErr("Fill in the Password input");
    } else if (password.length < 6) {
      setErr("Password needs a minimum of 6 characters");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setErr("");
          navigate('/');
          // ...
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/invalid-credential") {
            setErr("Email or password is incorrect!");
          } else {
            setErr("");
          }
        });
    }
  };

  document.title = "SignIn";

  return (
    <>
      <div className='container'>
        <div className='avatar_one'></div>
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Your Email' />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Your password' />
        <p>{err}</p>
        <button onClick={handleSubmit}>Sign In</button>
        <p>Don't have an account? Just <Link to="/signup">SignUp</Link> Now</p>
      </div>
    </>
  );
}

export default SignIn;
