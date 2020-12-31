import React from 'react';
import firebase from 'firebase';

export default class SignIn extends React.Component {
  async handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
      alert('failed to sign in.')
    }
  }
  
  render() {
    return (
      <button onClick={this.handleSignIn.bind(this)}> Sign in with Google </button>
    );
  }
}
