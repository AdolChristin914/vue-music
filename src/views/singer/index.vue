<template>
    <div>
        <m-list-view :data="singerList" @select="selectSinger"></m-list-view>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { getSingerList } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import Singer from '@/class/Singer';
import MListView from '@/components/MListView';

const HOT_NAME = '热门歌曲';
const HOT_LEN = 10;

export default {
    data() {
        return {
            singerList: []
        };
    },
    methods: {
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            });
            this.$store.commit('SET_SINGER', singer);
        },
        getSingerList() {
            getSingerList().then(res => {
                if (res.code === ERR_OK) {
                    this.singerList = this.normalizeData(res.data.list);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        normalizeData(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    item: []
                }
            };

            list.forEach((item, index) => {
                if (index < HOT_LEN) {
                    map.hot.item.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
                }

                const key = item.Findex;

                if (map[key] === undefined) {
                    map[key] = {
                        title: key,
                        item: []
                    };
                }

                map[key].item.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
            });

            let ret = [];
            let hot = [];

            for (const key in map) {
                if (map[key].title.match(/[a-zA-Z]/)) {
                    ret.push(map[key]);
                } else if (map[key].title == HOT_NAME) {
                    hot.push(map[key]);
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            });

            return hot.concat(ret);
        }
    },
    components: {
        MListView
    },
    created() {
        this.getSingerList();
    }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
