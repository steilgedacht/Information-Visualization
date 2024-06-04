import * as Plot from "npm:@observablehq/plot";

export function barChart(data, { width = 700 } = {}) {

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

  const updateChart = () => {
    const selectedLanguages = Array.from(document.querySelectorAll('.language-filter:checked')).map(el => el.value);
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(el => el.value);

    const filteredData = data.filter(d =>
      selectedLanguages.includes(d.language) &&
      selectedCategories.every(category => d.lexeme.includes("<" + category + ">"))
    );

    // Aggregate filtered data by language
    const aggregatedData = filteredData.reduce((acc, item) => {
      acc[item.language] = (acc[item.language] || 0) + 1;
      return acc;
    }, {});

    // Calculate total count for filtered data
    const totalCount = Object.values(aggregatedData).reduce((acc, count) => acc + count, 0);

    // Convert aggregated data to an array suitable for the bar chart with percentages
    const chartData = Object.keys(aggregatedData).map(language => ({
      name: language,
      value: (aggregatedData[language] / totalCount) * 100,
      color: getColor(language)
    }));

    // Sort chart data by value in descending order
    chartData.sort((a, b) => b.value - a.value);

    // Update the chart
    const chartElement = document.getElementById('bar-chart');
    chartElement.innerHTML = ''; // Clear previous chart
    const plot = Plot.plot({
      marks: [
        Plot.barY(chartData, {
          x: d => d.name,
          y: d => d.value,
          fill: d => d.color,
          title: d => `${d.name}: ${d.value.toFixed(2)}%`
        })
      ],
      x: {
        label: 'Language'
      },
      y: {
        label: 'Percentage',
        tickFormat: d => `${d}%`
      },
      width,
      height: 200
    });
    chartElement.appendChild(plot);
  };

  document.querySelectorAll('.language-filter, .category-filter').forEach(filter => {
    filter.addEventListener('change', updateChart);
  });

  // Initial chart rendering
  updateChart();
}
