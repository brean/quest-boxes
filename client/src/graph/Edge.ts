import * as d3 from 'd3';
import Node from './Node'

class Edge extends EventTarget {
  data: any;
  path: SVGPathElement;
  from: Node;
  to: Node;

  constructor(data: any, from: Node, to: Node) {
    super();
    this.data = data;
    this.from = from;
    this.to = to;
    const add = data.answer ? `_${data.answer}` : ''
    this.path = d3.select('g#edges').append('path').node() as SVGPathElement;
    this.path.id = "edge_" + data.id
    this.path.classList.add('edge')
  }

  calculatePath(a: {x: number; y: number}, b: {x: number; y: number}) {
    const diff = {
      x: b.x - a.x,
      y: b.y - a.y
    };

    const path = `M${a.x},${a.y} C` +
      `${a.x + diff.x / 3 * 2},${a.y} ` +
      `${a.x + diff.x / 3},${b.y} ` +
      `${b.x},${b.y}`;

    return path;
  }

  drawPath() {
    this.path.setAttribute('d', this.calculatePath(
      this.from.position(),
      this.to.position()));
  }
}

export default Edge
