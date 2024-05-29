import * as Plot from "npm:@observablehq/plot";

export function table_plot(data) {
  // Print table header
  console.log(data[0].join("\t"));

  // Print table rows
  for (let i = 1; i < data.length; i++) {
    console.log(data[i].join("\t"));
  }
  return 
}
