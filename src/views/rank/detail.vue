<template>
    <m-music-view :title="title" :songList="songList" :bgImg="bgImg" :isRank="true"></m-music-view>
</template>

<script>
import MMusicView from '@/components/MMusicView';
import { mapGetters } from 'vuex';
import { getMusicList } from '@/api/rank';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/class/Song';
export default {
    data() {
        return {
            songList: []
        };
    },
    components: { MMusicView },
    computed: {
        ...mapGetters(['topSongItem']),
        title() {
            return this.topSongItem.topTitle;
        },
        bgImg() {
            return this.songList.length > 0 ? this.songList[0].image : "";
        }
    },
    methods: {
        getMusicList() {
            if (this.topSongItem.id !== null && this.topSongItem.id !== undefined) {
                getMusicList(this.topSongItem.id).then(res => {
                    if (res.code === ERR_OK) {
                        this.songList = this.normalizeData(res.songlist);
                    }
                }).catch(err => { console.log(err); });
            }
        },
        normalizeData(list) {
            let ret = [];
            list.forEach(item => {
                if (item.data.albumid && item.data.songid) {
                    let song = createSong(item.data);
                    ret.push(song);
                }
            });
            return ret;
        }

    },
    created() {
        this.getMusicList();
    }
};
</script>

<style lang="scss" scoped>
</style>
