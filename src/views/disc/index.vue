<template>
    <m-music-view :bgImg="disc.imgurl" :title="disc.creator.name" :songList="songList"></m-music-view>
</template>

<script>
import MMusicView from '@/components/MMusicView';
import { getSongList } from '@/api/recommend';
import { mapGetters } from 'vuex';
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
        ...mapGetters(['disc'])
    },
    methods: {
        getSongList() {
            getSongList(this.disc.dissid).then(res => {
                if (res.code === ERR_OK) {
                    this.songList = this.normalizeData(res.cdlist[0].songlist);
                }
            }).catch(err => { console.log(err); });
        },
        normalizeData(list) {
            let ret = [];
            list.forEach(item => {
                if (item.albumid && item.songid) {
                    let song = createSong(item);
                    ret.push(song);
                }
            });
            return ret;
        }
    },
    created() {
        this.getSongList();
    }
};
</script>

<style lang="scss" scoped>
</style>
