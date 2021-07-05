var width = 500;
var height = 500;
var padding = 20;

// Y AXIS - life expectancy
// var yMax = d3.max(birthData2011, (d) => d.lifeExpectancy);
// var yMin = d3.min(birthData2011, (d) => d.lifeExpectancy);

var yScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.lifeExpectancy))
  .range([height - padding, padding]);
// extent works out the min & max for you

var xScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.births / d.population))
  .range([padding, width - padding]);
// no. of births / population = births-per-capita [rather than no. of births]

var colorScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.population / d.area))
  .range(["lightgreen", "black"]);
// mapping population density to colours!

var radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.births))
  .range([2, 40]);
// size of circle is mapped to no. of births

d3.select("svg")
  .attr("height", height)
  .attr("width", width)
  .attr("width", width)
  .selectAll("circle")
  .data(birthData2011)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.births / d.population))
  .attr("cy", (d) => yScale(d.lifeExpectancy))
  .attr("r", (d) => radiusScale(d.births))
  .attr("fill", (d) => colorScale(d.population / d.area));
