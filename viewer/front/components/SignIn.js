import React from 'react';
import firebase from 'firebase';

export default () => {
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
      alert('failed to sign in.')
    }
  }
  
  return (
    <button onClick={handleSignIn}> Sign in with Google </button>
  );
}
