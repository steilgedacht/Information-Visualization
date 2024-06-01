import * as Plot from "npm:@observablehq/plot";
import * as d3 from "d3";

export function embedding_map(data, {width} = {}) {
  const getColor = (language) => {
    const colorMap = {
      'en': '#ff6384',
      'es': '#36a2eb',
      'fr': '#ffcd56',
      'de': '#4bc0c0',
      'pt': '#9966ff',
      'it': '#668722'
    };
    return colorMap[language] || '#cccccc';
  };

  // Calculate domain for x and y
  const xDomain = d3.extent(data, d => d.position[0]);
  const yDomain = d3.extent(data, d => d.position[1]);

  // Create scales
  const xScale = d3.scaleLinear().domain(xDomain).range([0, width]);
  const yScale = d3.scaleLinear().domain(yDomain).range([700, 0]); // height is 700

  // Create the SVG element
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, 700])  // Set viewBox for responsive scaling
    .attr("width", width)
    .attr("height", 700);

  // Create groups for grid and dots
  const gDot = svg.append("g").attr("fill", "none").attr("stroke-linecap", "round");

  // Append dots to the group
  gDot.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => xScale(d.position[0]))
      .attr("cy", d => yScale(d.position[1]))
      .attr("r", 1)
      .attr("fill", d => getColor(d.language))
      .attr("stroke", d => getColor(d.language));

  // Create zoom behavior
  const zoom = d3.zoom()
      .scaleExtent([1, 20])
      .on("zoom", zoomed);

  svg.call(zoom);

  function zoomed(event) {
    const transform = event.transform;
    gDot.attr("transform", transform).attr("stroke-width", 5 / transform.k);
  }

  // Append the SVG element to the body or a specific element
  document.body.appendChild(svg.node());

  // Return the SVG node for further manipulation if needed
  return svg.node();
}
