import React, { Component } from "react";
import BarChart from "./container/BarChart";
import axios from "axios";

class App extends Component {
  state = {
    data: null,
    width: 700,
    height: 500
  };

  componentDidMount = async () => {
    // Uses async await. async keyword after the = is the current syntax. Previously, async keyword before the handleClick was valid syntax
    console.log("Getting graph data from /api/graph!");
    try {
      let response = await axios.get("http://localhost:3001/api/graph");
      this.setState({ data: response.data });
    } catch (error) {
      console.error("Error in fetching data from /api/graph");
    }
  };

  render() {
    return (
      <div className="App">
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default App;
