import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { firestorePlugin } from 'vuefire'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faEdit,
  faSquare,
  faCheckSquare,
  faListAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(firestorePlugin)

library.add(
  faTrash,
  faEdit,
  faSquare,
  faCheckSquare,
  faListAlt,
  faTimes
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
