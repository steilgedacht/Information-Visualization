import * as Plot from "npm:@observablehq/plot";

export function testi(events, {width, height} = {}) {
  Plot.plot({
    title: "Vocabulary Cloud",
    width,
    height: 300,
    y: {grid: true, label: "Launches"},
    color: {...color, legend: true},
    marks: [
      Plot.rectY(data, Plot.binX({y: "count"}, {x: "date", fill: "state", interval: "year", tip: true})),
      Plot.ruleY([0])
    ]
  });
  return 
}
