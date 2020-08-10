import * as d3 from 'd3';

class Graph {
  _data: any;
  svg: any;


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
    for (const index in this._data.edges) {
      const edge = this._data.edges[index]
      const add = edge.answer ? `_${edge.answer}` : ''
      const edgeCircleFrom = d3.select('circle#connect_out_'+edge.from+add)
      const edgeCircleTo = d3.select('circle#connect_in_'+edge.to)
      const path = d3.select('path#edge_'+index);
      path.attr('d', 
        this.calculatePath(
          this.elemPos(edgeCircleFrom),
          this.elemPos(edgeCircleTo)));
    }
  }

  elemPos(elem: any) {
    const bbox = elem.node().getBBox();
    const x = bbox.x + (bbox.width / 2);
    const y = bbox.y + (bbox.height / 2);
    const offset = this.svg.node().getBoundingClientRect();
    const matrix = elem.node().getScreenCTM();
    return {
      x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
      y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
    };

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

  updateDrag() {
    // move nodes
    const startPointerPos = {x: 0, y: 0};
    const startTransform = {x: 0, y: 0};
    let selectedCircle: any = null;
    const svg = this.svg;
    function dragDrag() {
      const parent = this.parentElement.parentElement
      parent.setAttribute('transform',
        'translate(' +
        (startTransform.x + d3.event.sourceEvent.clientX - startPointerPos.x) +
        ', ' + 
        (startTransform.y + d3.event.sourceEvent.clientY - startPointerPos.y) +
        ')');
    }
  
    function dragStartNode() {
      startPointerPos.x = d3.event.sourceEvent.clientX;
      startPointerPos.y = d3.event.sourceEvent.clientY;
      const transform = this.parentElement.parentElement.getAttribute("transform")
      const split = transform.split(', ')
      startTransform.x = parseInt(split[0].substr(10))
      startTransform.y = parseInt(split[1].split(')')[0])
      //console.log(d3.event.sourceEvent.target.className)
      //console.log(d3.event.sourceEvent.target.classList)
    }

    d3.selectAll('.connect')
      .on('mouseover', function() {
        this.classList.add('hover')
      })
      .on('mouseout', function() {
        this.classList.remove('hover')
      })
      .on('click', function() {
        const classList = this.classList;
        if (selectedCircle !== null) {
          selectedCircle.classList.remove('selected')
          if (selectedCircle === this || !classList.contains('in')) {
            selectedCircle = null;
            return
          }
          console.log(this)
          console.log(selectedCircle)
          selectedCircle = null;
        }
        if (!classList.contains('out')) {
          return;
        }
        classList.add('selected')
        selectedCircle = this;
      });

    const dragHandler = d3.drag()
      .on("start", dragStartNode)
      .on("drag", dragDrag);
    dragHandler(this.svg.selectAll('.move_card'));


  }

}
export default Graph
