import Vue from 'vue'
import App from './App.vue'

import VueGAPI from 'vue-gapi'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import { apiKey } from '../api-keys.js'

Vue.use(VueMaterial)

// create the 'options' object
const apiConfig = {
  apiKey: apiKey,
  clientId: '273021499722-fau53tfosvudmels88fiq5mk305rq79c.apps.googleusercontent.com',
  discoveryDocs: ['https://docs.googleapis.com/$discovery/rest?version=v1'],
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
  scope: 'https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive.file',

  // works only with `ux_mode: "prompt"`
  refreshToken: true,
}

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
