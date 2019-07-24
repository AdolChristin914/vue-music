import { PlayMode } from '~/js/global_const';
import { shuffle } from '~/js/utils';
const player = {
    state: {
        playing: false,
        fullScreen: false,
        playlist: [],
        sequenceList: [],
        playmode: PlayMode.SEQUENCE,
        currentIndex: -1,
        disc: {},
        topSongItem: {}
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
        },
        SET_DISC(state, disc) {
            state.disc = disc;
        },
        SET_TOPSONGITEM(state, topSongItem) {
            state.topSongItem = topSongItem;
        }
    },
    actions: {
        SelectPlay({ commit, state }, { songList, index }) {
            commit('SET_SEQUENCELIST', songList);
            if (state.playmode === PlayMode.RANDOM) {
                index = state.playlist.findIndex(item => item.id === songList[index].id);
            } else {
                commit('SET_PLAYLIST', songList);
            }
            commit('SET_PLAYING', true);
            commit('SET_FULLSCREEN', true);
            commit('SET_CURRENTINDEX', index);
        },
        RandomPlay({ commit }, { songList }) {
            let list = shuffle(songList);
            commit('SET_SEQUENCELIST', songList);
            commit('SET_PLAYLIST', list);
            commit('SET_PLAYING', true);
            commit('SET_PLAYMODE', PlayMode.RANDOM);
            commit('SET_FULLSCREEN', true);
            commit('SET_CURRENTINDEX', 0);
        }
    }
};


export default player;
