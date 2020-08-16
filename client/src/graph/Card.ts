import Edge from './Edge';

class Card {
  edges: Map< string, Edge > = new Map<string, Edge>();
  nodes: Map< string, Node > = new Map<string, Node>();
  id: string;
  constructor(svg: SVGSVGElement, card: SVGGElement) {
    this.id = card.id;
  }

  updateEdges() {
    // TODO: remove old edges (?)
    for (const edge of this.edges.values()) {
      edge.drawPath()
    }
  }
}

export default Card;