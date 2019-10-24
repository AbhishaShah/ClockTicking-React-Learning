import React, { Component } from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";

import "./styles.css";

function getClockTime() {
  // Get the Current Time
  var date = new Date();

  // Serialize clock time
  var time = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ampm: "AM"
  };

  if (time.hours === 12) {
    time.ampm = "PM";
  } else if (time.hours > 12) {
    time.ampm = "PM";
    time.hours -= 12;
  }
  // Prepend a 0 on the hours to make double digits
  if (time.hours < 10) {
    time.hours = "0" + time.hours;
  }
  // prepend a 0 on the minutes to make double digits
  if (time.minutes < 10) {
    time.minutes = "0" + time.minutes;
  }
  // prepend a 0 on the seconds to make double digits
  if (time.seconds < 10) {
    time.seconds = "0" + time.seconds;
  }
  // Format the clock time as a string "hh:mm:ss tt"
  return time;
}
class DisplayClock extends Component {
  constructor() {
    super();
    this.state = getClockTime();
  }
  componentDidMount() {
    console.log("start ticking");
    this.ticking = setInterval(() => this.setState(getClockTime()), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.ticking);
    console.log("Stopping Clock");
  }

  render() {
    const { hours, minutes, seconds, ampm } = this.state;
    var hrBox = {
      color: "white",
      backgroundColor: "red",
      width: 50,
      height: 50,
      textAlign: "center",
      fontSize: 40,
      display: "inline-block",
      position: "relative"
    };

    var minBox = {
      color: "white",
      backgroundColor: "green",
      width: 50,
      height: 50,
      textAlign: "center",
      fontSize: 40,
      display: "inline-block"
    };
    var secBox = {
      color: "white",
      backgroundColor: "blue",
      width: 50,
      height: 50,
      textAlign: "center",
      fontSize: 40,
      display: "inline-block"
    };

    var ampmBox = {
      color: "black",
      width: 50,
      height: 50,
      textAlign: "center",
      fontSize: 30,
      display: "inline-block"
    };
    var colon = {
      width: 10,
      height: 10,
      textAlign: "center",
      fontSize: 35,
      display: "inline-block"
    };
    return (
      <div className="time-display">
        <div style={hrBox}>{hours}</div> <div style={colon}>:</div>
        <div style={minBox}>{minutes}</div> <div style={colon}>:</div>
        <div style={secBox}>{seconds}</div>
        <div style={ampmBox}> {ampm}</div>
        <br />
        <button onClick={this.props.onClose}>Close</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DisplayClock onClose={() => unmountComponentAtNode(rootElement)} />,
  rootElement
);
