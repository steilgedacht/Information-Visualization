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

  const getSizeMapping = (d, sizeBy, searchTerm) => {
    if (searchTerm && d.word.toLowerCase() === searchTerm.toLowerCase()) {
      return 50; 
    }

    switch(sizeBy) {
      case 'users_seen':
        return 2 * Math.log2(d.users_seen);
      case 'average_performance':
        return Math.max(Math.pow(d.average_performance, 2) * 10, 1)
      case 'average_recall':
        return Math.max(Math.pow(d.average_recall, 2)*10, 1)
      case 'hardness':
        return 3/Math.pow(d.average_performance, 2) 
      default:
        return 5;
    }
  };  

  const createTrace = (filteredData, sizeBy, searchTerm) => {
    return {
      x: filteredData.map(d => d.position[0]),
      y: filteredData.map(d => d.position[1]),
      text: filteredData.map(d => d.word),
      mode: 'markers+text',
      type: 'scattergl',
      marker: {
        size: filteredData.map(d => getSizeMapping(d, sizeBy, searchTerm)),
        color: filteredData.map(d => getColor(d.language)),
        line: { width: 0 }
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
      t: 20,
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
    const sizeBy = document.getElementById('sizeBy').value;
    const searchTerm = document.getElementById('search').value.trim();

    const filteredData = data.filter(d =>
      selectedLanguages.includes(d.language) &&
      selectedCategories.every(category => d.lexeme.includes("<"+category+">"))
    );

    const trace = createTrace(filteredData, sizeBy, searchTerm);
    Plotly.react('plotly-chart', [trace], layout, config);

    if (searchTerm) {
      const matchedData = filteredData.find(d => d.word.toLowerCase() === searchTerm.toLowerCase());
      if (matchedData) {
        displaySidePanel(matchedData);
      }
    }
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

  document.getElementById('sizeBy').addEventListener('change', updatePlot);
  document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      updatePlot();
    }
  });
}

// Function to display information in the side panel
function displaySidePanel(pointData) {
  const sidePanel = document.getElementById('side-panel');
  
  let word_comparison_old = document.getElementById('side-panel').innerHTML;


  let tag_string = "";
  for(let i=0; i<=pointData.tags.length; i++) {
    if (pointData.tags[i] == undefined) {continue;} 
    tag_string += '<b style="background: white;color: #504b4b;padding: 4px 8px;border-radius: 50px;margin-right: 4px;" >' + pointData.tags[i].replace(/</g, "").replace(/>/g, "") + "</b>";
  }
  
  sidePanel.innerHTML = `
    <h1>${pointData.word}</h1> 
    <p style="float:right;" class="no_compare">${pointData.language}</p>
    <p>${pointData.full_word}</p>
    <p>${tag_string}</p>
    <br>
    <h3>Users that saw the word</h3>
    <h1>${pointData.users_seen}</h1>
    <br>
    <h3>Average Performance of the word</h3>
    <h1>${Math.round(pointData.average_performance*1000)/1000}</h1>
    `;

  let word_comparison_new = document.getElementById('side-panel').innerHTML;
  const word_comparson = document.getElementById('word_comparison');
  word_comparson.innerHTML = `<div style="display: flex;"><div style="flex-basis: 50%;margin: 5px;">${word_comparison_new}</div><div style="flex-basis: 50%;margin: 5px;">${word_comparison_old}</div></div>`;
  




}
