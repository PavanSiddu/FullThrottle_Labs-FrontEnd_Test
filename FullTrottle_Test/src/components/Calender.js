import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './Calender.css';
import 'react-calendar/dist/Calendar.css';
class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      active_dates: [],
      status: false,
    }
    for (let i = 0; i < this.props.active.length; i++) {
      this.state.active_dates.push({ start: this.props.active[i].start_time, end: this.props.active[i].end_time });
    }
  }
  active = {};
  onChange = date => {
    this.setState({date})
    let date1 = date.toString().substring(4, 15);
    for (let i = 0; i < this.state.active_dates.length; i++) {
      if (this.state.active_dates[i].start.substring(0, 11) === date1) {
        this.setState({ status: true })
        this.active = this.state.active_dates[i];
        break;
      }
      else {
        this.setState({ status: false })
        this.active = {};
      }
    }
  }
  render() {
    let info = null;
    if (this.state.status) {
      info = (<div style={{ color: 'green' }}><b>The User was Active from {this.active.start.substring(12,)} to {this.active.end.substring(12,)}</b></div>);
    }
    else {
      info = (<div style={{ color: 'red' }}><b>The User was Not Active on this Day</b></div>);
    }
    return (
      <div className='cal'>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <div className='status'>
          {info}
        </div>
      </div>
    );
  }
}

export default Calender;