import * as d3 from 'd3';

class Node extends EventTarget {
  circle: SVGCircleElement;
  svg: SVGSVGElement;
  in = false;
  out = false;
  id: string;
  cardId: string;

  constructor(svg: SVGSVGElement, circle: SVGCircleElement) {
    super();
    this.circle = circle;
    this.svg = svg;
    this.id = circle.id
    this.cardId = (circle.parentElement as any).id
    this.in = circle.classList.contains('in')
    this.out = circle.classList.contains('out')
    d3.select(circle).on('mouseover', () => {
      circle.classList.add('hover')
    })
    .on('mouseout', () => {
      circle.classList.remove('hover')
    })
    .on('click', () => {
      const classList = circle.classList;
      this.dispatchEvent(new Event('selectNode'))
    });
  }

  position(): {x: number; y: number} {
    const bbox = this.circle.getBBox();
    const x = bbox.x + (bbox.width / 2);
    const y = bbox.y + (bbox.height / 2);
    const offset = this.svg.getBoundingClientRect();
    const matrix = this.circle.getScreenCTM();
    if (!matrix) {
      return {x: 0, y: 0};
    }
    return {
      x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
      y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
    };
  }

  deselect() {
    this.circle.classList.remove('selected')
  }

  select() {
    this.circle.classList.add('selected')
  }
}

export default Node
