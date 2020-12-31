import React from 'react';
import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import MessagesSection from './MessagesSection';
import SearchForm from './SearchForm';
import SignIn from './SignIn';

const SlackPatron = (props) => props.isSignedIn ?
  (
    <div className="slack-patron">
      <Sidebar />
      <MessagesSection />
      <SearchForm />
    </div>
  ) : (
    <SignIn />
  );


const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps)(SlackPatron);