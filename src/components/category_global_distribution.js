import * as Plot from "npm:@observablehq/plot";

export function barChart_categories_all(data, { width = 700 } = {}) {
  const updateChart = () => {
    const selectedLanguages = Array.from(document.querySelectorAll('.language-filter:checked')).map(el => el.value);
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(el => el.value);

    const filteredData = data;
    
    // Aggregate filtered data by language
    const aggregatedData = filteredData.reduce((acc, item) => {
      for(let i=0; i<=selectedCategories.length; i++) {
        if (item.tags.includes("<" + selectedCategories[i] + ">")) {
          acc[selectedCategories[i]] = (acc[selectedCategories[i]] || 0) + 1;
        }
      }
      return acc;
    }, {});
    console.log(aggregatedData);
    
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
    const chartElement = document.getElementById('bar-chart-cat-all');
    chartElement.innerHTML = ''; // Clear previous chart
    const plot = Plot.plot({
      marks: [
        Plot.barX(chartData.slice(0, 10), {
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
        label: 'Category',
      },
      width,
      height: 200
    });
    chartElement.appendChild(plot);
  };

  document.querySelectorAll('.language-filter, .category-filter').forEach(filter => {
    filter.addEventListener('change', updateChart);
  });

  updateChart();
}
