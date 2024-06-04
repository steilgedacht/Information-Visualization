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
import {barChart} from "./components/language_distribution.js";

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
    <h2>Filters</h2><br>
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
      <h3>Categories</h3>
      <div style="height:300px; overflow-y:scroll;">
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n"> Noun</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sg"> sg</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*numb"> *numb</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vblex"> vblex</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="m"> m</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="f"> f</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pl"> pl</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="adj"> adj</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pri"> pri</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="inf"> inf</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="p3"> p3</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="mf"> mf</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*pers"> *pers</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*gndr"> *gndr</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nom"> nom</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pp"> pp</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="adv"> adv</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nt"> nt</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="p1"> p1</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="acc"> acc</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="*case"> *case</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="prn"> prn</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="det"> det</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pst"> pst</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sp"> sp</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pii"> pii</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@present_perfect"> @present_perfect</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="p2"> p2</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="dat"> dat</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr"> pr</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@future"> @future</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@future_phrasal"> @future_phrasal</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@compound_past"> @compound_past</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ifi"> ifi</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="tn"> tn</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pos"> pos</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbmod"> vbmod</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ind"> ind</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbser"> vbser</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="num"> num</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_perfect"> @past_perfect</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pres"> pres</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="fti"> fti</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cond"> @cond</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ger"> ger</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pred"> pred</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbhaver"> vbhaver</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="imp"> imp</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="mix"> mix</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cni"> cni</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="np"> np</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="prs"> prs</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="def"> def</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cond_perfect"> @cond_perfect</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="past"> past</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@future_perfect"> @future_perfect</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="itg"> itg</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pis"> pis</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@modal"> @modal</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="st"> st</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sw"> sw</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sint"> sint</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="dem"> dem</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pro"> pro</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ref"> @ref</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@pluperfect"> @pluperfect</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vaux"> vaux</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="attr"> attr</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cnjadv"> cnjadv</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="preadv"> preadv</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="gen"> gen</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cnjcoo"> cnjcoo</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="rel"> rel</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="loc"> loc</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ord"> ord</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pprs"> pprs</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past"> @past</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+il"> pr+il</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ij"> ij</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="comp"> comp</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@passive"> @passive</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_cond"> @past_cond</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ref"> ref</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="qnt"> qnt</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="cnjsub"> cnjsub</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="predet"> predet</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@subjunctive_pluperfect"> @subjunctive_pluperfect</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="enc"> enc</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sup"> sup</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_subjunctive"> @past_subjunctive</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="an"> an</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@past_inf"> @past_inf</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="subj"> subj</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="obj"> obj</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pprep"> pprep</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+der"> pr+der</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+le"> pr+le</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="sg+mi"> sg+mi</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+o"> pr+o</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@formal"> @formal</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="nn"> nn</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="ant"> ant</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@ger_past"> @ger_past</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="n+sandwich"> n+sandwich</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pr+das"> pr+das</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vbdo"> vbdo</label></div>
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
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="pron"> pron</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@cnj:autant_que"> @cnj:autant_que</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="aa"> aa</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@prn:quelque_un"> @prn:quelque_un</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="@adv:s_il_vous_plait"> @adv:s_il_vous_plait</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="acr"> acr</label></div>
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
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vblex+bad"> vblex+bad</label></div>
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="apos"> apos</label></div>
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
        <div style="margin-bottom:5px"><label><input type="checkbox" class="category-filter" value="vblex+ort"> vblex+ort</label></div>
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
      <div><br>
        <h3>Color by</h3> 
        <select style="width:100%" id="choices" name="choices">
          <option value="language">Language</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div><br>
        <h3>Size by</h3>
        <select style="width:100%" id="sizeBy" name="sizeBy">
          <option value="none">None</option>
          <option value="average_performance">Performance</option>
          <option value="average_recall">Recall</option>
          <option value="users_seen">Users that have seen the word</option>
          <option value="hardness">Hardness</option>
        </select>
      </div>      
    </div>
  </div>
</div>

<div class="grid grid-cols-3" >
  <div class="card">
    <div id="side-panel"><h3>Word Information</h3></div>
  </div>
  <div class="card">
    <h3>Word Information</h3>
    <div id="bar-chart">
      ${resize((width) => barChart(data, {width}))}
    </div>
  </div>  
  <div class="card">
    <h3>Word Comparison</h3>
  </div>  
</div>
