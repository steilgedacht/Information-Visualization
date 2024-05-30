import Plotly from 'plotly.js-dist-min';

export function embedding_map(data, { width = 700 } = {}) {
  const trace = {
    x: data.map(d => d.position[0]),
    y: data.map(d => d.position[1]),
    text: data.map(d => d.word),
    mode: 'markers',
    type: 'scattergl',
    marker: {
      size: 3
    },
  };

  const layout = {
    width: width,
    height: 700,
    plot_bgcolor: '#1e1e1e',
    paper_bgcolor: '#1e1e1e',

    xaxis: {
      range: [Math.min(...data.map(d => d.position[0])), Math.max(...data.map(d => d.position[0]))]
    },
    yaxis: {
      range: [Math.min(...data.map(d => d.position[1])), Math.max(...data.map(d => d.position[1]))]
    },
    margin: {
      l: 0,
      r: 0,
      t: 20, // Leave some space for the title
      b: 0
    }
  };
  layout.template = 'plotly_dark';

  const config = {
    scrollZoom: true,
    responsive: true
  };

  Plotly.newPlot('plotly-chart', [trace], layout, config);
}
