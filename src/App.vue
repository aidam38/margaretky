<template>
  <div id="app">
    <div class="container" v-if="!authenticated">
      <Login v-on:login="login" />
    </div>
    <div v-else>
      <div class="header">
        <router-link to="/login" v-on:click.native="logout()" replace>Odejít</router-link>
      </div>
      <div class="container">
        <div class="md-layout" style="margin-bottom: 20px">
          <md-button @click.prevent="goBack" class="md-icon-button">
            <md-icon>keyboard_arrow_left</md-icon>
          </md-button>
          <md-button :to="{name: 'Intro'}" class="md-icon-button">
            <md-icon>home</md-icon>
          </md-button>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import { store } from "./store.js"

export default {
  name: "App",
  components: {
    Login
  },
  data() {
    return {
      authenticated: false,
      password: "Nebuď kokot."
    };
  },
  created() {
    store.getPeople();
  },
  methods: {
    login() {
      this.authenticated = true;
    },
    logout() {
      this.authenticated = false;
    },
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond");
@import url("https://fonts.googleapis.com/css?family=Material+Icons");

#app {
  font-family: "EB Garamond", "Arial";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  text-align: left;
  margin: 20px;
}

.container {
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
  max-width: 940px;
  padding: 0 20px 0 20px;
}
</style>
