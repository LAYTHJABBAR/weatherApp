import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
 
Vue.use(BootstrapVue)
 
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(VueResource)

new Vue({
  render: h => h(App),
}).$mount('#app')
