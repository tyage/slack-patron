import React from 'react';
import Sidebar from './Sidebar';
import MessagesSection from './MessagesSection';
import SearchForm from './SearchForm';

export default () => (
  <div className="slack-patron">
    <Sidebar />
    <MessagesSection />
    <SearchForm />
  </div>
);
