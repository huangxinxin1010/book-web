import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'
import store from './store/store'
// import './assets/css/reset.css'

router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
