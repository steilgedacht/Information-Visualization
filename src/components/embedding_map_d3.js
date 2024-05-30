import * as Plot from "npm:@observablehq/plot";
import * as d3 from "d3";

export function embedding_map(data, {width} = {}) {
  // Create the plot
  const plot = Plot.plot({
    title: "Vocabulary Cloud",
    width,
    height: 700,
    marks: [
      Plot.dot(data, {x: d => d.position[0], y: d => d.position[1], title: "word"})
    ]
  });

  // Create a container for the plot and the zoomable group
  const container = document.createElement("div");
  container.appendChild(plot);

  // Select the SVG element
  const svg = d3.select(container).select("svg");
  
  // Create a 'g' element to contain all plot elements
  const g = svg.append("g").attr("class", "plot-content");

  // Move all existing children of the svg into the new 'g' element
  svg.selectAll(":scope > *:not(.plot-content)").each(function() {
    g.node().appendChild(this);
  });

  // Create a zoom behavior
  const zoom = d3.zoom()
      .scaleExtent([1, 20])  // Define the zoom scale
      .on("zoom", handleZoom);

  // Function to handle zoom events
  function handleZoom(event) {
    g.attr("transform", event.transform);
    g.selectAll("circle").attr("r", d => Math.max(0.1 / event.transform.k, 2));  // Adjust the radius
  }

  // Apply the zoom behavior to the SVG container
  svg.call(zoom);

  // Return the container element
  return container;
}