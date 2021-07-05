var height = 500;
var width = 500;
var padding = 30;

// Y AXIS
// CELLULAR SUBSCRIBERS PER 100 PEOPLE
var yScale = d3
  .scaleLinear()
  .domain(d3.extent(regionData, (d) => d.subscribersPer100))
  .range([height - padding, padding]);
var yAxis = d3
  .axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);

// X AXIS
// LITERACY RATE - AGED 15 +
var xScale = d3
  .scaleLinear()
  .domain(d3.extent(regionData, (d) => d.adultLiteracyRate))
  .range([padding, width - padding]);
var xAxis = d3.axisBottom(xScale).tickSize(-height + 2 * padding);

var radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(regionData, (d) => d.medianAge))
  .range([2, 40]);

var colorScale = d3
  .scaleLinear()
  .domain(d3.extent(regionData, (d) => d.medianAge))
  .range(["lightgreen", "purple"]);

d3.select("svg")
  .attr("height", height)
  .attr("width", width)
  .attr("fill", "red")
  .selectAll("circle")
  .data(regionData)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.adultLiteracyRate))
  .attr("cy", (d) => yScale(d.subscribersPer100))
  .attr("r", (d) => radiusScale(d.medianAge))
  .attr("fill", (d) => colorScale(d.medianAge));
