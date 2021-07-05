var width = 500;
var height = 500;
var padding = 30;

// Y AXIS - life expectancy
// var yMax = d3.max(birthData2011, (d) => d.lifeExpectancy);
// var yMin = d3.min(birthData2011, (d) => d.lifeExpectancy);

var yScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.lifeExpectancy))
  .range([height - padding, padding]);
// extent works out the min & max for you
var yAxis = d3
  .axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);

var xScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.births / d.population))
  .range([padding, width - padding]);
// no. of births / population = births-per-capita [rather than no. of births]
var xAxis = d3.axisBottom(xScale).tickSize(-height + 2 * padding);

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
  .append("g")
  .attr("transform", `translate(0, ${height - padding})`)
  .call(xAxis);

d3.select("svg")
  .append("g")
  .attr("transform", `translate(${padding}, 0)`)
  .call(yAxis);

// X AXIS LABELLING
// AXIS TITLE
d3.select("svg")
  .append("text")
  .attr("x", width / 2) // so its in the middle
  .attr("y", height - padding)
  .attr("dy", "1.5em") // if title getting cut off, add more padding to main `padding` value
  .style("text-anchor", "middle") // otherwise it starts *word* from middle, isnt really middle
  .text("Births per Capita");

// CHART TITLE
d3.select("svg")
  .append("text")
  .attr("x", width / 2) // so its in the middle
  .attr("y", 0)
  .attr("dy", "1.5em") // if title getting cut off, add more padding to main `padding` value
  .style("text-anchor", "middle") // otherwise it starts *word* from middle, isnt really middle
  .style("font-size", "1.5em")
  .text("Data on Births by Country in 2011");

// Y AXIS TITLE
d3.select("svg")
  .append("text")
  .attr("transform", `rotate(-90)`)
  .attr("x", -height / 2)
  .attr("y", padding)
  .attr("dy", "-1.1em")
  .style("text-anchor", "middle")
  .text("Life Expectancy");

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
