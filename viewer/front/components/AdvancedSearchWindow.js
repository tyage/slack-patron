import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
registerLocale('ja', ja);
import Select, { components } from 'react-select';
import { connect } from 'react-redux';
import SlackActions from '../actions/SlackActions';

import 'react-datepicker/dist/react-datepicker.css';
import './AdvancedSearchWindow.less';

const { Option } = components;
const IconOption = props => (
  <Option {...props}>
    <img src={props.data.icon} style={{ width: 24, 'padding-right': '1em' }} />
    {props.data.label}
  </Option>
);
/**
 * Convert the date to TS format in slack.
 * If date is null, it returns '*'.
 * @param {Date|null} date
 * @returns string
 */
const calcTS = date => {
  if (!date) return '*';
  return (date.getTime() / 1000).toFixed(0);
};
class AdvancedSearchWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      andQuery: '',
      orQuery: '',
      selectChannels: [],
      selectUsers: [],
      startDate: null,
      endDate: null,
    };
  }
  handleChangeChannel(value) {
    this.setState({selectChannels: value});
  }
  handleChangeUser(value) {
    this.setState({selectUsers: value});
  }
  handleChangeStartDate(value) {
    this.setState({startDate: value});
  }
  handleChangeEndDate(value) {
    this.setState({endDate: value});
  }
  search(e) {
    e.preventDefault();
    this.setState({
      andQuery: this.refs.AND.value,
      orQuery: this.refs.OR.value
    });
    const qAND = this.refs.AND.value.split(' ').join(' AND ');
    const qOR = this.refs.OR.value.split(' ').join(' OR ');
    const qCH = this.state.selectChannels.map(v=>`channel:${v.value}`).join(' OR ');
    const qUSER = this.state.selectUsers.map(v=>`user:${v.value}`).join(' OR ');
    const qDATE = `ts:[${calcTS(this.state.startDate)} TO ${calcTS(this.state.endDate)}]`;

    const query = [qAND, qOR, qCH, qUSER, qDATE].filter(v=>(v.length > 0)).map(v=>`(${v})`);
    this.props.search(query.join(' AND '));
    this.props.toggleAdvancedSearchWindow();
  }
  getChannelOptions() {
    return Object.entries(this.props.channels).map(([k, v]) => (
      {value: k, label: v.name}
    ));
  }
  getUserOptions() {
    return Object.entries(this.props.users).map(([k, v]) => (
      {value: k, label: `${v.name} (${v.profile.display_name})`, icon: v.profile.image_24}
    ));
  }
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div>
        <div className="configure-window">
          <div className="configure-section">
            <p className="section-title">Advanced Search</p>
            <form id="search" onSubmit={this.search.bind(this)}>
              <div className="form-section">
                All of: <input type="text" name="and" ref="AND" defaultValue={this.state.andQuery} />
              </div>
              <div className="form-section">
                Any of: <input type="text" name="or" ref="OR" defaultValue={this.state.orQuery} />
              </div>
              <div className="form-section">
                from:<DatePicker
                  locale="ja"
                  selected={this.state.startDate}
                  onChange={this.handleChangeStartDate.bind(this)}
                  dateFormat="yyyy/MM/dd HH:mm"
                  showTimeInput
                />
                until:<DatePicker
                  locale="ja"
                  selected={this.state.endDate}
                  onChange={this.handleChangeEndDate.bind(this)}
                  dateFormat="yyyy/MM/dd HH:mm"
                  showTimeInput
                />
              </div>
              <div className="form-section">
                Channel:<Select
                  isMulti
                  onChange={this.handleChangeChannel.bind(this)}
                  options={this.getChannelOptions()}
                  value={this.state.selectChannels}
                />
              </div>
              <div className="form-section">
                User:<Select
                  isMulti
                  onChange={this.handleChangeUser.bind(this)}
                  options={this.getUserOptions()}
                  value={this.state.selectUsers}
                  components={{
                    Option: IconOption,
                  }}
                />
              </div>
              <div className="form-section">
                <input type="submit" value="Search" />
              </div>
            </form>
          </div>
        </div>
        <div className="configure-background" onClick={this.props.toggleAdvancedSearchWindow}></div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    users: state.users,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    search: (query) => {
      dispatch(SlackActions.updateSearchWord(query));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchWindow);