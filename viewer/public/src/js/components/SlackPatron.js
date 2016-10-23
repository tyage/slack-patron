import React from 'react';
import Sidebar from './Sidebar';
import MessagesSection from './MessagesSection';
import SearchForm from './SearchForm';
import SlackActions from '../actions/SlackActions';

export default React.createClass({
  componentDidMount() {
    SlackActions.getUsers();
    SlackActions.getTeamInfo();
  },
  render() {
    return (
      <div className="slack-patron">
        <Sidebar />
        <MessagesSection />
        <SearchForm />
      </div>
    );
  }
});
