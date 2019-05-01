import React, { Component } from "react";
import * as d3 from "d3";
import axios from "axios";

class BarChart extends Component {
  state = {
    chart: null,
    graphData: null
  };

  componentDidMount = async () => {
    // Uses async await. async keyword after the = is the current syntax. Previously, async keyword before the handleClick was valid syntax
    console.log("Getting graph data from /api/graph!");
    try {
      let response = await axios.get("http://localhost:3001/api/graph");
      this.setState({ graphData: response.data });
    } catch (error) {
      console.error("Error in fetching data from /api/graph");
    }
    this.drawChart();
  };

  drawChart() {
    const data = this.state.graphData[1];
    console.log(data);

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      .style("margin-left", 100);

    let chart = svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => this.props.height - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    this.setState({ chart: chart });
  }

  render() {
    return <div>{this.state.chart}</div>;
  }
}

export default BarChart;
