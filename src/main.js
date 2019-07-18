import Vue from 'vue';

import fc from 'fastclick'; //引入fastclick模块

import '@/common/style/index.scss'; // 公共scss

import App from './App.vue';
import router from './router';
import store from './store';

import VueLazyload from 'vue-lazyload';

import * as global_const from '~/js/global_const';

for (const key in global_const) {
    Vue.prototype[`$${key}`] = global_const[key];
}

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: require('~/images/loading_img.gif')
});

fc.attach(document.body);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
