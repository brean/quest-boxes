import * as d3 from 'd3';
import Node from './Node';
import Edge from './Edge';
import Card from './Card';

class Graph {
  _data: any;
  svg: any;
  selected?: Node = undefined;
  cards: Map< string, Card > = new Map<string, Card>();
  data(data: any) {
    this._data = data;
  }

  initZoom(svg: any) {
    this.svg = svg;
    const container = svg.select('g#zoom_root');
    // move map
    svg.call(d3.zoom().on("zoom", function () {
      container.attr("transform", d3.event.transform)
    }));
  }

  updateEdges() {
    // TODO: remove old edges (?)
    for (const edgeData of this._data.edges) {
      const fromCard = this.cards.get(edgeData.from) as Card;
      const toCard = this.cards.get(edgeData.to) as Card;

      const add = edgeData.answer ? `_${edgeData.answer}` : ''
      const from = fromCard.nodes.get('node_out_'+edgeData.from+add) as Node
      const to = toCard.nodes.get('node_in_'+edgeData.to) as Node
      const edge = new Edge(edgeData, from, to);
      if (!fromCard.edges.has(edgeData.id)) {
        fromCard.edges.set(edgeData.id, edge)
      }
      if (!toCard.edges.has(edgeData.id)) {
        toCard.edges.set(edgeData.id, edge)
      }
      edge.drawPath()
    }
  }

  updateDrag() {
    // move nodes
    const startPointerPos = {x: 0, y: 0};
    const startTransform = {x: 0, y: 0};
    const svg = this.svg;
    const cards = this.cards;
    // let selectedCircle: any = null;
    function dragCard() {
      const card = this.parentElement.parentElement
      card.setAttribute('transform',
        'translate(' +
        (startTransform.x + d3.event.sourceEvent.clientX - startPointerPos.x) +
        ', ' + 
        (startTransform.y + d3.event.sourceEvent.clientY - startPointerPos.y) +
        ')');
      const c = cards.get(card.id) as Card;
      c.updateEdges();
    }
  
    function dragStartCard() {
      startPointerPos.x = d3.event.sourceEvent.clientX;
      startPointerPos.y = d3.event.sourceEvent.clientY;
      const transform = this.parentElement.parentElement.getAttribute("transform")
      const split = transform.split(', ')
      startTransform.x = parseInt(split[0].substr(10))
      startTransform.y = parseInt(split[1].split(')')[0])
    }

    d3.selectAll('g.card')
      .each((x, index, list) => {
        const card = new Card(this.svg, list[index] as SVGGElement)
        this.cards.set(card.id, card);
      });

    d3.selectAll('.connect')
      .each((x, index, list) => {
        const node = new Node(svg.node(), list[index] as SVGCircleElement);
        console.log(node.cardId)
        const card = this.cards.get(node.cardId);
        card.nodes.set(node.id, node)
        node.addEventListener('selectNode', (event: Event) => {
          if (this.selected !== undefined) {
            this.selected.deselect();
            this.selected = undefined;
          }
          this.selected = node;
          node.select();
        })
      })

    const dragHandler = d3.drag()
      .on("start", dragStartCard)
      .on("drag", dragCard);
    dragHandler(svg.selectAll('.move_card'));
  }

}
export default Graph
