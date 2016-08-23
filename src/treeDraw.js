
(function(){

var margin = {top: 40, right: 120, bottom: 20, left: 120},
  width = 2000;
  height = 2000; //500 - margin.top - margin.bottom;
  
var i = 0;

var tree = d3.layout.tree()
  .size([height, width]);

var diagonal = d3.svg.diagonal()
  .projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function update(source) {

  d3.selectAll("g > *").remove();

  // Compute the new tree layout.
  var nodes = tree.nodes(root),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 100; });

  // Declare the nodes…
  var node = svg.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")    //enter enters the following elements into the DOM (matching the data)
    .attr("class", "node")
    .attr("transform", function(d) { 
      return "translate(" + d.x + "," + d.y + ")"; });

  //draw the circle
  nodeEnter.append("circle")
    .attr("r", 20)
    .on('click',function(){
      debugger;
    })
    .style("fill", function(d){if(d._color){return d._color; }else{return "#fff"};});

  //add the text
  nodeEnter.append("text")
    .attr("y", function(d) { 
      return d.children || d._children ? 0 : -18; })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.v; })
    .style("fill-opacity", 1);

  // Declare the links…(as DOM elements)
  var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });
    //target id provided by the data

  // Enter the links.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal);

}

app.update = function(t){
  var treeData = t;
  root = treeData[0];
  update(root);
}

})()
