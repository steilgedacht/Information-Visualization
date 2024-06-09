import * as Plot from "npm:@observablehq/plot";

export function barChart_categories(data, category_translate, { width = 700 } = {}) {
  const updateChart = () => {
    const selectedLanguages = Array.from(document.querySelectorAll('.language-filter:checked')).map(el => el.value);
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(el => el.value);

    const filteredData = data.filter(d =>
      selectedLanguages.includes(d.language) &&
      selectedCategories.every(category => d.lexeme.includes("<" + category + ">"))
    );

    // Aggregate filtered data by language
    const aggregatedData = filteredData.reduce((acc, item) => {
      for(let i=0; i<=item.tags.length; i++) {
        acc[item.tags[i]] = (acc[item.tags[i]] || 0) + 1;
      }
      return acc;
    }, {});
    
    // Calculate total count for filtered data
    const totalCount = filteredData.length;
    
    // Convert aggregated data to an array suitable for the bar chart with percentages
    const chartData = Object.keys(aggregatedData).map(category => ({
      name: category,
      value: (aggregatedData[category] / totalCount) * 100
    }));
    
    // Sort chart data by value in descending order
    chartData.sort((a, b) => b.value - a.value);
    
    // Update the chart
    const chartElement = document.getElementById('bar-chart-cat');
    const chartData_clean = chartData.filter(data => data.name !== "undefined");

    chartElement.innerHTML = ''; // Clear previous chart
    const plot = Plot.plot({
      marks: [
        Plot.barX(chartData_clean.slice(0, 10), {
          y: d => d.name,
          x: d => d.value,
          title: d => `${d.name}: ${d.value.toFixed(2)}%`
        })
      ],
      x: {
        label: 'Percentage',
        tickFormat: d => `${d}%`

      },
      y: {
        tickFormat: d => `${category_translate[d.replace('<','').replace('>','').replace('*','').replace('@','')] || d.replace('<','').replace('>','')}`
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
