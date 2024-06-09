---
theme: dashboard
title: Language Learning
toc: false
---

# Language Learning

<!-- Plot of Word Embedding -->

```js
import {embedding_map, updatePlot} from "./components/embedding_map.js";
import {side_panel} from "./components/side_panel.js";
import {barChart} from "./components/language_distribution.js";
import {barChart_categories} from "./components/category_distribution.js";
import {barChart_categories_all} from "./components/category_global_distribution.js";
```

<!-- Load and transform the data -->

```js
const data = FileAttachment("./data/vocabulary_dataset.json").json();
const category_translate = FileAttachment("./data/lexeme_reference.json").json();
```


<div class="grid grid-cols-4">
  <div class="card grid-colspan-2 grid-rowspan-3" id="plotly-chart">
    ${resize((width) => embedding_map(data, {width}))}
  </div>
  <div class="card">
    <h2>Filters</h2><br>
    <div>
      <label for="search">Search:</label>
      <input type="text" id="search" placeholder="Enter word to search...">
    </div>
    <div>
      <br>
      <h3>Projection method</h3> 
      <select style="width:100%" id="embedding-type" name="choices">
        <option value="1">Bert-base-cased</option>
        <option value="2">Bert-base-uncased</option>
        <option value="3">Bert-large-uncased</option>
        <option value="4">Bert-multilanguage</option>
      </select>
    </div>
    <div>
      <br>
      <h3>Size by</h3>
      <select style="width:100%" id="sizeBy" name="sizeBy">
        <option value="none">None</option>
        <option value="hardness">Difficulity</option>
        <option value="average_performance">Performance</option>
        <option value="average_recall">Recall</option>
        <option value="users_seen">Users that have seen the word</option>
      </select>
    </div>          
    <br>
  </div>
  <div class="card" id="plotly-chart">   
    <div id="side-panel"><h3>Word Information</h3></div>
  </div>  

  <div class="card">    
    <div id="filters">
      <h3>Language</h3>
      <div>
        <div style="margin-bottom:5px; color:#914896;"><label><input type="checkbox" class="language-filter"  value="en" checked> English</label></div>
        <div style="margin-bottom:5px; color:#f0ca44;"><label><input type="checkbox" class="language-filter"  value="es" checked> Spanish</label></div>
        <div style="margin-bottom:5px; color:#5e5ee3;"><label><input type="checkbox" class="language-filter"  value="fr" checked> French</label></div>
        <div style="margin-bottom:5px; color:#ff7600;"><label><input type="checkbox" class="language-filter"  value="de" checked> German</label></div>
        <div style="margin-bottom:5px; color:#f04544;"><label><input type="checkbox" class="language-filter"  value="pt" checked> Portuguese</label></div>
        <div style="margin-bottom:5px; color:#63dc4a;"><label><input type="checkbox" class="language-filter"  value="it" checked> Italian</label></div>
      </div>
      <br>
    </div>
  </div> 
  <div class="card">    
    <h3>Categories</h3>
    <div style="height:200px; overflow-y:scroll;">
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n"> Noun</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sg"> Singular</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*numb"> *numb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vblex"> Verb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="m"> Masculine</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="f"> Feminine</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pl"> Plural</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="adj"> Adjective</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pri"> Present indicative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="inf"> Infinitive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="p3"> Third person</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="mf"> Masculine / feminine</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*pers"> *pers</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*gndr"> *gndr</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nom"> nom</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pp"> Past participle</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="adv"> Adverb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nt"> Neuter</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="p1"> First person</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="acc"> acc</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*case"> *case</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="prn"> Pronoun</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="det"> Determiner</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pst"> pst</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sp"> Singular / plural</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pii"> Imperfect indicative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@present_perfect"> @present_perfect</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="p2"> Second person</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="dat"> dat</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr"> Preposition</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@future"> @future</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@future_phrasal"> @future_phrasal</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@compound_past"> @compound_past</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ifi"> Preterite indicative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="tn"> Tonic</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pos"> Possessive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbmod"> Modal verb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ind"> Indefinite</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbser"> Verb to be</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="num"> Numeral</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_perfect"> @past_perfect</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pres"> Present tense (indicative)</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="fti"> Future indicative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cond"> @cond</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ger"> Gerund</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pred"> pred</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbhaver"> Verb to have</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="imp"> Imperative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="mix"> mix</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cni"> Conditional</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="np"> Proper noun</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="prs"> Present subjunctive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="def"> Definite</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cond_perfect"> @cond_perfect</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="past"> Past</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@future_perfect"> @future_perfect</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="itg"> Interrogative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pis"> Imperative subjunctive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@modal"> @modal</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="st"> st</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sw"> sw</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sint"> Synthetic</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="dem"> Demonstrative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pro"> Proclitic</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ref"> @ref</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pluperfect"> @pluperfect</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vaux"> Auxiliary verb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="attr"> attr</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cnjadv"> Adverbial conjunction</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="preadv"> Preadverb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="gen"> Genitive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cnjcoo"> Co-ordinating conjunction</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="rel"> Relative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="loc"> Location (not locative!)</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ord"> Ordinal</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pprs"> Present participle</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past"> @past</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+il"> pr+il</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ij"> Interjection</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="comp"> Comparative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@passive"> @passive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_cond"> @past_cond</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ref"> Reflexive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="qnt"> Quantifier</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cnjsub"> Subordinating conjunction</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="predet"> Pre-determiner</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@subjunctive_pluperfect"> @subjunctive_pluperfect</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="enc"> Enclitic</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sup"> Superlative</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_subjunctive"> @past_subjunctive</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="an"> Animate / inanimate</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_inf"> @past_inf</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="subj"> Subject</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="obj"> Object</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pprep"> pprep</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+der"> pr+der</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+le"> pr+le</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sg+mi"> sg+mi</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+o"> pr+o</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@formal"> @formal</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nn"> Inanimate</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ant"> Anthroponym</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ger_past"> @ger_past</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+sandwich"> n+sandwich</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+das"> pr+das</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbdo"> The verb to do</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@n:petit_ami"> @n:petit_ami</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:celui_la"> @prn:celui_la</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="suff"> suff</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+wehr"> n+wehr</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:le_tien"> @prn:le_tien</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+essen"> n+essen</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@itg:est_ce_que"> @itg:est_ce_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:depuis_que"> @cnj:depuis_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:bien_que"> @cnj:bien_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@det:de_le"> @det:de_le</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:apres_que"> @cnj:apres_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sg+lo"> sg+lo</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+el"> pr+el</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:avant_que"> @cnj:avant_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:parce_que"> @cnj:parce_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:pour_que"> @cnj:pour_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@det:a_le"> @det:a_le</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:du_fait_que"> @cnj:du_fait_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pl+ci"> pl+ci</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:tandis_que"> @cnj:tandis_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:alors_que"> @cnj:alors_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pos"> @pos</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:ca_va_bien"> @common_phrases:ca_va_bien</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:il_y_a"> @common_phrases:il_y_a</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:a_cause_de"> @pr:a_cause_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:tout_a_fait"> @adv:tout_a_fait</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+ele"> pr+ele</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pron"> Pronominal</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:autant_que"> @cnj:autant_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="aa"> Animate</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:quelque_un"> @prn:quelque_un</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:s_il_vous_plait"> @adv:s_il_vous_plait</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="acr"> Acronym</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:l_un"> @prn:l_un</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+versicherung"> n+versicherung</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:au_moins"> @adv:au_moins</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+hof"> n+hof</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ij:au_revoir"> @ij:au_revoir</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:celui_ci"> @prn:celui_ci</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:au_dela"> @adv:au_dela</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="adj+haltung"> adj+haltung</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="inf+lo"> inf+lo</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:comment_ca_va"> @common_phrases:comment_ca_va</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:un_peu_de"> @pr:un_peu_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ij:auf_wiedersehen"> @ij:auf_wiedersehen</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:de_rien"> @common_phrases:de_rien</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+kalender"> n+kalender</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:quelque_chose"> @prn:quelque_chose</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@neg:plus_de"> @neg:plus_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@itg:que_est_ce_que"> @itg:que_est_ce_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:le_notre"> @prn:le_notre</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:celui_que"> @prn:celui_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pres+not"> pres+not</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:a_demain"> @common_phrases:a_demain</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:a_peu_pres"> @adv:a_peu_pres</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vblex+bad"> Verb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="apos"> Apostrophe</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:afin_de"> @pr:afin_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:pres_de"> @pr:pres_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:a_posteriori"> @adv:a_posteriori</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="inf+ci"> inf+ci</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+isso"> pr+isso</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:por_supuesto"> @adv:por_supuesto</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:le_mien"> @prn:le_mien</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:plus_de"> @pr:plus_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ij:buenos_dias"> @ij:buenos_dias</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+ende"> n+ende</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+nummer"> n+nummer</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pl+lo"> pl+lo</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:a_travers"> @pr:a_travers</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:autant_de"> @pr:autant_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nom."> nom.</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:ce_dont"> @prn:ce_dont</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ij:merci_beaucoup"> @ij:merci_beaucoup</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:des_que"> @cnj:des_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@neg:il_ne_y_a"> @neg:il_ne_y_a</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:en_general"> @adv:en_general</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vblex+ort"> Verb</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:a_part"> @adv:a_part</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:le_meme"> @prn:le_meme</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:a_plus"> @common_phrases:a_plus</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:a_plus_tard"> @common_phrases:a_plus_tard</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+stier"> n+stier</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@obj"> @obj</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="dim"> dim</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:a_priori"> @adv:a_priori</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@common_phrases:a_bientot"> @common_phrases:a_bientot</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:pendant_que"> @cnj:pendant_que</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:por_favor"> @adv:por_favor</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+esse"> pr+esse</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+welt"> n+welt</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@subjunctive_perfect"> @subjunctive_perfect</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ij:buenas_noches"> @ij:buenas_noches</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+meister"> n+meister</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ij:bis_bald"> @ij:bis_bald</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:a_cote_de"> @pr:a_cote_de</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:n_importe_quoi"> @prn:n_importe_quoi</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:peut_etre"> @adv:peut_etre</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ij:thank_you"> @ij:thank_you</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:en_fait"> @adv:en_fait</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pl+gli"> pl+gli</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:s_il_te_plait"> @adv:s_il_te_plait</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@neg:pas_du_tout"> @neg:pas_du_tout</label></div>
      <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pr:au_dela_de"> @pr:au_dela_de</label></div>
    </div>
  </div> 
  <div class="card">
    <div id="bar-chart">
      ${resize((width) => barChart(data, {width}))}
    </div>
  </div>  
  <div class="card">
    <h3>Category Distribution</h3>
    <div id="bar-chart-cat">
      ${resize((width) => barChart_categories(data, category_translate, {width}))}
    </div>  
  </div>    
</div>


<div class="grid grid-cols-2" >
  <div class="card">
  <h3>Word Comparison</h3>
    <div id="word_comparison">
    </div>
  </div>    
  <div class="card">
    <h3>Global Category Distribution (only works with ticked Categories)</h3>
    <div id="bar-chart-cat-all">
      ${resize((width) => barChart_categories_all(data, {width}))}
    </div>      
  </div>
</div>  