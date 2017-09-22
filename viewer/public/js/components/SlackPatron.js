import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessagesSection from './MessagesSection';
import SearchForm from './SearchForm';
import SlackActions from '../actions/SlackActions';

export default class extends Component {
  componentDidMount() {
    SlackActions.getUsers();
    SlackActions.getTeamInfo();
  }
  render() {
    return (
      <div className="slack-patron">
        <Sidebar />
        <MessagesSection />
        <SearchForm />
      </div>
    );
  }
}
