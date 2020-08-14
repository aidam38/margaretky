<template>
  <div>
    <h1>Margaretky Hrdinství 2020</h1>
    <md-divider></md-divider>
    <h2>Úvod</h2>
    <p>
      Jednou tradiční aktivitou na různých akcích jsou tzv.
      <b>margaretky</b> – obálky se jmény ostatních, do kterých je možnost házet zprávy s
      <b>poděkováním</b> nebo nějakým
      <b>vzkazem</b>. Typicky si je otevíráte až po akci doma, ale i za pár let mohou takové zprávy posloužit jako dobrý exit z depky.
    </p>
    <h2>Jak na to?</h2>
    <p>Dopis napíšete tak, že kliknete na "Napsat margaretku", vyberete si člověka a píšete. Podpis je dobrovolný.</p>
    <p>
      V
      <b>úterý 4. 8. v 16:00</b> pak všem přijde
      <b>e-mail s jejich "margaretkou"</b>.
    </p>
    <h2>Jak to funguje?</h2>
    <ul>
      <li>Existuje nějaká databáze s vašemi zprávami podle osob (především s příslušným e-mailem).</li>
      <li>Týden po akci pak vygenerují všechny margaretky jako pdf a přistanou vám do e-mailové schránky.</li>
      <li>Po potvrzení přijetí se jak databáze, pdf, tak e-maily ve schránce smažou, takže vaši zprávy nikde uchovávány nebudou.</li>
      <li>Během týdne po akci se sice na vaše zprávy teoreticky přes rozhraní databáze můžeme koukat, ale slibujeme, že to nebudeme dělat (ani při generování to nebude potřeba, to půjde automaticky).</li>
    </ul>
    <md-button class="md-raised md-primary" :to="{ name: 'People' }">Napsat margaretku.</md-button>
  </div>
</template>

<style scoped>
p,
ul {
  font-size: 14pt;
  text-align: left;
}
</style>
