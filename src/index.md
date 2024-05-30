---
theme: dashboard
title: Language Learning
toc: false
---

# Language Learning

<!-- Plot of Word Embedding -->

```js
import {embedding_map} from "./components/embedding_map.js";
import {table_plot} from "./components/debugging.js";
// const language = FileAttachment("./data/language_small.csv").csv({typed: true});

```

<!-- Load and transform the data -->

```js
const data = FileAttachment("./data/vocabulary_dataset_small.json").json();
```

<!-- A shared color scale for consistency, sorted by the number of launches -->
<!-- 
```js
const color = Plot.scale({
  color: {
    type: "categorical",
    domain: d3.groupSort(launches, (D) => -D.length, (d) => d.state).filter((d) => d !== "Other"),
    unknown: "var(--theme-foreground-muted)"
  }
});
``` -->
<h1>Lanugage Learning</h1>
<div class="grid grid-cols-1">
  <div class="card" id="plotly-chart">
    ${resize((width) => embedding_map(data, {width}))}
  </div>
</div>
