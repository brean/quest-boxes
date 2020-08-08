import * as d3 from 'd3';

class Graph {
  svg: any;
  container: any;

  constructor(svg: any) {

    this.svg = svg;
    const svgContainer = svg.append('g');
    this.container = svgContainer;
    svg.call(d3.zoom().on("zoom", function () {
      svgContainer.attr("transform", d3.event.transform)
    }));
    this.container
    .append("circle")
      .attr("cx", 300)
      .attr("cy", 300)
      .attr("r", 40)
      .style("fill", "#68b2a1");
  }
}
export default Graph
