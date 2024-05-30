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

  // Add click event listener
  document.getElementById('plotly-chart').on('plotly_click', function(eventData) {
    const pointIndex = eventData.points[0].pointIndex;
    const pointData = data[pointIndex];
    displaySidePanel(pointData);
  });
}

// Function to display information in the side panel
function displaySidePanel(pointData) {
  const sidePanel = document.getElementById('side-panel');
  sidePanel.innerHTML = `
    <h3>Point Information</h3>
    <p><strong>Word:</strong> ${pointData.word}</p>
    <p><strong>Position:</strong> (${pointData.position[0]}, ${pointData.position[1]})</p>
    <!-- Add more information here if needed -->
  `;
}
