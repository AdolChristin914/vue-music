import { PlayMode } from '~/js/global_const';
const player = {
    state: {
        playing: false,
        fullScreen: false,
        playlist: [],
        sequenceList: [],
        playmode: PlayMode.SEQUENCE,
        currentIndex: -1
    },
    mutations: {
        SET_PLAYING(state, playing) {
            state.playing = playing;
        },
        SET_FULLSCREEN(state, fullScreen) {
            state.fullScreen = fullScreen;
        },
        SET_PLAYLIST(state, playlist) {
            state.playlist = playlist;
        },
        SET_SEQUENCELIST(state, sequenceList) {
            state.sequenceList = sequenceList;
        },
        SET_PLAYMODE(state, playmode) {
            state.playmode = playmode;
        },
        SET_CURRENTINDEX(state, currentIndex) {
            state.currentIndex = currentIndex;
        }
    },
    actions: {
        SelectPlay({ commit }, { songList, index }) {
            commit('SET_SEQUENCELIST', songList);
            commit('SET_PLAYLIST', songList);
            commit('SET_PLAYING', true);
            commit('SET_FULLSCREEN', true);
            commit('SET_CURRENTINDEX', index);
        }
    }
};


export default player;
