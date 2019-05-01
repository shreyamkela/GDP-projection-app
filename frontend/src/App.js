import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    graphData: null
  };

  componentDidMount = async () => {
    // Uses async await. async keyword after the = is the current syntax. Previously, async keyword before the handleClick was valid syntax
    console.log("Getting graph data from /api/graph!");
    try {
      let response = await axios.get("http://localhost:3001/api/graph");
      this.setState({ graphData: response });
    } catch (error) {
      console.error("Error in fetching data from /api/graph");
    }
  };

  render() {
    const graph = this.state.graphData;
    return (
      <div style={calStyle}>
        <div className="App border border-primary" style={appStyle}>
          <div className="container m-1">{graph}</div>
        </div>
      </div>
    );
  }
}

export default App;
