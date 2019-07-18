import Vue from 'vue';
import Vuex from 'vuex';

import singer from './modules/singer';
import player from './modules/player';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        singer,
        player
    },
    getters
});
