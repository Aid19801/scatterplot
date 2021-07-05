var height = 500;
var width = 500;
var padding = 30;

function mustHaveKeys(obj) {
  const keys = [
    "subscribersPer100",
    "medianAge",
    "urbanPopulationRate",
    "adultLiteracyRate",
  ];
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) {
      return false;
    }
    return true;
  }
}
var data = regionData.filter(mustHaveKeys);

// Y AXIS
// CELLULAR SUBSCRIBERS PER 100 PEOPLE
var yScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.subscribersPer100))
  .range([height - padding, padding]);
var yAxis = d3
  .axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);
// X AXIS
// LITERACY RATE - AGED 15 +
var xScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.adultLiteracyRate))
  .range([padding, width - padding]);
var xAxis = d3.axisBottom(xScale).tickSize(-height + 2 * padding);

var radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.medianAge))
  .range([5, 30]);

var colorScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.urbanPopulationRate))
  .range(["green", "blue"]);

// Drawing the axis:
d3.select("svg")
  .append("g")
  .attr("transform", `translate(0, ${height - padding})`)
  .call(xAxis);

d3.select("svg")
  .append("g")
  .attr("transform", `translate(${padding}, 0)`)
  .call(yAxis);

// X AXIS LABELLING
d3.select("svg")
  .append("text")
  .attr("x", width / 2)
  .attr("y", height - padding)
  .attr("dy", "1.5em")
  .style("text-anchor", "middle")
  .text("Literacy rate, Aged 15 and up");

// Y AXIS LABELLING
d3.select("svg")
  .append("text")
  .attr("transform", `rotate(-90)`)
  .attr("x", -height / 2)
  .attr("y", 30)
  .attr("dy", "-1.1em")
  .style("text-anchor", "middle")
  .text("Cellular Subscribers Per 100 People");

// CHART TITLE
d3.select("svg")
  .append("text")
  .attr("x", width / 2) // so its in the middle
  .attr("y", 0)
  .attr("dy", "0.8em") // if title getting cut off, add more padding to main `padding` value
  .style("text-anchor", "middle") // otherwise it starts *word* from middle, isnt really middle
  .style("font-size", "1.5em")
  .text("Cellular Subscriptions vs Literacy Rate");

d3.select("svg")
  .attr("height", height)
  .attr("width", width)
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.adultLiteracyRate))
  .attr("cy", (d) => yScale(d.subscribersPer100))
  .attr("r", (d) => radiusScale(d.medianAge))
  .attr("fill", (d) => colorScale(d.urbanPopulationRate))
  .attr("stroke", "#fff");
