import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userAuthenticated, setUserAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuthenticated(true);
      } else {
        setUserAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  if (userAuthenticated === null) {
    // Loading state, you might want to display a spinner or something
    return null;
  }

  if (!userAuthenticated) {
    // User is not authenticated, redirecting to signin
    navigate("/signin");
    return null;
  }

  document.title = "Profile";

  return (
    <>
      <h2>
        <span>Congratulations</span> !! Dear {auth.currentUser.displayName} .<br /> Your account has been created successfully.
      </h2>
      <h5>Your Mentor Zubayer Hossen will contact you very soon</h5>
      <button className='logoutbtn' onClick={handleLogOut}>
        Log Out
      </button>
    </>
  );
}

export default Home;
