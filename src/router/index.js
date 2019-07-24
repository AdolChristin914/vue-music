import Vue from 'vue';
import Router from 'vue-router';

import recommend from '@/views/recommend'; //推荐
import disc from '@/views/disc'; //推荐详情
import singer from '@/views/singer'; //歌手
import singerDetail from '@/views/singer/detail'; //歌手详情
import rank from '@/views/rank'; //排行
import rankDetail from '@/views/rank/detail'; //排行详情
import search from '@/views/search'; //搜索

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
        component: recommend,
        children: [{
            path: ':id',
            component: disc
        }]
    },
    {
        path: '/singer',
        name: 'singer',
        component: singer,
        children: [{
            path: ':id',
            name: "singerDetail",
            component: singerDetail
        }]
    },
    {
        path: '/rank',
        name: 'rank',
        component: rank,
        children: [{
            path: ':id',
            name: 'rankDetail',
            component: rankDetail
        }]
    },
    {
        path: '/search',
        name: 'search',
        component: search
    }]
});
