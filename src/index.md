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


<div class="grid grid-cols-3">
  <div class="card grid-colspan-2" id="plotly-chart">
    ${resize((width) => embedding_map(data, {width}))}
  </div>
  <div class="card">
    <h2>Filters</h2>
    <div id="filters">
      <h3>Language</h3>
      <div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="language-filter" value="en" checked> English</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="language-filter" value="es" checked> Spanish</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="language-filter" value="fr" checked> French</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="language-filter" value="de" checked> German</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="language-filter" value="pt" checked> Portuguese</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="language-filter" value="it" checked> Italian</label></div>
      </div>
      <h3>Categories</h3>
      <div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n"> n</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sg"> sg</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vblex"> vblex</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pri"> pri</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="p3"> p3</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pl"> pl</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*numb"> *numb</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*pers"> *pers</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="inf"> inf</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="f"> f</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="adj"> adj</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="m"> m</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="mf"> mf</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*gndr"> *gndr</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nom"> Nomen</label></div>
      </div>
    </div>
  </div>
</div>

<div class="grid grid-cols-3" >
  <div class="card">
    <div id="side-panel"></div>
  </div>
  <div class="card">
    <div>
      ${Plot.plot({
      marks: [
        Plot.barY(alphabet, {x: "letter", y: "frequency"})
      ]
    })}
    </div>
  </div>  
  <div class="card">
  </div>  
</div>
