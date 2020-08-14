<template>
  <div>
    <h1>Admin Panel</h1>
    <div class="md-layout md-alignment-top-right">
      <md-button :to="{name: 'AddPeople'}" class="md-icon-button">
        <md-icon>add</md-icon>
      </md-button>
    </div>

    <md-button class="md-raised md-primary" @click.prevent="generate()">Vygenerovat pdfka</md-button>
    <md-button class="md-raised md-accent" @click.prevent="send()">Poslat pdfka</md-button>
  </div>
</template>

<script>
import { store, functions } from "../store.js";

export default {
  name: "AdminPanel",
  data() {
    return {
      store,
    };
  },
  methods: {
    async generate() {
      for (const person of store.people) {
        console.log(person);
        var generatePdf = functions.httpsCallable("generatePdf");
        generatePdf({ person: person })
          .then(function (result) {
            console.log(result);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    send() {
      for (const person of store.people) {
          console.log(person);
          var sendPdf = functions.httpsCallable("sendPdf");
          sendPdf({ person: person })
            .then(function (result) {
              console.log(result);
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
  },
};
</script>