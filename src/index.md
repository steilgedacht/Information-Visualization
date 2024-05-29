---
theme: dashboard
title: Example dashboard
toc: false
---

# Language Learning

<!-- Plot of Word Embedding -->

```js
import {testi} from "./components/point_cloud.js";
import {table_plot} from "./components/debugging.js";
const language = FileAttachment("./data/language_small.csv").csv({typed: true});

table_plot(language)

```

<!-- Load and transform the data -->

```js
const launches = FileAttachment("./data/launches.csv").csv({typed: true});
```

<!-- A shared color scale for consistency, sorted by the number of launches -->

```js
const color = Plot.scale({
  color: {
    type: "categorical",
    domain: d3.groupSort(launches, (D) => -D.length, (d) => d.state).filter((d) => d !== "Other"),
    unknown: "var(--theme-foreground-muted)"
  }
});
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => testi(launches, {width}))}
  </div>
</div>