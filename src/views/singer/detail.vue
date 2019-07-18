<template>
    <m-music-view :songList="songList" :title="songTitle" :bgImg="avatar"></m-music-view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSingerDetail } from '@/api/singer';
import { createSong } from '@/class/Song';
import MMusicView from '@/components/MMusicView';
export default {
    data() {
        return {
            songList: []
        };
    },
    computed: {
        ...mapGetters([
            'singer'
        ]),
        songTitle() {
            return this.singer.name;
        },
        avatar() {
            return this.singer.avatar;
        }
    },
    methods: {
        getSingerDetail(id) {
            this.$store.dispatch('GetSingerDetail', { id: id }).then(res => {
                this.songList = this.normalizeData(res);
            }).catch(err => {
                console.log(err);
            });
        },
        normalizeData(list) {
            let ret = [];
            list.forEach((item) => {
                let { musicData } = item;
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData));
                }
            });
            return ret;
        }
    },
    beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            const id = to.params.id;
            next(vm => {
                vm.getSingerDetail(id);
            });
        } else {
            this.$router.push({
                path: '/singer'
            });
        }
    },
    components: { MMusicView }
};
</script>


