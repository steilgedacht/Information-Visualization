---
theme: dashboard
title: Language Learning
toc: false
---

# Language Learning

<!-- Plot of Word Embedding -->

```js
import {embedding_map, updatePlot} from "./components/embedding_map.js";
import {table_plot} from "./components/debugging.js";
import {side_panel} from "./components/side_panel.js";

// const language = FileAttachment("./data/language_small.csv").csv({typed: true});
// const Language = view(Inputs.button([
//   ["English", value => "en"],
//   ["German", value => "de"],
//   ["Portugues", value => "pt"],
//   ["French", value => "fr"],
//   ["Italian", value => "it"],  
//   ["Spanish", value => "es"]
// ], {value: "en", Language: "Counter"}));

// const colors = view(Inputs.select(["noun", "verb", "adjec", "pronoun", "article", "black", "blanchedalmond", "blue", "blueviolet"], {multiple: 4, label: "Filter tags"}));
```

<!-- Load and transform the data -->

```js
const data = FileAttachment("./data/vocabulary_dataset.json").json();
```

<div id="filters">
  <div>
    <label><input type="checkbox" class="language-filter" value="en" checked> English</label>
    <label><input type="checkbox" class="language-filter" value="es" checked> Spanish</label>
    <label><input type="checkbox" class="language-filter" value="fr" checked> French</label>
    <label><input type="checkbox" class="language-filter" value="de" checked> German</label>
    <label><input type="checkbox" class="language-filter" value="pt" checked> Portuguese</label>
    <label><input type="checkbox" class="language-filter" value="it" checked> Italian</label>
  </div>
  <div>
    <label for="category-filter">Select Categories:</label>
    <select id="category-filter" multiple>
      <option value="n">n</option>
      <option value="sg">sg</option>
      <option value="vblex">vblex</option>
      <option value="pri">pri</option>
      <option value="p3">p3</option>
      <option value="pl">pl</option>
      <option value="*numb">*numb</option>
      <option value="*pers">*pers</option>
      <option value="inf">inf</option>
      <option value="f">f</option>
      <option value="adj">adj</option>
      <option value="m">m</option>
      <option value="mf">mf</option>
      <option value="*gndr">*gndr</option>
      <option value="nom">nom</option>
    </select>
  </div>
</div>


<div class="grid grid-cols-3">
  <div class="card grid-colspan-2" id="plotly-chart">
    ${resize((width) => embedding_map(data, {width}))}
  </div>
  <div class="card" id="side-panel">
    <p></p>
  </div>
</div>
