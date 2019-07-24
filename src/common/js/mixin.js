import { mapGetters } from 'vuex';

//解决每个组件有miniplay高度的时候覆盖问题
export const playlistmixin = {
    computed: {
        ...mapGetters(['playlist'])
    },
    mounted() {
        this.handlePlaylist(this.playlist);
    },
    activated() {
        this.handlePlaylist(this.playlist);
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal);
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method');
        }
    },
};
