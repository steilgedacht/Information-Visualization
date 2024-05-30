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
import {side_panel} from "./components/side_panel.js";

// const language = FileAttachment("./data/language_small.csv").csv({typed: true});
const Language = view(Inputs.button([
  ["English", value => "en"],
  ["German", value => "de"],
  ["Portugues", value => "pt"],
  ["French", value => "fr"],
  ["Italian", value => "it"],  
  ["Spanish", value => "es"]
], {value: "en", Language: "Counter"}));

const colors = view(Inputs.select(["noun", "verb", "adjec", "pronoun", "article", "black", "blanchedalmond", "blue", "blueviolet"], {multiple: 4, label: "Filter tags"}));
```

<!-- Load and transform the data -->

```js
const data = FileAttachment("./data/vocabulary_dataset_small.json").json();
```

<div class="grid grid-cols-3">
  <div class="card grid-colspan-2" id="plotly-chart">
    ${resize((width) => embedding_map(data, {width}))}
  </div>
  <div class="card" id="side-panel">
    <p></p>
  </div>
</div>
