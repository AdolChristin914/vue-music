import Vue from 'vue';
import Router from 'vue-router';

import recommend from '@/views/recommend'; //推荐
import singer from '@/views/singer';      //歌手
import rank from '@/views/rank';         //排行
import search from '@/views/search';    //搜索

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: recommend
        },
        {
            path: '/singer',
            name: 'singer',
            component: singer
        },
        {
            path: '/rank',
            name: 'rank',
            component: rank
        },
        {
            path: '/search',
            name: 'search',
            component: search
        }
    ]
});
