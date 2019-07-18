const getters = {
    singer: state => state.singer.singer,
    playing: state => state.player.playing,
    fullScreen: state => state.player.fullScreen,
    playlist: state => state.player.playlist,
    sequenceList: state => state.player.sequenceList,
    playmode: state => state.player.playmode,
    currentIndex: state => state.player.currentIndex,
    currentSong: state => {
        return state.player.playlist[state.player.currentIndex] || {};
    }
};

export default getters;
