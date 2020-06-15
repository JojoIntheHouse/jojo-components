import Vue from 'vue';
import App from './App.vue';
import jojo from 'jojo';
Vue.use(jojo, {
    touchenable: true
})
new Vue({
    render: h => h(App)
}).$mount('#app')

