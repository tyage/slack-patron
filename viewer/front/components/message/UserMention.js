import React from 'react';
import { connect } from 'react-redux'

class UserMention extends React.Component {
  getUser(id) {
    const users = this.props.users;
    return users && users[id];
  }
  render() {
    const user = this.getUser(this.props.id);
    return (
      <span className="user-mention">
        @{user && (user.profile.display_name || user.profile.real_name || user.name)}
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(UserMention);
