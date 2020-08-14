<template>
  <div>
    <h1>Komu?</h1>
    <div class="people">
      <div v-for="person in store.people" :key="person.name">
        <Person v-bind:person="person"></Person>
      </div>
    </div>
  </div>
</template>
<script>
import Person from "../components/Person.vue";
import { store } from "../store.js";

export default {
  name: "People",
  data() {
    return {
      store,
      person: {
        name: "",
        image_url: ""
      },
      people: []
    };
  },
  components: {
    Person
  }
};
</script>

<style scoped>
.people {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>