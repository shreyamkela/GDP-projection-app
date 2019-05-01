import React, { Component } from "react";
import BarChart from "./container/BarChart";

class App extends Component {
  state = {
    data: null,
    width: 700,
    height: 500
  };

  render() {
    return (
      <div className="App">
        <BarChart width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default App;
