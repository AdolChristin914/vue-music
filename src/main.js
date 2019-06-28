import Vue from 'vue';

import fc from 'fastclick';  //引入fastclick模块

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

fc(document.body);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
