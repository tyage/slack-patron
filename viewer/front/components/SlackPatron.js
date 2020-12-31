import React from 'react';
import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import MessagesSection from './MessagesSection';
import SearchForm from './SearchForm';
import SignIn from './SignIn';
import AuthStatus from '../constants/AuthStatus';

const SlackPatron = (props) => {
  switch (props.authStatus) {
    case AuthStatus.loading: {
      return <p>Loading...</p>
    }
    case AuthStatus.signedIn: {
      return (
        <div className="slack-patron">
          <Sidebar />
          <MessagesSection />
          <SearchForm />
        </div>
      )
    }
    case AuthStatus.signedOut: {
      return <SignIn />
    }
  }
};

const mapStateToProps = state => {
  return {
    authStatus: state.auth.status
  };
};

export default connect(mapStateToProps)(SlackPatron);