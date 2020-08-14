<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div class="md-layout-item">
      <div class="md-layout md-alignment-top-center">
        <Person v-if="person" v-bind:person="person" />
        <md-button v-else :to="{name: 'People'}" style="width: 200px">Vybrat si člověka.</md-button>
      </div>
    </div>
    <MargaritaForm
      class="md-layout-item"
      v-on:write="writeLetter"
    ></MargaritaForm>
  </div>
</template>

<script>
import MargaritaForm from "../components/MargaritaForm.vue";
import Person from "../components/Person.vue";
import { store } from "../store.js";

export default {
  name: "Margarita",
  props: ["person"],
  data() {
    return {
    };
  },
  components: {
    MargaritaForm,
    Person
  },
  methods: {
    writeLetter: function(letter) {
      console.log(this.person);
      console.log(letter);
      var that = this;
      store.writeLetter(this.person, letter).then(function(){
          that.$router.push({name: "People"});
      });
    }
  }
};
</script>
<style scoped>
.margarita {
  display: flex;
}
</style>