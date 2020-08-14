<template>
  <div>
    <router-link :to="{name: 'Margarita', params: {person: person}}">
      <md-card class="person-card md-elevation-6">
        <img :src="person.image_url" style="width:100px" />
        <h2>{{ person.name }}</h2>
      </md-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Person",
  props: ["person"]
};
</script>

<style>
.person-card {
  padding: 10px;
  margin: 10px;
  width: 200px;
}
</style>