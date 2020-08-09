class Node {
  data: any = null;
  constructor(data: any) {
    this.data = data;
  }

  render(container: any) {
    /*
    const fo = container.append('foreignObject');
    fo.attr('x', "100px")
    fo.attr('y', "100px")
    fo.attr('width', "200px")
    fo.attr('height', "150px")
    const div = fo.append('xhtml:div')
    div.append('p').html(`<div>${this.data.title}</div><select><option>multiple_choice</option><option>spider_chart</option><option>text</option></select>`);
    */
  }
}

export default Node
