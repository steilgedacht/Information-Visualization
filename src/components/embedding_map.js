import Plotly from 'plotly.js-dist-min';
import * as Plot from "npm:@observablehq/plot";

export function embedding_map(data, { width = 700 } = {}) {

  const getColor = (language) => {
    const colorMap = {
      'en': '#914896',
      'es': '#f0ca44',
      'fr': '#5e5ee3',
      'de': '#ff7600',
      'pt': '#f04544',
      'it': '#63dc4a'
    };
    return colorMap[language] || '#cccccc';
  };

  const createTrace = (filteredData) => {
    return {
      x: filteredData.map(d => d.position[0]),
      y: filteredData.map(d => d.position[1]),
      text: filteredData.map(d => d.word),
      mode: 'markers+text',
      type: 'scattergl',
      marker: {
        size: 3,
        color: filteredData.map(d => getColor(d.language))
      },
      textposition: 'top center', 
      textfont: {
        size: 12,
        color: "#0000"
      },
      customdata: filteredData.map(d => ({custom_id: d.custom_id})),
      hovertemplate: '<b>%{text}</b><extra></extra>'
    };
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

  const updatePlot = () => {
    const selectedLanguages = Array.from(document.querySelectorAll('.language-filter:checked')).map(el => el.value);
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(el => el.value);

    const filteredData = data.filter(d =>
      selectedLanguages.includes(d.language) &&
      selectedCategories.every(category => d.lexeme.includes("<"+category+">"))
    );

    const trace = createTrace(filteredData);
    Plotly.react('plotly-chart', [trace], layout, config);
  };


  updatePlot();

  document.getElementById('plotly-chart').on('plotly_relayout', function(eventData) {
    const xRange = Math.abs(eventData['xaxis.range[1]'] - eventData['xaxis.range[0]']);
    const opacity = Math.pow(1 - (xRange / 15), 16); // Inverse relationship between range and opacity

    Plotly.restyle('plotly-chart', { 'textfont.color': `rgba(255, 255, 255, ${Math.max(0.0, Math.min(opacity, 1))})` });
  });
  
  document.getElementById('plotly-chart').on('plotly_click', function(eventData) {
    const pointIndex = eventData.points[0].customdata.custom_id;
    const pointData = data[pointIndex];
    displaySidePanel(pointData);
  });

  document.querySelectorAll('.language-filter, .category-filter').forEach(filter => {
    filter.addEventListener('change', updatePlot);
  });
}

// Function to display information in the side panel
function displaySidePanel(pointData) {
  const sidePanel = document.getElementById('side-panel');
  sidePanel.innerHTML = `
    <h1>${pointData.word}</h1> 
    <p style="float:right;">${pointData.language}</p>
    <p>${pointData.lexeme.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    `;
}
