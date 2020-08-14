<template>
  <div>
    <h1>Supertajné online margaretky Hrdinosaura a Doktora Asteroida</h1>
    <md-field>
      <label>Heslo</label>
      <md-input v-model="password"></md-input>
    </md-field>
    <md-button class="md-primary" @click.prevent="login()">Vstoupit.</md-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      password: ""
    };
  },
  methods: {
    login() {
      if (this.password == this.$parent.password) {
        this.$emit("login", true);
        console.log(this.$parent.authenticated)
      } else {
        console.log("The password is incorrect");
      }
    }
  }
};
</script>